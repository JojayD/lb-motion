"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarIn from "../components/NavbarIn";
import { useSession } from "next-auth/react";
import useSessionTimeout from "../hooks/useSessionTimeout";
import languages from "../data/languages";
import flagUrls from "../data/flags";
function LanguageSelection() {
	const [isOpen, setIsOpen] = useState(false);
	const [difficulty, setDifficulty] = useState("");
	const [language, setLanguage] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [flags, setFlags] = useState([]);
	const [step, setStep] = useState(1); // 1 for language selection, 2 for difficulty selection
	const router = useRouter();
	const { data: session, status } = useSession();

	// console.log("Session status:", status);
	// console.log("Session data:", session);

	useSessionTimeout(15 * 60 * 1000); // 15 minutes

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	const handleLanguageSelect = (language) => {
		setLanguage(language);
		localStorage.setItem("selectedLanguage", language);
		console.log(`Selected language: ${language}`);
		setStep(2); // Move to difficulty selection
	};

	const handleDifficultySelect = (difficulty) => {
		setDifficulty(difficulty);
		localStorage.setItem("selectedDifficulty", difficulty);
		console.log(`Selected difficulty: ${difficulty}`);
	};

	const filteredLanguages = languages.filter((lang) =>
		lang.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		const generateFlag = () => {
			const size = Math.random() * 50 + 30;
			const newFlag = {
				id: Math.random().toString(36).substr(2, 9),
				url: `https://hatscripts.github.io/circle-flags/flags/${
					flagUrls[Math.floor(Math.random() * flagUrls.length)]
				}`,
				size: size,
				top: Math.random() * 100 + "vh",
				animationDuration: Math.random() * 20 + 30 + "s",
				animationDelay: Math.random() * 10 + "s",
			};
			setFlags((prevFlags) => [...prevFlags, newFlag]);
		};

		for (let i = 0; i < 10; i++) {
			generateFlag();
		}

		const intervalId = setInterval(generateFlag, 2000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<NavbarIn />
			<div className='flex flex-col h-screen items-center justify-start p-4 mt-52'>
				{step === 1 ? (
					<>
						<h1 className='text-3xl font-bold text-black text-center mb-8 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none'>
							Choose your native language!
						</h1>
						<div className='relative'>
							<button
								className='bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105'
								onClick={() => setIsOpen(!isOpen)}
							>
								Select Language
							</button>

							{isOpen && (
								<div className='absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-md rounded-lg py-2'>
									<input
										type='text'
										placeholder='Search...'
										className='w-full px-4 py-2 border-b focus:outline-none'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
									<div className='max-h-64 overflow-y-auto'>
										<ul>
											{filteredLanguages.map((lang, index) => (
												<li
													key={index}
													className='cursor-pointer px-4 py-2 hover:bg-gray-100 text-black transform transition duration-300 ease-in-out hover:scale-105'
													onClick={() => handleLanguageSelect(lang)}
												>
													{lang}
												</li>
											))}
										</ul>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<div className='w-full max-w-sm mx-auto'>
							<h1 className='text-2xl font-bold text-black text-center bg-white text-gray-800 px-4 py-2 rounded-t-lg shadow-md focus:outline-none'>
								Select Conversation Difficulty
							</h1>
							{language && (
								<div className='text-sm text-gray-800 mb-4 bg-white rounded-b-lg shadow-md px-4 py-2 text-center'>
									Your Native Language: <strong>{language}</strong>
								</div>
							)}
						</div>
						<div className='flex space-x-4 mt-2'>
							<button
								className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105 ${
									difficulty === "easy"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-800"
								}`}
								onClick={() => handleDifficultySelect("easy")}
							>
								Easy
							</button>
							<button
								className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105 ${
									difficulty === "medium"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-800"
								}`}
								onClick={() => handleDifficultySelect("medium")}
							>
								Medium
							</button>
							<button
								className={`px-4 py-2 rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105 ${
									difficulty === "hard"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-800"
								}`}
								onClick={() => handleDifficultySelect("hard")}
							>
								Hard
							</button>
						</div>
						<button
							className='mt-4 px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105'
							onClick={() => setStep(1)}
						>
							Back to Language Selection
						</button>
						<button
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md focus:outline-none transform transition duration-300 ease-in-out hover:scale-105'
							onClick={() => router.push("/dashboard")}
						>
							Proceed
						</button>
					</>
				)}

				{flags.map((flag) => (
					<img
						key={flag.id}
						src={flag.url}
						alt='flag'
						className='absolute top-0 rounded-full animate-float'
						style={{
							width: `${flag.size}px`,
							height: `${flag.size}px`,
							top: flag.top,
							animationDuration: flag.animationDuration,
							zIndex: -1,
						}}
					/>
				))}
			</div>
		</>
	);
}

export default LanguageSelection;
