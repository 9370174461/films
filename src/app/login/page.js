"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Corrected the variable name
  console.log(auth?.currentUser?.email)
  const signIn = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/addmovie");
        alert("Sign in successful");
       
       
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);

      });
  };

  
  return (
    <>
      <div
        className="container my-3 justify-content-center align-items-center mt-5 pt-5 .bg-secondary"
        style={{ color: "white" }}
      >
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form onSubmit={signIn}>
              <div className="justify-content-center mt-5 p-2">
                <h1>Sign In</h1>
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  style={{ backgroundColor: "#8d9199" }}
                  id="title"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  style={{ backgroundColor: "#8d9199" }}
                  id="rating"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary p-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
