import React from "react";
import '../css/Todo.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth"
import { todoList } from "../Todo";//post request
import { CategoryList } from "../Category"; //post request

const TodoPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername }) => {
    const [userToken, setUserToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('')
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCatetoryInput] = useState('')
    const navigate = useNavigate();
    console.log(todos)
    console.log(categories)

    const todoCheckBox = (index) => {
        const newTodo = [...todos]
        newTodo[index].isCompleted = !newTodo[index].isCompleted;
        setTodos(newTodo)
    }

    const categoryChecked = (index) => {
        const newCategory = [...categories]
        newCategory[index].clicked = !newCategory[index].clicked
        setCategories(newCategory)
    }

    useEffect(() => {
        const localUserToken = getUserToken();
        setUserToken(localUserToken);
    }, [isAuthLoading]);

    return (
        <div className="contatiner">
            <div className="category-section">
                {categories.map((category, index) => (
                    <div key={index}>
                        <button onClick={() => categoryChecked(index)}>{category.categoryName}</button>
                        <button>Delete</button>
                    </div>
                ))}

                <input type="text" value={categoryInput} onChange={(e) => {
                    const value = e.target.value
                    setCatetoryInput(value)
                }} on placeholder="create categories"></input>

                <button onClick={() => {
                    if (!categoryInput) {
                        return
                    }
                    const copyCategories = { categoryName: categoryInput, id: categories.length + 1, clicked: true }
                    setCategories([...categories, copyCategories])
                    setCatetoryInput('')
                    CategoryList(copyCategories)
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
                <div className="welcome">
                    <h2>welcome {showUsername}</h2>
                </div>
                <div className="todo-submit">
                    <input type="text" value={todoInput} onChange={(e) => {
                        const value = e.target.value
                        setTodoInput(value)
                    }}></input>
                    <button onClick={() => {
                        if (!todoInput) {
                            return;
                        }// if input is empty, do not add anything
                        if (categories.length === 0){
                            return;
                        }// if there is no categories, then do not add 

                        const copyTodos = { text: todoInput, id: todos.length + 1, isCompleted: false }
                        setTodos([...todos, copyTodos])
                        //once button is clicked, assign todos with new object text and id
                        setTodoInput('')//once input is added, clear input
                        todoList(copyTodos)// sending post request here.
                        //todoList(copyTodos, categoryList)
                      
                    }}>add</button>
                </div>
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <div key={index}>
                            <input type="checkbox" onChange={() => todoCheckBox(index)}></input>
                            <label>{todo.text}</label>
                            <button>delete</button>
                        </div>
                    ))}
                </div>
                <img src="https://img.freepik.com/premium-vector/young-man-working-laptop-home-office-freelancer-work-remote-work_625536-683.jpg?w=1060" alt="peaceful"></img>
            </div>
        </div>
    )

}

export default TodoPage