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
            password: String(document.getElementById('passwordRegister').value),
            weight: String(document.getElementById('weightRegister').value),
            favouriteSport: String(document.getElementById('sportRegister').value)
        };
        axios.post('http://localhost:8080/register', userDetails)
            .then((response) => { nextPage(response) })
    }

    function nextPage(res) {
        console.log(res.data.verified);
        sessionStorage.setItem('verified', res.data.verified);
        if (sessionStorage.getItem('verified') === 'yes') {
            sessionStorage.setItem('username', String(document.getElementById('usernameRegister').value));
            navigate('/dashboard');
        } else {
            alert('Username already in use');
        }
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
                <label>
                    <input type="number" placeholder="weight in kg" name="userWeight" id="weightRegister"/>
                </label>
                <label>Your favourite sport
                    <select id="sportRegister" name="userFavourite">
                        <option value="running">Running</option>
                        <option value="swimming">Swimming</option>
                        <option value="walking">Walking</option>
                        <option value="cycling">Cycling</option>
                    </select>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to='/'> Go to login page instead</Link>
        </div>
    )
}