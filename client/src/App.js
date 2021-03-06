/**
 * This sets the routes for each of the pages that a user can interact with. This file is key to the generation of the
 * pages and is rendered by index.js.
 */
import './App.css';
import Feed from './components/dashboard/Feed';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Post from './components/dashboard/MakePost';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';



function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}>

					</Route>
					<Route path="/register" element={<Register />}>

					</Route>
					<Route path="/dashboard" element={<Feed />}>

					</Route>
					<Route path="/post" element={<Post />}>

					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
