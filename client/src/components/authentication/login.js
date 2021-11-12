import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";

//import {Link} from "react-router-dom";
//import {Link, useHistory} from "react-router-dom";


async function loginPost() {
    const userDetails = {
        username: String(document.getElementById('username').value),
        password: String(document.getElementById('password').value)
    };
    axios.post('http://localhost:8080/login', userDetails)
        .then((response) => { verified(response) })
}

function verified(res) {
    //const history = useHistory();
    console.log(res.data.verified);
    sessionStorage.setItem('verified', res.data.verified);
    //
    //const history = createBrowserHistory()
    //return (<Link to="/dashboard">Continue to dashboard</Link>)
    //history.push('/dashboard');
    //send to dashboard
}

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        await loginPost();
        navigate('/dashboard');
        //return(<Link to="/dashboard">Proceed click here</Link>)
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
        </div>
    )
}