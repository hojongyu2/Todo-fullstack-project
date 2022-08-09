import React from "react";
// import '../css/Signup.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser  } from "../Auth";


const SignupPage = ({ isAuthLoading, setIsAuthLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();

    return (
        <div className="signup-container">
            <div className="create-account">
                <img src="https://img.freepik.com/premium-vector/flat-design-vector-cartoon-diverse-characters-young-men-women-working-office_171919-846.jpg?w=1060" alt="peace"></img>

            </div>
            <div className="register">
                <div className="register-validation-message">
                    {validationMessage && validationMessage}
                </div>
                <h1>Sign up</h1>
               
                <input type="text" value={username} onChange={(e) => {
                    let value = e.target.value
                    setUsername(value)
                }} placeholder="username"></input>
                
                <input type="password" value={password} onChange={(e) => {
                    let value = e.target.value
                    setPassword(value)
                }} placeholder="password"></input>

                <button onClick={ async () => {
                    setIsAuthLoading(true)
                    const registerResult = await registerUser(username, password);
                    console.log(registerResult.success)// this is from backend
                    console.log(registerResult.message)// this is from backend
                    if (!registerResult.success) {
                        setValidationMessage(registerResult.message)
                        setIsAuthLoading(false);
                        return;
                    }
                    // console.log(registerResult)
                    if (registerResult) {
                        const loginResult = await loginUser(username, password);
                        console.log(loginResult)
                        if (loginResult) {
                            setIsAuthLoading(false);
                            navigate('/')
                        }
                    }
                }}>Register</button>
            </div>
        </div>
    )
}

export default SignupPage