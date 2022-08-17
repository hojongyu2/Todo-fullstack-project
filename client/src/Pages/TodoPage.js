import React from "react";
import '../css/Todo.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth"
import { saveTodo } from "../Todo";//post request
import { saveCategory } from "../Category"; //post request
import { deleteTodo } from "../Todo";//delete request
import { deleteCategory, getUserCategories } from "../Category";//delete request
import { getWeather } from "../weather";
// import { getLocationAndTime } from "../weather";


const TodoPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername, town, temp }) => {
    const [userToken, setUserToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('')
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCatetoryInput] = useState('')
    const [city, setCity] = useState('')
    const [find, setFind] = useState(true)// once city is typed, then disappear
    const [optionValue, setOptionValue] = useState('')
    const [isCategoryDataLoading, setIsCategoryDataLoading] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUserToDoData = async () => {
            const userDataResponse = await getUserCategories()
            // console.log("userDataResponse ", userDataResponse)
            const userCategories = userDataResponse.userData.categoryList
            // console.log("userCategories ", userCategories)
            setCategories(userCategories)

            setShowUsername(userDataResponse.userData.username)

            const userCategoriesTodoList = userCategories.map((x) => {
                return x.toDoList
            })
            console.log(userCategoriesTodoList)
            const userCategoriesTodos = userCategoriesTodoList.flat()
            // setTodos(userCategoriesTodos)//there is a bug here. Null value present once todo is deleted
        }
        fetchUserToDoData()
    }, [isCategoryDataLoading])
    // console.log(todos)
    

    useEffect(() => {
        const localUserToken = getUserToken();
        setUserToken(localUserToken);
    }, [isAuthLoading]);

    const categoriesName = categories.map((x) => {
        const editOption =
            { value: x.name, name: x.name, id:x.categoryId}
        return editOption
    })

    return (
        <div className="contatiner">
            <div className="category-section">

                {categories.map((category, index) => (
                    <div key={index}>
                        <span>{category.name}  {category.toDoIdList.length}</span>
                        <button onClick={async() => {
                            setIsCategoryDataLoading(true)
                            await deleteCategory([category])//send delete request
                            setIsCategoryDataLoading(false)
                            // why???????????????
                        }}>Delete</button>
                    </div>
                ))}

                <input type="text" value={categoryInput} onChange={(e) => {
                    const value = e.target.value
                    setCatetoryInput(value)
                }} on placeholder="create categories"></input>

                <button onClick={async () => {
                    if (!categoryInput) {
                        return
                    }
                    const newCategory = { categoryName: categoryInput, checked: false }
                    setIsCategoryDataLoading(true)
                    const categorySaveRes = await saveCategory(newCategory)
                    setIsCategoryDataLoading(false)
                    setCatetoryInput('')
                }}>+</button>
                {userToken &&
                    <>
                        <button
                            onClick={async () => {
                                console.log(localStorage)
                                setIsAuthLoading(true)
                                // console.log("isAuthLoading :" + isAuthLoading)
                                const logoutSuccess = await logoutUser();
                                console.log(localStorage)
                                if (logoutSuccess.success) {
                                    // console.log("isAuthLoading :" + isAuthLoading)
                                    setIsAuthLoading(false)
                                    setShowUsername('')
                                    navigate('/')
                                }
                            }}
                        >
                            Logout
                        </button>
                    </>}
            </div>
            <div className="todo-section">

                {find && (
                    <div>
                        <input value={city} onChange={(e) => {
                            setCity(e.target.value)
                        }} placeholder="serch city"></input>
                        <button onClick={() => {
                            getWeather(city)
                            setFind(false)
                        }}>get</button>

                    </div>
                )}

                <div className="welcome">
                    <h2>welcome {showUsername}</h2>
                    <h3>{town}</h3>

                </div>
                <div className="todo-submit">
                    <input type="text" value={todoInput} onChange={(e) => {
                        const value = e.target.value
                        setTodoInput(value)
                    }}></input>

                    <select value={optionValue} onChange={(e) => {
                        const value = e.target.value
                        setOptionValue(value)
                    }} >
                        {categoriesName.map(option => (
                            <option key={option.value} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={async () => {
                        if (!todoInput) {
                            return;
                        }// if input is empty, do not add anything
                        if (categories.length === 0) {
                            setTodoInput('')
                            return;
                        }// if there is no categories, then do not add 

                        const newTodo = { text: todoInput, isCompleted: false, }
                        // setTodos([...todos, newTodo])
                        //once button is clicked, assign todos with new object text and id
                        setTodoInput('')//once input is added, clear input

                        const checkedCategoryIds = optionValue // get category Id that are selected
                       
                        setIsCategoryDataLoading(true)
                        const resTodo = await saveTodo(newTodo, [checkedCategoryIds])//send post request here.
                        setIsCategoryDataLoading(false)
                        //If respond is sucess, then grab the toDoId and push it to Todos
                        //so that I can use it for delete functionality
                        if (resTodo.success) {
                            const toDoId = resTodo.toDoId;
                            // console.log(toDoId)
                            setTodos([...todos, { ...newTodo, toDoId }])
                        }
                    }}>add</button>
                </div>
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <div key={index}>
                            <label>{todo.text}</label>
                            <button onClick={async () => {
                                // const completedTodo = todos
                                //     .filter((todo) => {
                                //         return todo.isCompleted
                                //     })// filter out false/unchecked value
                                setIsCategoryDataLoading(true)
                                await deleteTodo([todo])
                                setIsCategoryDataLoading(true)
                                //delete request sends to the backend
                            }}>delete</button>
                        </div>
                    ))}
                </div>
                <img src="https://img.freepik.com/premium-vector/young-man-working-laptop-home-office-freelancer-work-remote-work_625536-683.jpg?w=1060" alt="peaceful"></img>
            </div>
        </div>
    )

}

export default TodoPage

// saving todo on the browser
// delete function useeffect
// maybe delete function for todo as well
// work on use effect for todo
// name variable

// bug-1
// when creating a todo, If checked box in category is not checked,
// todo is not going to belong any of the categories