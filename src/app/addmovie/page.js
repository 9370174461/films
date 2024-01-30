"use client";
import { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Admin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [overview, setOverview] = useState("");
  const Router = useRouter();
  const [fileUpload, setFileUpload] = useState(null);
  const storage = getStorage();

  const auth = getAuth();

  const moviesCollectionRef = collection(firestore, "movies");

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
  const moviesubmit = async (e) => {
    e.preventDefault();
    try {
      
      console.log("File to upload:", fileUpload);
      const storageRef = ref(storage, `movies/${fileUpload.name}`);
      await uploadBytes(storageRef, fileUpload);

      
      const downloadURL = await getDownloadURL(storageRef);

      
      const docRef = await addDoc(moviesCollectionRef, {
        title: title,
        rating: rating,
        overview: overview,
        userId: auth?.currentUser?.uid,
        fileURL: downloadURL,
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Data Add successfully");
      setTitle("");
      setRating("");
      setOverview("");
      setFileUpload(null);
    } catch (err) {
      console.error(err);
      Router.push("/login");
    }
  };
  const singout = () => {
    signOut(auth)
      .then(() => {
        console.log("sucessfully logout");
      })
      .catch((error) => {
        
      });
  };

  return (
    <div
      className="container my-3 justify-content-center align-items-center mt-5 pt-5 .bg-secondary"
      style={{ color: "white" }}
    >
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form onSubmit={moviesubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
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
                type="text"
                className="form-control"
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
                onChange={(e) => setOverview(e.target.value)}
                style={{ backgroundColor: "#8d9199" }}
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Upload File
              </label>
              <input
                type="file"
                className="form-control"
                style={{ backgroundColor: "#8d9199" }}
                id="file"
                onChange={(e) => {
                  console.log("Selected file:", e.target.files[0]);
                  setFileUpload(e.target.files[0]);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
            
            <button className="btn btn-secondary btn-sm" onClick={singout}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
