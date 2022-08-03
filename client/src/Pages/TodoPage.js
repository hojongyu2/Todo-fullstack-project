import React from "react";
import '../css/Todo.css'
const TodoPage = () => {
    return (
        <div className="contatiner">
            <div className="category-section">
                <button>Home</button>
                <button>create category</button>
            </div>
            <div className="todo-section">
                <h2>weather</h2>
                <input></input>
                <img src="https://img.freepik.com/premium-vector/young-man-working-laptop-home-office-freelancer-work-remote-work_625536-683.jpg?w=1060"></img>
            </div>
        </div>
    )
    
}

export default TodoPage