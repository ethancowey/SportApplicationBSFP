/**
 * The frontend page which requests the server sends a tailored feed for the current user.
 */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../App.css';
import {Link} from 'react-router-dom';

export default function Feed() {
	const [posts, setPosts] = useState([]); // the prop which holds the posts and is displayed in the html

	/**
     * On load of the page it will request the posts from the server which are tailored to the current user. They are then
     * used as a prop to be displayed in the html.
     */
	useEffect(()=>{
		async function getPosts() {
			const filter = sessionStorage.getItem('username');
			const retrievedPosts = await axios.post('http://localhost:8080/feed', {username: filter})
				.then((response) => {
					return response.data;
				}).catch(err => (err));
			if(retrievedPosts.length !== posts.length)
				setPosts(retrievedPosts); // sets the posts prop to the posts from the server
		}
		getPosts().then();
	}, [posts]);

	return(
		<div>
			<h1>Dashboard</h1>
			<div>
				<Link to='/post'> Want to make a post?</Link>
				<h2>The Feed</h2>
				<div>
					{posts.length > 0 && posts.map((post) => (
						<div className={'Post-Style'} key={post.id}>
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
