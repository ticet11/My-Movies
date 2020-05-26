import React from "react";

import SearchMovies from "../components/Search/searchmovies";

export default function AddMovie() {
    return (
        <React.Fragment>
            <div>
                <h1>Add a Movie</h1>
                <SearchMovies />
            </div>
        </React.Fragment>
    );
}
