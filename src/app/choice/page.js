
"use client"
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BiSolidStar } from 'react-icons/bi';
import Link from 'next/link';

export default function Pages() {
  const [movies, setMovies] = useState([]);
  const [selectedRatingRange, setSelectedRatingRange] = useState(null);

  const moviesCollectionRef = collection(firestore, 'movies');

  useEffect(() => {
    const getMovieList = async () => {
      try {
        let movieQuery = moviesCollectionRef;

       
        if (selectedRatingRange) {
          const [min, max] = selectedRatingRange.split('-');
          const minRating = parseFloat(min);
          const maxRating = parseFloat(max);

          console.log('minRating:', minRating);
          console.log('maxRating:', maxRating);

          movieQuery = query(
            moviesCollectionRef,
            where('rating', '>=', minRating),
            where('rating', '<=', maxRating)
          );
        }

        const querySnapshot = await getDocs(movieQuery);
        const movieData = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          serialNumber: index + 1,
          ...doc.data(),
        }));

        setMovies(movieData);
        console.log(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, [selectedRatingRange]);

  const ratingOptions = [
    { label: 'All Ratings', value: null },
    { label: '1 to 4', value: '1-4.9' },
    { label: '5 to 6', value: '5-6.9' },
    { label: '7 to 8', value: '7-8.9' },
    { label: '9 to 10', value: '9.0-10' },
  ];

  const reactSelectRatingOptions = ratingOptions.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <div className="container">
      <h2 className="text-center p-3"> Movies</h2>

      <Select
        id="ratingFilter"
        className="mb-3"
        options={reactSelectRatingOptions}
        value={reactSelectRatingOptions.find(
          (option) => option.value === selectedRatingRange
        )}
        onChange={(selectedOption) =>
          setSelectedRatingRange(selectedOption ? selectedOption.value : null)
        }
        isSearchable={true}
        placeholder="Select Rating Range"
      />

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