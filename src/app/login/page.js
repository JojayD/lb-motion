"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebaseConfig";
import Popup from "@/app/pops/popupmesg";
import Navbar from "@/app/components/Navbar";
import {
	auth,
	signInWithEmailAndPassword,
} from "../../../backend/firebase/firebaseConfig";
import { updateLogin } from "../utils/dbUtils";

function SignInPage() {
	const router = useRouter();
	const { data: session } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [popupMessage, setPopupMessage] = useState("");
	const [popupColor, setPopupColor] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleSignUpNow = () => {
		router.push("/signup");
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				console.error("Error signing in:", result.error);
				setPopupMessage("Username or password wrong");
				setPopupColor("red");
				setShowPopup(true);
			} else {
				setPopupMessage("Signed in successfully");
				setPopupColor("green");
				setShowPopup(true);
				setTimeout(() => {
					setShowPopup(false);
					router.push("/language");
				}, 500);
			}
		} catch (error) {
			console.error("Error signing in:", error);
			setPopupMessage("An unexpected error occurred");
			setPopupColor("red");
			setShowPopup(true);
		}

    updateLogin(email)
	};

	const handleGoogleSignIn = async () => {
		try {
			const result = await signIn("google", { redirect: false });
			if (result?.error) {
				setPopupMessage("Failed to sign in with Google");
				setPopupColor("red");
				setShowPopup(true);
			} else {
				setPopupMessage("Signed in with Google successfully");
				setPopupColor("green");
				setShowPopup(true);
				setTimeout(() => {
					setShowPopup(false);
					router.push("/language");
				}, 500);
			}
		} catch (error) {
			console.error("Error signing in with Google:", error);
			setPopupMessage("Failed to sign in with Google");
			setPopupColor("red");
			setShowPopup(true);
		}

    

	};

	const closePopup = () => {
		setShowPopup(false);
	};

	// If the user is already authenticated, redirect to the language page
	React.useEffect(() => {
		if (session) {
			router.push("/language");
		}
	}, [session]);

	return (
		<div>
			<Navbar />
			<div className='flex flex-col md:flex-row h-screen items-center justify-center p-4 bg-green-200 pt-60 md:pt-16'>
				<div className='mx-8'>
					<h1 className='text-5xl font-bold text-black text-center opacity-0 animate-slideInLeft'>
						Lingo AI
					</h1>
					<img
						className='h-64 animate-dropInBounce fill-white'
						src='globe.png'
						alt='Globe'
					/>
				</div>
				<div className='flex flex-col items-center gap-6 bg-white p-8 shadow-md rounded-md bg-opacity-80 backdrop-blur-md'>
					<h2 className='text-2xl font-bold text-black'>Welcome back</h2>
					<form
						className='flex flex-col items-center gap-4'
						onSubmit={handleSignIn}
					>
						<input
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
						/>
						<button
							type='submit'
							className='w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700'
						>
							Sign in
						</button>
						<button
							type='button'
							className='w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 mt-4'
							onClick={handleGoogleSignIn}
						>
							Sign in with Google
						</button>
						<p className='mt-4 text-gray-600'>
							Don't have an account?{" "}
							<span
								className='text-teal-600 cursor-pointer'
								onClick={handleSignUpNow}
							>
								Sign up now
							</span>
						</p>
					</form>
				</div>
				{showPopup && (
					<Popup
						message={popupMessage}
						color={popupColor}
						onClose={closePopup}
					/>
				)}
			</div>
		</div>
	);
}

export default SignInPage;
