"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BiSolidStar } from "react-icons/bi";

function Moviedata() {
  const [movielist, setMovielist] = useState([]);

  useEffect(() => {
    const getmovie = async () => {
      try {
        fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=79bd47a591062f4695f664d8ff6a67d7"
        )
          .then((res) => res.json())
          .then((json) => setMovielist(json.results));
      } catch (error) {
        setError("Error fetching data");
      }
    };
    getmovie();
    return () => {};
  }, []);
  return (
    <div>
      <h2 className="text-center p-3"> Movies</h2>
      {movielist.map((movie) => (
        <div key={movie.id} className="container my-3 p-3 d-flex">
          <div
            className="card mb-3 bs-tertiary-color-rgb "
            style={{
              maxwidth: " 340px",
              backgroundColor: "rgb(63, 61, 61)",
              color: "white",
            }}
          >
            <Link href={`/topmovie/${movie.id}`}>
              <div className="row">
                <div className="col">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    style={{ height: "60vh", width: "100%" }}
                    className="rounded float-left"
                    alt="..."
                  />
                </div>
                <div className="col-md-9 ">
                  <div className="card-body">
                    <h5 className="card-title grid gap-3">
                      {movie.title} <BiSolidStar size={25} color="white" />
                      {movie.vote_average}
                    </h5>
                    <h5>Overview:</h5>
                    <p className="card-text"> {movie.overview}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Moviedata;
