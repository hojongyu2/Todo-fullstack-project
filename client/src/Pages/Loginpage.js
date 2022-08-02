import React from "react"

const LoginPage = () => {

    return (
        <div className="contatiner">
            <strong>Login</strong>
            <div className="create-account">
                {/* <img></img> */}
                <button>Create an account</button>
            </div>
            <div className="login-container">
                <label>username</label>
                <input></input>
                <label>password</label>
                <input></input>
                <button>Login</button>
            </div>
        </div>

    )
}

export default LoginPage