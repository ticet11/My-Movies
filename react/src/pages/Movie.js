// TODO: Get props to populate state.

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = (props) => {
	let params = useParams();
	const [currentId] = useState(params.slug);
	const [movie, setMovie] = useState({});

	const handleClick = () => {
		const video = document.querySelector("video");
		video.load();
	};

	useEffect(() => getMovie(), []);

	const getMovie = () => {
		axios
			.get(`http://localhost:3000/movies/${currentId}`)
			.then((response) => setMovie(response.data))
			.catch((error) => {
				console.error("getmovies error", error);
			});
	};

	return (
		<div>
			<h1>{movie.title}</h1>
			<video width="640" height="480" controls autoPlay muted>
				<source src={`http://localhost:3000/movies/${currentId}/video`} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<button onClick={() => handleClick()}>Reload Video</button>
		</div>
	);
};

export default Movie;
