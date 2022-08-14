var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const { blogsDB } = require("../mongo");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

router.get('/', function (req, res, next) {
    res.json({ uid: uuid() })
})
const createUser = async (username, passwordHash) => {
    try {
        const user = {
            username: username,
            password: passwordHash,
            uid: uuid(),
            categoryIdList: []
        }
        const collection = await blogsDB().collection('users');
        await collection.insertOne(user);
        return true
    } catch (e) {
        console.error(e);
        return false;
    }
}

const doesUserExist = async (username) => {
    try {
        const user = {
            username: username,
        }
        const collection = await blogsDB().collection('users');
        const dbUser = await collection.findOne(user);
        if (dbUser) {
            return true
        }
        return false
    } catch (e) {
        console.error(e);
        throw Error(e)
    }
}

const signupValidator = async (username, password) => {
    if (!username) {
        return { isValid: false, message: "No username provided." }
    }
    if (!password) {
        return { isValid: false, message: "No password provided." }
    }
    const userAlreadyExists = await doesUserExist(username)

    if (userAlreadyExists) {
        return { isValid: false, message: "User already exists" }
    }
    return { isValid: true }
}

router.post('/signup-user', async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const saltRounds = 5;

        const signupValidation = await signupValidator(username, password)

        if (!signupValidation.isValid) {
            res.json({ success: false, message: signupValidation.message })
            return;
        }

        // Generate Salt and Hash Password
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // Save User
        const userSaveSuccess = await createUser(username, hash)
        console.log(userSaveSuccess)
        res.status(200).json({ success: userSaveSuccess });
    } catch (e) {
        console.log(error(e))
        res.status(500).json({ success: "false from signing up" })
    }
})

router.post('/login-user', async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("users");
        const user = await collection.findOne({
            username: req.body.username
        })
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
            time: new Date(),
            userId: user.uid
        };
        const token = jwt.sign(data, jwtSecretKey);
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            res.json({ success: true, token }).status(200)
        }
    } catch (e) {
        console.log(error(e))
        res.status(500).json({ success: "false from login user" })
    }
})
router.get('/validate-token', function (req, res, next) {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.json({ success: true })
        } else {
            throw Error("Access Denied");
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: String(error) });
    }
})

router.post('/todos', async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("users");
        const decoded = jwt.decode(req.headers.token);
        // console.log(decoded)
        const user = await collection.findOne({
            uid: decoded.userId
        })

        if (!user) {
            throw Error("You must login first");
        }



        const todoCollection = await blogsDB().collection("todos");
        const toDoId = uuid()

        await todoCollection.insertOne({
            toDoId,
            userId: decoded.userId, // decoded? or encryted when you save userid
            text: req.body.text,
            createdAt: new Date(),
            startAt: new Date(),
            completedAt: new Date(),
            isCompleted: req.body.isCompleted

        })
        const categoryIdList = req.body.categoryIdList
        // use this id to find which category to use(clicked = true)
        // then find and update the db
        const categoryCollection = await blogsDB().collection("categories");
        const dbCategory = await categoryCollection.updateMany(
            {
                categoryId: {
                    $in: categoryIdList
                }
            },
            { $push: { toDoIdList: toDoId } }
        )

        // Find category by categoryId
        // Push toDoId into category.toDoIdList
        // Save category

        res.status(200).json({ success: true, toDoId });
        //send todoId back to the front so that I can use it for the delete function

    } catch (error) {
        return res.status(404).json({ success: false })
    }

})

router.post('/categories', async function (req, res, next) {

    try {

        const userCollection = await blogsDB().collection("users");
        const decoded = jwt.decode(req.headers.token);
        console.log(decoded)
        const user = await userCollection.findOne({
            uid: decoded.userId
        })
        console.log(user)
        if (!user) {
            throw Error("You must login first");
        }

        const categoryId = uuid();
        const newCategory = {
            categoryId,
            name: req.body.categoryName,
            toDoIdList: []
        }
        console.log(req.body.categoryName)
        const categoryCollection = await blogsDB().collection("categories")
        await categoryCollection.insertOne(newCategory)

        const dbUser = await userCollection.update(
            { uid: decoded.userId },
            {
                $push: {
                    categoryIdList: categoryId,
                    categoryName: req.body.categoryName,
                }
            }
        )

        res.json({ success: true, categoryId })

    } catch (error) {
        return res.status(404).json({ success: false })
    }

})

router.delete('/todos-delete', async function (req, res, next) {
    try {
        const todoIds = req.body.map((x)=>{
            return x.toDoId
        })
        // console.log(todoIds.join(''))
        //without join, it returns as an Array
        const collection = await blogsDB().collection("todos");
        await collection.deleteMany({
            toDoId:todoIds.join()
        })
        res.json({success:true})

    }catch (error) {
        return res.status(404).json({success:false})
    }

})

module.exports = router;