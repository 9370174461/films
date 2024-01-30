'use client'
import { useEffect, useState } from 'react';
import { getFirestore,getDoc,doc } from 'firebase/firestore';
import { BiSolidStar } from "react-icons/bi";

export default function Movieid({ params }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieRef = doc(getFirestore(), 'movies', params.id);
        const movieSnapshot = await getDoc(movieRef);

        if (movieSnapshot.exists()) {
          const movieData = movieSnapshot.data();
          setMovie(movieData);
          console.log(movieData);
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMovie();
  }, [params.id]);

  if (!movie) {
    return <div>Movie not found</div>;
  }
  


  return (
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg my-3 p-3"     style={{ color: "white" }}>
      <h1 className="d-flex align-items-center justify-content-center my-3 p-3">
        {movie.title}
      </h1>
      <div className="col-lg-3 align-items-center justify-content-center offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img
          className="rounded-lg-3"
          style={{ width: '98%' }}
          src={movie.fileURL}
          alt=""
          width="720"
        />
      </div>
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis"></h1>
        <h3>Overview </h3>
        <p className="lead">{movie.overview}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          
        </div>
        <button
            type="button"
            className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
          >
            <BiSolidStar />
            {movie.rating}
          </button>
      </div>
    </div>
  );
}
