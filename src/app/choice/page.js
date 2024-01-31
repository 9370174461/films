"use client"
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import Choices from "choices.js";
import Link from "next/link";
import { BiSolidStar } from "react-icons/bi";

export default function Pages() {
  const [movies, setMovies] = useState([]);
  const [selectedRatingRange, setSelectedRatingRange] = useState(null);

  const moviesCollectionRef = collection(firestore, "movies");

  useEffect(() => {
    const getData = async () => {
      if (selectedRatingRange) {
        try {
          const [min, max] = selectedRatingRange.split("-").map(Number);
          const q = query(
            moviesCollectionRef,
            where("rating", ">=", min),
            where("rating", "<=", max)
          );
          const querySnapshot = await getDocs(q);
          const movieData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(movieData);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?api_key=79bd47a591062f4695f664d8ff6a67d7"
          );
          const json = await response.json();
          setMovies(json.result);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    getData();
  }, [selectedRatingRange, moviesCollectionRef]);

  useEffect(() => {
    const choices = new Choices("#choices-movie-rating-selector", {
      removeItemButton: false,
    });

    return () => {
      choices.destroy();
    };
  }, []);

  const handleRatingRangeChange = (event) => {
    setSelectedRatingRange(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="text-center p-3"> Movies</h2>

      <select className="dropdown-menu dropdown-menu-xs"
        id="choices-movie-rating-selector"
        onChange={handleRatingRangeChange}
      >
        <option value="1-4">1-4</option>
        <option value="4-6">4-6</option>
        <option value="6-8">6-8</option>
        <option value="8-10">8-10</option>
      </select>

      {movies?movies.map((movie) => (
        <div key={movie.id} className="my-3 p-3">
          <Link href={`admin/${movie.id}`}>
            <div>
              <div
                className="card bs-tertiary-color-rgb"
                style={{
                  maxWidth: "100%",
                  backgroundColor: "rgb(63, 61, 61)",
                  color: "white",
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                        objectFit: "cover",
                      }}
                    >
                      <img
                        src={movie.fileURL}
                        style={{
                          height: "60vh",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        className=" rounded float-left"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center gap-3">
                        {movie.title} <BiSolidStar size={25} color="white" />
                        {movie.rating}
                      </h5>
                      <h5>Overview:</h5>
                      <p className="card-text">{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )):(
        <></>
      )}
    </div>
  );
}
