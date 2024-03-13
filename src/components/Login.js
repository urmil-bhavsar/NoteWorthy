import { hover } from '@testing-library/user-event/dist/hover'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = (props) => {
    const { showAlert } = props
    const [credentials, setCredentials] = useState({
        email: "", password: ""
    })
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log("son son", json);
        if (json.success) {
            console.log("jsonnnn", json.authToken)
            //save the authtoken and redirect
            localStorage.setItem("token", json.authToken)
            navigate("/")
            showAlert("Logged In Successfully", 'success')
        } else {

            showAlert("invalid details", "danger")
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container w-25 mx-auto my-5'>
                <h1 style={{ textAlign: "center" }}>LOGIN</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input name='email' type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="form-control" id="email" aria-describedby="emailHelp"

                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name='password' type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-control" id="password" />
                    </div>

                    <button type="submit" className="btn btn-dark w-100">Login</button>
                    <p style={{ textAlign: "center", paddingTop: "2%", color: "black" }}>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Signup</Link></p>
                </form >
            </div>
        </>
    )
}
