import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import '../../App.css';
import {Link} from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await makePost();
    }

    async function makePost() {
        const postDetails = {
            username: String(sessionStorage.getItem('username')),
            sport: String(document.getElementById('postSport').value),
            distance: String(document.getElementById('postDistance').value),
            time: String(document.getElementById('postTime').value),
            description: String(document.getElementById('postDescription').value)
        };
        axios.post('http://localhost:8080/post', postDetails)
            .then((response) => { refreshPage(response) })
    }
    function refreshPage(res) {
        console.log(res);
        navigate('/post');
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Make a post</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" placeholder="sport" name="sport" id="postSport"/>
                    </label>
                    <label>
                        <input type="text" placeholder="distance" name="distance" id="postDistance"/>
                    </label>
                    <label>
                        <input type="text" placeholder="time" name="time" id="postTime"/>
                    </label>
                    <label>
                        <input type="text" placeholder="description" name="description" id="postDescription"/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <Link to='/dashboard'> Go to the feed</Link>
        </div>
    );
}