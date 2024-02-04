"use client";
import React, { useEffect,useState } from "react";
import { auth } from "../firebase/config";

export default function Navbar() {

  
const [user, setUser] = useState(null);
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleLogout = () => {
    try {
      auth.signOut();
  alert("Logout Successfull")
      
    } catch (error) {
      alert.error(error)
    }
    
  };

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
            
              {user && (
              <li className="nav-item position-absolute bottom-0 end-0">
                <button className="btn btn-sm btn-outline-secondary m-3" onClick={handleLogout} type="button">
                  Logout
                </button>
              </li>
            )}
            {!user && (
              <li className="nav-item position-absolute bottom-0 end-0">
                <a className="nav-link m-3" href="/login">
                  Login
                </a>
              </li>
             
            )} 
            </ul>

          
            
          </div>
        </div>
      </nav>

      
  );
}
