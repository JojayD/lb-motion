"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
	auth,
	createUserWithEmailAndPassword,
} from "../../../backend/firebase/firebaseConfig";
import Popup from "@/app/pops/popupmesg";
import Navbar from "../components/Navbar";
import { updateLogin } from "../utils/dbUtils";
// import
function SignUpPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [popupMessage, setPopupMessage] = useState("");
	const [popupColor, setPopupColor] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleSignInNow = () => {
		router.push("/login");
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPopupMessage("Passwords do not match");
			setPopupColor("red");
			setShowPopup(true);
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("Signed up successfully");

			// Sign in the user after successful sign-up
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				console.error("Error signing in after sign-up:", result.error);
				setPopupMessage("Sign up succeeded but sign in failed");
				setPopupColor("red");
				setShowPopup(true);
			} else {
				setPopupMessage("Signed up successfully");
				setPopupColor("green");
				setShowPopup(true);
				setTimeout(() => {
					setShowPopup(false);
					router.push("/language");
				}, 500);
			}
			updateLogin(email);
		} catch (error) {
			console.error("Error signing up:", error);
			setPopupMessage("Error signing up");
			setPopupColor("red");
			setShowPopup(true);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			await signIn("google", { callbackUrl: "/language" });
			// The result handling will be done in the callback route
		} catch (error) {
			console.error("Error initiating Google Sign-In:", error);
			setPopupMessage("Failed to initiate sign up with Google");
			setPopupColor("red");
			setShowPopup(true);
		}
	};

	const closePopup = () => {
		setShowPopup(false);
	};

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
					<h2 className='text-2xl font-bold text-black'>Create an account</h2>
					<form
						className='flex flex-col items-center gap-4'
						onSubmit={handleSignUp}
					>
						<input
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
							autocomplete="email"
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
							autocomplete="new-password"
						/>
						<input
							type='password'
							placeholder='Confirm Password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='w-72 p-3 bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500'
							autocomplete="new-password"
						/>
						<button
							type='submit'
							className='w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700'
						>
							Sign up
						</button>
						<button
							type='button'
							className='w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 mt-4'
							onClick={handleGoogleSignUp}
						>
							Sign up with Google
						</button>
						<p className='mt-4 text-gray-600'>
							Already have an account?{" "}
							<span
								className='text-teal-600 cursor-pointer'
								onClick={handleSignInNow}
							>
								Sign in
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

export default SignUpPage;
