import '../App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_KEY = "fe6b0f3a";

function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchMovies = () => {
    if (searchTerm.trim() === "") return;

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
     <div className="search-container">
  <input
    type="text"
    placeholder="Search for a movie..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={handleKeyPress}
    className="search-input"
  />
  <button onClick={searchMovies} className="search-button">
    🔍 Search
  </button>
</div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.imdbID}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
