import React from "react";
import '../css/Todo.css'
import { useState, useEffect } from "react";
import { getUserToken, logoutUser } from "../Auth"
import { useNavigate } from "react-router-dom";

const TodoPage = ({ isAuthLoading, setIsAuthLoading }) => {
    const [userToken, setUserToken] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        const localUserToken = getUserToken();
        setUserToken(localUserToken);
    }, [isAuthLoading]);

    return (
        <div className="contatiner">
            <div className="category-section">
                <button>create category</button>
                <button>Home</button>
                {userToken &&
                    <>
                        <button
                            onClick={ async () => {
                                console.log(localStorage)
                                setIsAuthLoading(true)
                                console.log("isAuthLoading :" + isAuthLoading)
                                const logoutSuccess = await logoutUser();
                                console.log(logoutSuccess)
                                console.log(localStorage)
                                if (logoutSuccess.success) {
                                    console.log("isAuthLoading :" + isAuthLoading)
                                    setIsAuthLoading(false)
                                    navigate('/')
                                }
                            }}
                        >
                            Logout
                        </button>
                    </>}
            </div>
            <div className="todo-section">
                <div className="weather">
                    <h2>weather</h2>
                </div>
                <div className="todo-submit">
                    <input></input>
                    <button>add</button>
                </div>
                <div className="todo-list">

                </div>
                <img src="https://img.freepik.com/premium-vector/young-man-working-laptop-home-office-freelancer-work-remote-work_625536-683.jpg?w=1060" alt="peaceful"></img>
            </div>
        </div>
    )

}

export default TodoPage