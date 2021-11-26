import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        await registerPost();
    }

    async function registerPost() {
        const userDetails = {
            username: String(document.getElementById('usernameRegister').value),
            password: String(document.getElementById('passwordRegister').value)
        };
        axios.post('http://localhost:8080/register', userDetails)
            .then((response) => { nextPage(response) })
    }

    function nextPage(res) {
        console.log(res.data.verified);
        sessionStorage.setItem('verified', 'true');
        sessionStorage.setItem('username', String(document.getElementById('usernameRegister').value));
        navigate('/dashboard');
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Register here</h3>
                <label>
                    <input type="text" placeholder="username" name="username" id="usernameRegister"/>
                </label>
                <label>
                    <input type="password" placeholder="password" name="userPass" id="passwordRegister"/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to='/'> Go to login page instead</Link>
        </div>
    )
}