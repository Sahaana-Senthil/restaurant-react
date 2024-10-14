import React, { useState } from "react";
import "./joinuspage.css";
import axios from "axios";

function JoinUsPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (formData.password !== formData.rePassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            
            const response = await axios.post("http://localhost:3002/api/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            setMessage(response.data.message); 
        } catch (error) {
            setMessage(error.response?.data?.message || "Error occurred while registering");
        }
    };

    return (
        <div className="jp">
            <h1>Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter Password"
                    value={formData.rePassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>} 
        </div>
    );
}

export default JoinUsPage;
