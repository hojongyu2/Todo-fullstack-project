import React from "react"
import '../css/Login.css'

const LoginPage = () => {

    return (
        <div className="container">
            
            <div className="create-account">
                <img src="https://img.freepik.com/premium-vector/young-man-sits-his-desk-workplace-using-his-personal-desktop-computer-working-online-program-work-home-concept-vector-illustration-isolated-white-background_37895-775.jpg"></img>
                <button>Create an account</button>
            </div>
            <div className="login-container">
                <label><strong>Login</strong></label>
                <label>email</label>
                <input></input>
                <label>password</label>
                <input></input>
                <button>Login</button>
            </div>
        </div>
    )
}

export default LoginPage