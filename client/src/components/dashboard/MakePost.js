/**
 * The frontend page that allows users to make posts send them to the server to be checked and have additional statistics
 * generated for them. The result of if it was posted and the reason for it it wasn't (malicious input caught by server)
 * is displayed here.
 */
import React from 'react';
import axios from 'axios';
import '../../App.css';
import {Link} from 'react-router-dom';

export default function Dashboard() {

	const handleSubmit = async e => {
		e.preventDefault();
		await makePost();
	};
	/**
     * Posts the users input to the database to make a new post. This post will have additional statistics added to it.
     * It will also be checked for malicious input. The response of the server is sent to serverReply()
     */
	async function makePost() {
		const postDetails = {
			username: String(sessionStorage.getItem('username')),
			sport: String(document.getElementById('postSport').value),
			intensity: String(document.getElementById('postIntensity').value),
			distance: String(document.getElementById('postDistance').value),
			time: String(document.getElementById('postTime').value),
			description: String(document.getElementById('postDescription').value)
		};
		axios.post('http://localhost:8080/post', postDetails)
			.then((response) => { serverReply(response); });
	}
	/**
     * Alerts the user if the post was made or not and why if not eg. using bad characters
     * @param res the servers response to if it made the post or not
     */
	function serverReply(res) {
		console.log(res.data.message);
		alert(res.data.message);
	}
	return(
		<div>
			<h1>Dashboard</h1>
			<div>
				<h2>Make a post</h2>
				<form onSubmit={handleSubmit}>
					<label>Sport Undertaken
						<select id="postSport" name="sport">
							<option value="running">Running</option>
							<option value="swimming">Swimming</option>
							<option value="walking">Walking</option>
							<option value="cycling">Cycling</option>
						</select>
					</label>
					<label>Intensity
						<select id="postIntensity" name="intensity">
							<option value="low">Low</option>
							<option value="med">Medium</option>
							<option value="high">High</option>
						</select>
					</label>
					<label>
						<input type="number" placeholder="distance" name="distance" id="postDistance"/>
					</label>
					<label>
						<input type="number" placeholder="time" name="time" id="postTime"/>
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
