import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() =>{
        // Retreive all the posts to be used in the html
        const posts = getPosts();
    })

    async function getPosts(filter){
        await axios.post('http://localhost:8080/feed', filter)
            .then((response) => { console.log(response) })
    }


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
        navigate('/dashboard');
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
        <div>
            <h2>The Feed</h2>
        </div>
    </div>
    );
}