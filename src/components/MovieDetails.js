import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "fe6b0f3a";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        }
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details" style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "200px", borderRadius: "8px" }} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>
      <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
    </div>
  );
}

export default MovieDetails;
