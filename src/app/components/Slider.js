"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
export default function Slider({ movielist }) {
  let count = 1;
  return (
    <div>
      <Carousel data-bs-theme="light">
        {movielist.map((movie) => (
          <Carousel.Item key={movie.id}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,

                // /* Center and scale the image nicely */

                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <img
                className="d-block w-100 col-sm-12 col-12 img-fluid "
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="First slide"
                style={{
                  marginTop:"60px",
                  height: "80vh",
                  // width: "100%",
                  objectFit: "contain",
                  display: "block",
                  /* Add the blur effect */
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
