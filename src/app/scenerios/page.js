"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import restaurantPrompts from "../data/restauraunts";
function Scenarios() {
	const [prompts, setPrompts] = useState(restaurantPrompts);
	const [currentIndex, setCurrentIndex] = useState(0); // Use state to handle the index
	// console.log(prompts[1]);
	const handleNext = () => {
		if (currentIndex < prompts.length - 1) {
			console.log(currentIndex, "Clicked");
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			console.log(currentIndex, "Clicked");
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<>
			<div className='flex flex-col mt-6'>
				<div className='flex flex-row'>
					<div className='flex flex-col gap-2 rounded-r-xl rounded-tl-xl bg-slate-100 p-4 text-slate-700 md:max-w-[60%] dark:bg-slate-800 dark:text-slate-300'>
						<span className='font-semibold text-black dark:text-white'>Sharky</span>
						{currentIndex > 0 && <span>Question {currentIndex}</span>}
						<TypeAnimation
							key={currentIndex} // Add key to re-render
							sequence={[prompts[currentIndex]]} // Use state value directly
							wrapper='span'
							cursor={false}
							style={{ fontSize: "1rem", display: "inline-block" }}
						/>
					</div>
					<div className='w-2/6 rounded-md absolute right-0'>
						<img
							src='shark.svg'
							alt='scenarios'
							className='rounded-md'
						/>
					</div>
				</div>
			</div>
			<div className='fixed inset-x-0 bottom-0 flex justify-center gap-4 p-4 dark:bg-slate-800'>
				<button
					onClick={handlePrev}
					className='py-2 px-6 rounded-xl bg-[rgb(39,86,188)] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200'
				>
					Prev
				</button>
				<button
					onClick={handleNext}
					className='py-2 px-6 rounded-xl bg-[rgb(39,86,188)] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200'
				>
					Next
				</button>
			</div>
		</>
	);
}

export default Scenarios;
