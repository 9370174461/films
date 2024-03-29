"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";


function Moviedata() {
  const [movielist, setMovielist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getmovie = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=79bd47a591062f4695f664d8ff6a67d7"
        );
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const json = await res.json();
        setMovielist(json.results);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    getmovie();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center p-3" style={{color:'white'}}>Top Movies</h2>
      {movielist.slice(0, 5).map((movie) => (
        <div
          key={movie.id}
          className="container my-3 p-3 d-flex"
          style={{ color: "white" }}
        >
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
                <div className="col justify-content-md-center">
                  <img
                  
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    style={{ height: "60vh", width: "100%" }}
                    className="rounded float-left img-fluid-sx"
                    alt="..."
                  />
                </div>
                <div className="col-md-9 " style={{}}>
                  <div className="card-body">
                    <h5 className="card-title grid gap-3">{movie.title} </h5>
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