'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BiSolidStar } from 'react-icons/bi';

export default function Pages() {
  const [movies, setMovies] = useState([]);

  const moviesCollectionRef = collection(firestore, 'movies');

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const querySnapshot = await getDocs(moviesCollectionRef);
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieData);
        console.log(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center p-3"> Movies</h2>
      {movies.map((movie) => (
        <div key={movie.id} className="my-3 p-3">
          <Link href={`admin/${movie.id}`}>
            <div>
              <div
                className="card bs-tertiary-color-rgb"
                style={{
                  maxWidth: '100%',
                  backgroundColor: 'rgb(63, 61, 61)',
                  color: 'white',
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        objectFit: 'cover',
                      }}
                    >
                      <img
                        src={movie.fileURL}
                        style={{
                          height: '60vh',
                          width: '100%',
                          objectFit: 'cover',
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
      ))}
    </div>
  );
}
