"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import restaurantPrompts from "../data/restauraunts";
function Scenerios() {
	const [prompts, setPrompts] = useState(restaurantPrompts);
	const [promptIndex, setPromptIndex] = useState(0);

	const handleNext = () => {
		console.log("next");
		if (promptIndex < prompts.length - 1) {
			setPromptIndex(promptIndex + 1);
		}
	};

	const handlePrev = () => {
		console.log("prev");
		if (promptIndex > 0) {
			setPromptIndex(promptIndex - 1);
		}
	};

	return (
		<>
			<div className='flex flex-col mt-6'>
				<div className='flex flex-row'>
					<div class='flex flex-col gap-2 rounded-r-xl rounded-tl-xl bg-slate-100 p-4 text-slate-700 md:max-w-[60%] dark:bg-slate-800 dark:text-slate-300'>
						<span class='font-semibold text-black dark:text-white'>Sharky</span>
						<TypeAnimation
							sequence={[`${prompts[promptIndex]}`]}
							wrapper='span'
							cursor={false}
							style={{ fontSize: "1rem", display: "inline-block" }}
						/>
					</div>
					<div className='w-2/6 rounded-md translate absolute right-0'>
						<img
							src='shark.svg'
							alt='scenarios'
							className='rounded-md'
						/>
					</div>
				</div>
			</div>
			<div className='fixed inset-x-0 bottom-0 flex justify-center gap-4 p-4  dark:bg-slate-800'>
				<div>
					<button
						onClick={handlePrev}
						className='py-2 px-6 rounded-xl bg-[rgb(39,86,188)] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200'
					>
						Prev
					</button>
				</div>
				<div>
					<button onClick={handleNext}className='py-2 px-6 rounded-xl bg-[rgb(39,86,188)] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200'>
						Next
					</button>
				</div>
			</div>
		</>
	);
}

export default Scenerios;
