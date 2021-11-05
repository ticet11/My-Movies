import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import Header from "./components/header";
import Carousel from "./components/carousel/carousel";
import AllMovies from "./pages/AllMovies";
import AddMovie from "./pages/AddMovie";
import Movie from "./pages/Movie";
import "./Style/main.scss";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/allmovies" element={<AllMovies />} />
						<Route path="/addmovie" element={<AddMovie />} />
						<Route path="/movie/:slug" element={<Movie />} />
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

const Home = () => (
	<div>
		<div className="CarouselWrapper">
			<h2>Family Movie Night</h2>
			<div>
				<Carousel genre="Animation" />
			</div>
			<h2>Something Funny</h2>
			<div>
				<Carousel genre="Comedy" />
			</div>
			<h2>Action Packed</h2>
			<div>
				<Carousel genre="Action" />
			</div>
		</div>
	</div>
);
export default App;
