import React from 'react';
import axios from "axios";


async function loginPost() {
    const userDetails = {
        username: String(document.getElementById('username').value),
        password: String(document.getElementById('password').value)
    };
    axios.post('http://localhost:8080/login', userDetails)
        .then((response) => { verified(response) })
}

function verified(res) {
    console.log(res.data.verified);
    sessionStorage.setItem('verified', res.data.verified);
    //send to dashboard
}

export default function Login() {
    const handleSubmit = async e => {
        e.preventDefault();
        await loginPost();
    }

    return(
        <div>
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
        </div>
    )
}