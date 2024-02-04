"use client";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth"; // Add this line
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidStar } from "react-icons/bi";
import { app, auth, firestore, storage } from "@/app/firebase/config";

export default function Movieid({ params }) {
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0.0);
  const [overview, setOverview] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [genre, setGenre] = useState("action");
  const [releaseDate, setReleaseDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add authentication listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    // Fetch movie details
    const fetchMovieDetails = async () => {
      try {
        const movieDocRef = doc(firestore, "movies", params.id);

        // Fetch initial movie details
        const movieSnapshot = await getDoc(movieDocRef);
        if (movieSnapshot.exists()) {
          const movieData = movieSnapshot.data();
          setMovie(movieData);
          setTitle(movieData.title);
          setRating(movieData.rating);
          setOverview(movieData.overview);
          setGenre(movieData.genre);

          // Check if releaseDate is a valid Date object before converting
          if (movieData.releaseDate instanceof Date) {
            setReleaseDate(new Date(movieData.releaseDate.toMillis()));
          } else {
            setReleaseDate(null); // Or handle it based on your requirements
          }

          // Set up real-time listener for movie updates
          const unsubscribe = onSnapshot(movieDocRef, (updatedMovie) => {
            const updatedMovieData = updatedMovie.data();
            setMovie(updatedMovieData);
            setTitle(updatedMovieData.title);
            setRating(updatedMovieData.rating);
            setOverview(updatedMovieData.overview);
            setGenre(updatedMovieData.genre);

            if (updatedMovieData.releaseDate instanceof Date) {
              setReleaseDate(new Date(updatedMovieData.releaseDate.toMillis()));
            } else {
              setReleaseDate(null);
            }
          });

          return () => unsubscribe(); // Cleanup the listener on component unmount
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (params.id) {
      fetchMovieDetails();
    }

    // Cleanup the authentication listener
    return () => unsubscribeAuth();
  }, [params.id]);

  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    try {
      console.log("Updating movie...");

      const movieDocRef = doc(firestore, "movies", params.id);

      // Fetch current movie details
      const movieSnapshot = await getDoc(movieDocRef);
      if (!movieSnapshot.exists()) {
        console.error("Movie not found");
        return;
      }

      const currentMovieData = movieSnapshot.data();

      // Create a new storage reference for each update
      const storageRef = ref(storage, `movies/${fileUpload.name}`);

      // Upload file if there's a new file
      if (fileUpload) {
        console.log("Uploading file...");
        await uploadBytes(storageRef, fileUpload);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File uploaded successfully. Download URL:", downloadURL);

        // Update movie data in Firestore
        const updatedData = {
          title,
          rating,
          overview,
          genre: genre === "default" ? "Action" : genre, // Check if genre is default
          releaseDate:
          releaseDate instanceof Date
          ? releaseDate.toJSON().split('T')[0]  // Extracting only the date part
          : releaseDate,
          fileURL: downloadURL,
          timestamp: serverTimestamp(),
        };

        console.log("Updating movie data:", updatedData);

        await updateDoc(movieDocRef, updatedData);

        console.log("Movie successfully updated!");
        window.location.reload();
      } else {
        // Update movie data in Firestore without changing the file
        const updatedData = {
          title,
          rating,
          overview,
          genre: genre === "default" ? "Action" : genre, // Check if genre is default
          releaseDate:
          releaseDate instanceof Date
          ? releaseDate.toJSON().split('T')[0]  // Extracting only the date part
          : releaseDate,
          timestamp: serverTimestamp(),
        };

        console.log("Updating movie data:", updatedData);

        await updateDoc(movieDocRef, updatedData);

        console.log("Movie successfully updated (without file)!");
       
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

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
          src={movie.fileURL}
          alt=""
          width="720"
        />
      </div>
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis"></h1>
        <h3>Overview</h3>
        <p className="lead">{movie.overview}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"></div>
        
      
        <a className="btn disabled m-2 p-2 " aria-disabled="true" role="button" data-bs-toggle="button"> <BiSolidStar size={20} color="white" /> {movie.rating }</a>
  <a className="btn disabled m-2 p-2 " aria-disabled="true" role="button" data-bs-toggle="button">Realese on :  {movie.releaseDate }</a>
  <a className="btn disabled m-2 p-2 " aria-disabled="true" role="button" data-bs-toggle="button">{movie.genre }</a>
  {user && (
          <button
            type="button"
            className="btn btn-primary my-3 py-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => setShowModal(true)}
            style={{width:"110px", margintop: "10px" }}
          >
            Update
          </button>
        )}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{ background: "black", color: "white" }}
            >
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 justify-content-center align-items-center "
                  id="exampleModalLabel"
                >
                  Update Movie
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  className="container my-3 justify-content-center align-items-center mt-3 pt-3 bg- text-white"
                  style={{ background: "black", width: "100%" }}
                >
                  <div className="row justify-content-center mt-8">
                    <div className="col-md-8 ">
                      {movie && (
                        <form>
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              style={{ backgroundColor: "#8d9199" }}
                              id="title"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="rating" className="form-label">
                              Rating
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              className="form-control"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              style={{ backgroundColor: "#8d9199" }}
                              id="rating"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="overview" className="form-label">
                              Overview
                            </label>
                            <textarea
                              className="form-control"
                              id="overview"
                              value={overview}
                              onChange={(e) => setOverview(e.target.value)}
                              style={{ backgroundColor: "#8d9199" }}
                              rows="3"
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="genre" className="form-label">
                              Genre
                            </label>
                            <select
                              className="form-select"
                              value={genre}
                              onChange={(e) => setGenre(e.target.value)}
                              style={{ backgroundColor: "#8d9199" }}
                            >
                              <option value="action">Action</option>
                              <option value="horror">Horror</option>
                              <option value="thriller">Thriller</option>
                              <option value="drama">Drama</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="releaseDate" className="form-label">
                              Release Date
                            </label>
                            <DatePicker
                              selected={releaseDate}
                              onChange={(date) => setReleaseDate(date)}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              style={{ backgroundColor: "#8d9199" }}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="file" className="form-label">
                              Upload File
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              style={{ backgroundColor: "#8d9199" }}
                              onChange={(e) => {
                                console.log(
                                  "Selected file:",
                                  e.target.files[0]
                                );
                                setFileUpload(e.target.files[0]);
                              }}
                            />
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateMovie}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
