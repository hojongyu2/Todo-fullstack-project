import React from "react";

const SignupPage = () => {
    return (
        <div>
              <div className="create-account">
                <img src="https://img.freepik.com/premium-vector/flat-design-vector-cartoon-diverse-characters-young-men-women-working-office_171919-846.jpg?w=1060"></img>
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

export default SignupPage