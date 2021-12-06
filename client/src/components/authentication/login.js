/**
 * The frontend page to interact with users logging in to the system and sending/receiving from the database.
 */
import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        await loginPost();
    }
    /**
     * Called when the html form is submitted and sends the details to the server to be processed. The response of the
     * server is then sent to verified()
     */
    async function loginPost() {
        const userDetails = {
            username: String(document.getElementById('username').value),
            password: String(document.getElementById('password').value)
        };
        axios.post('http://localhost:8080/login', userDetails)
            .then((response) => { verified(response) })
    }
    /**
     * Called by loginPost to process the servers response to if a user with those details existed or not. If they did
     * user is sent to the next page. If not the user is alerted the username or password was incorrect
     * @param res the servers response if the login was successful or not
     */
    async function verified(res) {
        console.log(res.data.verified);
        sessionStorage.setItem('verified', res.data.verified);
        if (sessionStorage.getItem('verified') === 'yes') {
            sessionStorage.setItem('username', String(document.getElementById('username').value));
            navigate('/dashboard');
        } else {
            alert('Incorrect username or password');
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
                    <button type="submit" id="subLogin">Submit</button>
                </div>
            </form>
            <Link to='/register'> Go to registration page instead</Link>
        </div>
    )
}