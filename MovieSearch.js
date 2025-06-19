import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_KEY = "fe6b0f3a";

function MovieSearch() {
  const [darkMode, setDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("");
const [selectedMovie, setSelectedMovie] = useState(null);

  const navigate = useNavigate();
  

  const searchMovies = () => {
    if (searchTerm.trim() === "") return;

    const url = `https://www.omdbapi.com/?s=${searchTerm}&type=${type}&y=${year}&apikey=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          let sortedMovies = data.Search;

if (sortBy === "title") {
  sortedMovies = [...data.Search].sort((a, b) =>
    a.Title.localeCompare(b.Title)
  );
} else if (sortBy === "year") {
  sortedMovies = [...data.Search].sort((a, b) =>
    parseInt(b.Year) - parseInt(a.Year)
  );
}

setMovies(sortedMovies);

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
    <div className={`App ${darkMode ? "dark" : ""}`}>
      {/* 🌙 Dark Mode Toggle */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <h1>Movie Search App</h1>

      {/* 🎛 Filters */}
      <div className="filters">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <input
          type="number"
          placeholder="Year (e.g. 2020)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      {/* 🔍 Search */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={searchMovies} className="search-button">
          🔍 Search
        </button>
      </div>

      {/* 🎬 Movie Cards */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.imdbID}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
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
