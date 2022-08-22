import React from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { loginUser } from "../Auth";


const loginValidator = (username, password) => {
    if (!username) {
        return { isValid: false, message: "No username provided." }
    }
    if (!password) {
        return { isValid: false, message: "No password provided." }
    }
    return { isValid: true }
}

const LoginPage = ({ isAuthLoading, setIsAuthLoading, showUsername, setShowUsername }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();


    return (
        <div className='d-flex justify-content-evenly' style={{backgroundColor:"white"}}>
            <div className="d-flex flex-column">
                <img style={{ height: "80vh", width: "40vw" }} src="https://img.freepik.com/premium-vector/young-man-sits-his-desk-workplace-using-his-personal-desktop-computer-working-online-program-work-home-concept-vector-illustration-isolated-white-background_37895-775.jpg" alt="peace"></img>
                <button className="btn btn-outline-primary" onClick={() => {
                    navigate('/sign-up')
                }}>Create an account</button>

            </div>
            <div className="d-flex justify-content-sm-evenly flex-column">
                <div className="login-validation-message">
                    {validationMessage && validationMessage}
                </div>
                <h1><strong>Login</strong></h1>
                
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <input style={{ borderTop:"none", borderLeft:"none", borderRight:"none", fontSize:"20px" }} className="text-center" type="text" value={username} onChange={(e) => {
                        const value = e.target.value
                        setUsername(value)
                        setShowUsername(value)
                    }} placeholder="username"></input>
                </label>
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input style={{ borderTop:"none", borderLeft:"none", borderRight:"none", fontSize:"20px"}} className="text-center" type="password" value={password} onChange={(e) => {
                        const value = e.target.value
                        setPassword(value)

                    }} placeholder="password"></input>
                </label>

                <button className="btn btn-primary" type="button" onClick={async (e) => {

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
                        navigate('/todo')
                    }
                }}>Login</button>
            </div>
        </div>
    )
}

export default LoginPage