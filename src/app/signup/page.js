
///// this is sign up page
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../backend/firebase/firebaseConfig";
import Popup from "@/app/pops/popupmesg"; 

function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up successfully:", userCredential.user.uid);
      setPopupMessage("Signed up successfully");
      setPopupColor("green"); // Set the color for success message
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push("/language");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === 'auth/email-already-in-use') {
        setPopupMessage("User already exists");
        setPopupColor("red"); // Set the color for error message
      } else {
        setPopupMessage("Error signing up");
        setPopupColor("red"); // Set the color for generic error message
      }
      setShowPopup(true);
    }
  };

  const handleSignInNow = () => {
    router.push("/"); 
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center p-4 bg-green-200">
      {/* Registration Form */}
      <div className="mx-8">
      <h1 className="text-5xl font-bold text-black text-center">Lingo AI</h1>
      <img className="h-64" src="globe.png"/>
      </div>
      <div className="flex flex-col items-center gap-6 bg-white p-8 shadow-md rounded-md bg-opacity-80 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-black">Create a New Account</h2>
        <form className="flex flex-col items-center gap-4" onSubmit={handleSignUp}>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Sign Up
          </button>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer"
              onClick={handleSignInNow}
            >
              Sign in now
            </span>
          </p>
        </form>
      </div>
      {showPopup && <Popup message={popupMessage} color={popupColor} onClose={closePopup} />}
    </div>
  );
}

export default SignUpPage;
