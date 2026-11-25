import { Link } from "react-router-dom";
import type { MovieCardProps } from "../types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="card">
      <div className="card__poster">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "Poster non disponibile"
        )}
      </div>
      <div className="card__body">
        <h2 className="card__title">{movie.title}</h2>
        <p className="card__meta">
          Uscita: {movie.release_date || "N/D"} · Voto: {movie.vote_average.toFixed(1)}
        </p>
        <p className="card__overview">
          {movie.overview || "Nessuna descrizione disponibile."}
        </p>
        <Link className="card__cta" to={`/movies/${movie.id}`}>
          Dettaglio
        </Link>
      </div>
    </article>
  );
}