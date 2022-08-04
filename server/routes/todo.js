var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const { blogsDB } = require("../mongo");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

router.get('/', function(req, res, next) {
    res.json({uid: uuid()})
})
const createUser = async (username, passwordHash) => {
    try {
        const user = {
            username: username,
            password: passwordHash,
            uid: uuid()
        }
        const collection = await blogsDB().collection('users');
        await collection.insertOne(user);
        return true
    } catch(e){
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
    } catch(e){
        console.error(e);
        throw Error(e)
    }
}

const signupValidator = async (username, password) => {
    if (!username) {
        return {isValid: false, message: "No username provided."}
    }
    if (!password) {
        return {isValid: false, message: "No password provided."}
    }
    const userAlreadyExists = await doesUserExist(username)

    if (userAlreadyExists) {
        return {isValid: false, message: "User already exists"}
    }
    return {isValid: true}
}

router.post('/signup-user', async function(req, res, next){
    try {
        const username = req.body.username;
        const password = req.body.password;
        const saltRounds = 5;

        const signupValidation = await signupValidator(username, password)

        if (!signupValidation.isValid) {
            res.json({success:false, message: signupValidation.message})
            return;
        }

        // Generate Salt and Hash Password
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        // Save User
        const userSaveSuccess = await createUser(username, hash)
        console.log(userSaveSuccess)
        res.status(200).json({success:userSaveSuccess});
    }catch(e){
        console.log(error(e))
        res.status(500).json({success: "false from signing up"})
    }
})

router.post('/login-user', async function (req, res, next){
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
        if(match){
            res.json({ success: true, token}).status(200)
        }
    }catch(e){
        console.log(error(e))
        res.status(500).json({success: "false from login user"})
    }
})
router.get('/validate-token', function(req, res, next){
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.json({success:true})
        }else {
            throw Error("Access Denied");
        }
    }catch (error){
        return res.status(401).json({success: false, message: String(error)});
    }    
})

module.exports = router;