// movieid.js
"use client";

import { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa6";

export default function Movieid({ params }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getmovie = async () => {
      try {
        fetch(
          `https://api.themoviedb.org/3/movie/${params.movieid}?api_key=79bd47a591062f4695f664d8ff6a67d7`
        )
          .then((res) => res.json())
          .then((res) => setMovie(res));
      } catch (error) {
        setError("Error fetching data");
      }
    };
    getmovie();
    return () => {};
  }, []);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div
      className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg my-3 p-3"
      style={{ color: "white" }}
    >
      <h1 className="d-flex align-items-center justify-content-center my-3 p-3">
        {movie.title}
      </h1>
      <div className="col-lg-3 align-items-center justify-content-center offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img
          className="rounded-lg-3"
          style={{ width: "98%" }}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          width="720"
        />
      </div>
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis"></h1>
        <h3>Overview </h3>
        <p className="lead"> {movie.overview}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button
            type="button"
            className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
          >
            <BiSolidStar />
            {movie.vote_average}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
          >
            {movie.vote_count} <FaThumbsUp size={25} color="white" />
          </button>
          <button type="button" className="btn btn-outline-light">
            Realiase On {movie.release_date}
          </button>
        </div>
      </div>
    </div>
  );
}
