import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../App.css';
import {Link} from "react-router-dom";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function getPosts() {
            const filter = sessionStorage.getItem('username');
            const retrievedPosts = await axios.post('http://localhost:8080/feed', {username: filter})
                .then((response) => {
                    return response.data
                }).catch(err => (err))
            if(retrievedPosts.length !== posts.length)
                setPosts(retrievedPosts);
        }
        getPosts().then()
        console.log(posts);
    }, [posts])

    return(
    <div>
        <h1>Dashboard</h1>
        <div>
            <Link to='/post'> Want to make a post?</Link>
            <h2>The Feed</h2>
            <div>
                {posts.length > 0 && posts.map((post) => (
                    <div className={"Post-Style"} key={post._id}>
                        <h3>{post.username} posted a new update</h3>
                        <p>Sport undertaken:{post.sport}</p>
                        <p>Distance travelled:{post.distance}</p>
                        <p>Time taken:{post.time}</p>
                        <p>Calculated calories burned:{post.calories}</p>
                        <p>Calculated average speed:{post.speedkph} kph / {post.speedmph} mph</p>
                        <p>{post.username}'s thoughts {post.description}</p>
                    </div>
                    ))}
                    </div>
        </div>
    </div>
    );
}