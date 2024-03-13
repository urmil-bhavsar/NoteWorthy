import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from "../context/alertContext/AlertContext";


export const Signup = () => {
    const context2 = useContext(AlertContext)
    const { showAlert } = context2

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = credentials; // destructuring 
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem("token", json.authToken)
            navigate("/login")
            showAlert("Account Created Successfully", "success")
        } else {
            showAlert("Invalid Credentials", "danger")
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container w-25  mx-auto my-5">
            <h1 style={{ textAlign: "center" }}>Signup</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={(e) => handleChange(e)} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => handleChange(e)} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required minLength={5} type="password" className="form-control" name='password' id="password" onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input required minLength={5} type="password" className="form-control" name='confirmPassword' id="confirmPassword" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-dark w-100">Signup</button>
                <p style={{ textAlign: "center", paddingTop: "2%", color: "black" }}>Already have an account? <Link style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/login">Login</Link></p>
            </form>
        </div>

    )
}
