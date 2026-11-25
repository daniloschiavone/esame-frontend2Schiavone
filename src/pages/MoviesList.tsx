import { useEffect, useState } from "react";
import type { Movie, MoviesResponse } from "../types";
import { MovieCard } from "../components/MovieCard";

export function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=The%20Lord%20of%20the%20Rings&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Errore HTTP: ${res.status}`);
        }
        return res.json() as Promise<MoviesResponse>;
      })
      .then((data) => {
        setMovies(data.results.slice(0, 20));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Caricamento film in corso...</p>;
  }

  if (error) {
    return <p>Errore nel caricamento: {error}</p>;
  }

  return (
    <>
      <h1 className="page-title">The Lord of the Rings</h1>
      <p className="page-sub">
        Risultati fissi da API · query=The Lord of the Rings · page=1 · max 20
        items · senza filtri / paginazione
      </p>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}