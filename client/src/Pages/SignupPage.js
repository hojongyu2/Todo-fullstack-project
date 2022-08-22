import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Auth";


const SignupPage = ({ isAuthLoading, setIsAuthLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor:"white"}}>
            <img style={{ height: "40vh", width: "60vw"}} src="https://img.freepik.com/premium-vector/flat-design-vector-cartoon-diverse-characters-young-men-women-working-office_171919-846.jpg?w=1060" alt="peace"></img>
            
            <div className="d-flex justify-content-around" style={{height:"300px"}}>
                <div className="d-flex flex-column justify-content-evenly">

                    <div className="register-validation-message">
                        {validationMessage && validationMessage}
                    </div>
                    <h1><strong>Sign up</strong></h1>
                    <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        <input style={{ borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "20px" }} className="text-center" type="text" value={username} onChange={(e) => {
                            let value = e.target.value
                            setUsername(value)
                        }} placeholder="username"></input>
                    </label>
                    <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                        <input style={{ borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "20px" }} className="text-center" type="password" value={password} onChange={(e) => {
                            let value = e.target.value
                            setPassword(value)
                        }} placeholder="password"></input>
                    </label>

                    <button className="btn btn-primary" onClick={async () => {
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
            <div>
                <button type="button" class="btn btn-link" onClick={() => {
                    navigate('/')
                }}>I am already member</button>
            </div>
        </div>
    )
}

export default SignupPage