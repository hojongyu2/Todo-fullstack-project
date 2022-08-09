import React from "react";
import '../css/Todo.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth"
import { todoList } from "../Todo";

const TodoPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername }) => {
    const [userToken, setUserToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('')
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCatetoryInput] = useState('')
    const navigate = useNavigate();
    // console.log(todos)
    console.log(categories)
    const todoCheckBox = (index) => {
        const newTodo = [...todos]
        newTodo[index].isCompleted = !newTodo[index].isCompleted;
        setTodos(newTodo)
    }
    
    useEffect(() => {
        const localUserToken = getUserToken();
        setUserToken(localUserToken);
    }, [isAuthLoading]);

    return (
        <div className="contatiner">
            <div className="category-section">
        
                <input type="text" value={categoryInput} onChange={(e) => {
                    const value = e.target.value
                    setCatetoryInput(value)
                }} on placeholder="create categories"></input>
                <button onClick={() => {
                    if (!categoryInput) {
                        return
                    }
                    const copyCategories = { categoryName: categoryInput, id: categories.length + 1}
                    setCategories([...categories, copyCategories])
                    setCatetoryInput('')
                }}>+</button>
                <div>
                    {categories.map((category, index) => (
                        <div key={index}>
                            <button>{category.categoryName}</button>
                        </div>
                    ))}
                </div>

                {userToken &&
                    <>
                        <button
                            onClick={async () => {
                                console.log(localStorage)
                                setIsAuthLoading(true)
                                // console.log("isAuthLoading :" + isAuthLoading)
                                const logoutSuccess = await logoutUser();
                                console.log(logoutSuccess)
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
                        const copyTodos = { text: todoInput, id: todos.length + 1, isCompleted: false }
                        setTodos([...todos, copyTodos])
                        //once button is clicked, assign todos with new object text and id
                        setTodoInput('')//once input is added, clear input
                        todoList(copyTodos)// sending post request here.
                    }}>add</button>
                </div>
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <div key={index}>
                            <input type="checkbox" onChange={()=> todoCheckBox(index)}></input>
                            <label>{todo.text}</label>
                        </div>
                    ))}
                </div>
                <img src="https://img.freepik.com/premium-vector/young-man-working-laptop-home-office-freelancer-work-remote-work_625536-683.jpg?w=1060" alt="peaceful"></img>
            </div>
        </div>
    )

}

export default TodoPage