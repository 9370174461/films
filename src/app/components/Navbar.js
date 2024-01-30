"use client";
import React, { useEffect } from "react";


export default function Navbar() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
 


  return (
    
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary  fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand fs-3 " href="/">
            Movie
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white text-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/allmovies">
                  All Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/popularmovie">
                  Popular Movie
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Add Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Random Movie
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/choice">
                 choice movie
                </a>
              </li>
            </ul>

          
            
          </div>
        </div>
      </nav>

      
  );
}
