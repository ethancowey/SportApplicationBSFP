import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import '../../App.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function getPosts() {
            const filter = false;
            const retrievedPosts = await axios.post('http://localhost:8080/feed', filter)
                .then((response) => {
                    return response.data
                }).catch(err => (err))
            if(retrievedPosts.length !== posts.length)
                setPosts(retrievedPosts);
        }
        getPosts().then()
        console.log(posts);
    }, [posts])

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
            <div>
                {posts.length > 0 && posts.map((post) => (
                    <div className={"Post-Style"}>
                        <h3>{post.username} posted a new update</h3>
                        <p>Sport undertaken:{post.sport}</p>
                        <p>Distance travelled:{post.distance}</p>
                        <p>Time taken:{post.time}</p>
                        <p>{post.username}'s thoughts {post.description}</p>
                    </div>
                    ))}
                    </div>
        </div>
    </div>
    );
}