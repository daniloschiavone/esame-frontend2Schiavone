import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { MovieDetail as MovieDetailType } from "../types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Errore HTTP: ${res.status}`);
        }
        return res.json() as Promise<MovieDetailType>;
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Caricamento dettaglio film...</p>;
  }

  if (error || !movie) {
    return (
      <>
        <Link className="back-link" to="/">
          ← Torna all’elenco
        </Link>
        <p>Errore nel caricamento del film: {error || "Dati non trovati"}</p>
      </>
    );
  }

  return (
    <>
      <Link className="back-link" to="/">
        ← Torna all’elenco
      </Link>

      <article className="detail">
        <div>
          <div className="detail__poster">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "Poster"
            )}
          </div>
        </div>

        <div>
          <h1 className="detail__title">{movie.title}</h1>
          {movie.tagline && (
            <p className="detail__tagline">“{movie.tagline}”</p>
          )}

          <ul className="detail__meta">
            <li>Uscita: {movie.release_date || "N/D"}</li>
            <li>Durata: {movie.runtime} min</li>
            <li>Voto: {movie.vote_average.toFixed(1)}</li>
            <li>Voti: {movie.vote_count.toLocaleString("it-IT")}</li>
            <li>Stato: {movie.status}</li>
            <li>Lingua: {movie.original_language.toUpperCase()}</li>
          </ul>

          <div className="detail__genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="detail__overview-label">Trama</p>
          <p className="detail__overview">
            {movie.overview || "Nessuna trama disponibile."}
          </p>

          {movie.production_companies.length > 0 && (
            <p className="card__meta">
              Produzione:{" "}
              {movie.production_companies
                .map((company) => company.name)
                .join(" · ")}
            </p>
          )}
        </div>
      </article>
    </>
  );
}