"use client";
import React from "react";
import { useRouter } from "next/navigation";
function Page() {
	const router = useRouter();

	return (
		<>
			<div>Welcome to the page</div>
			<button
				className={`border-2`}
				onClick={() => {
					router.push("dashboard");
				}}
			>
				Dashboard
			</button>
		</>
	);
}

export default Page;