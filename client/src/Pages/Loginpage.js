import React from "react"
// import '../css/Login.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { loginUser } from "../Auth";
import { passToken } from "../Auth";

const loginValidator = (username, password) => {
    if (!username) {
        return {isValid: false, message: "No username provided."}
    }
    if (!password) {
        return {isValid: false, message: "No password provided."}
    }
    return {isValid: true}
}

const LoginPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();


    return (
        <div className="login-container">
            <div className="create-account">
                <img src="https://img.freepik.com/premium-vector/young-man-sits-his-desk-workplace-using-his-personal-desktop-computer-working-online-program-work-home-concept-vector-illustration-isolated-white-background_37895-775.jpg" alt="peace"></img>
                <button onClick={() => {
                    navigate('/sign-up')
                }}>Create an account</button>
            
            </div>
                <div className="login">
                <div className="login-validation-message">
                    {validationMessage && validationMessage}
                </div>
                    <h1>Login</h1>
                    
                    {/* {username} */}
                    <input type="text" value={username} onChange={(e) => {
                        const value = e.target.value
                        setUsername(value)
                        setShowUsername(value)
                    }} placeholder="username"></input>

                    <input type="password" value={password} onChange={(e) => {
                        const value = e.target.value
                        setPassword(value)
                    }} placeholder="password"></input>

                    <button type="button" onClick={async (e) => {
                        
                        const loginValidCheck = loginValidator(username, password)
                        if (!loginValidCheck.isValid) {
                            console.log("Login Invalid")
                            setValidationMessage(loginValidCheck.message)
                            return;
                        } 
                        setValidationMessage("")
                        
                        const loginResult = await loginUser(username, password)
                        console.log(loginResult)
                        // console.log(showUsername)
                        setIsAuthLoading(true)
                        if (loginResult) {
                            setIsAuthLoading(false)
                            passToken()
                            navigate('/todo')
                        }
                    }}>Login</button>
                </div>
        </div>
    )
}

export default LoginPage