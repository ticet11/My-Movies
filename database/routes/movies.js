//TODO: fix getMoviesByGenre() so it accesses the correct data

const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const fs = require("fs");

// Getting all
router.get("/", async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get("/:id", getMovie, (req, res) => {
	try {
		res.json(res.movie);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

// Getting Video
router.get("/:id/video", getMovie, (req, res) => {
	const range = req.headers.range;
	if (!range) res.status(404).json({ message: "Missing Range Header!" });

	const videoPath = res.movie.location;
	const videoSize = fs.statSync(videoPath).size;

	const CHUNK_SIZE = 5 * 1024 ** 2;
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	res.writeHead(206, headers);

	const videoStream = fs.createReadStream(videoPath, { start, end });

	videoStream.pipe(res);
});

// Creating One
router.post("/", async (req, res) => {
	const movie = new Movie({
		genre: req.body.genre,
		location: req.body.location,
		movie_poster: req.body.movie_poster,
		release_date: req.body.release_date,
		runtime: req.body.runtime,
		tagline: req.body.tagline,
		title: req.body.title,
		vote_average: req.body.vote_average,
		overview: req.body.overview,
	});

	try {
		const newMovie = await movie.save();
		res.status(201).json(newMovie);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch("/:id", getMovie, async (req, res) => {
	if (req.body.title != null) {
		res.movie.title = req.body.title;
	}
	if (req.body.genre != null) {
		res.movie.genre = req.body.genre;
	}
	if (req.body.releaseDate != null) {
		res.movie.releaseDate = req.body.releaseDate;
	}
	try {
		const updatedMovie = await res.movie.save();
		res.json(updatedMovie);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete("/:id", getMovie, async (req, res) => {
	try {
		await res.movie.remove();
		res.json({ message: "Deleted movie." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getMovie(req, res, next) {
	try {
		movie = await Movie.findById(req.params.id);
		if (movie == null) {
			return res.status(404).json({ message: "Cannot find movie." });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.movie = movie;
	next();
}

module.exports = router;
