import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
//import {Link, useHistory} from "react-router-dom";




export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        await loginPost();
    }

    async function loginPost() {
        const userDetails = {
            username: String(document.getElementById('username').value),
            password: String(document.getElementById('password').value)
        };
        axios.post('http://localhost:8080/login', userDetails)
            .then((response) => { verified(response) })
    }

    async function verified(res) {
        console.log(res.data.verified);
        sessionStorage.setItem('verified', res.data.verified);
        if (sessionStorage.getItem('verified') === 'yes') {
            navigate('/dashboard');
        }
    }

    return(
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder="username" name="username" id="username"/>
                </label>
                <label>
                    <input type="password" placeholder="password" name="userPass" id="password"/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to='/register'> Go to registration page instead</Link>
        </div>
    )
}