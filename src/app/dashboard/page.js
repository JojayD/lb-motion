"use client";
import React, { useState, useEffect } from "react";
import ClientComponent from "../components/clientcomponent";
import { fetchAccessToken } from "@humeai/voice";
// import Record from "@/components/Record";
function Page() {
	const [accessToken, setAccessToken] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getSession() {
			try {
				const token = await fetchAccessToken({
					apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
					secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
				});

				if (!token) {
					throw new Error("Failed to fetch access token.");
				}

				setAccessToken(token);
			} catch (err) {
				setError(err.message);
			}
		}

		getSession();
	}, []); // The empty array ensures this effect runs only once on mount

	// Conditional rendering based on the state
	if (error) return <p>Error: {error}</p>;
	if (!accessToken) return <p>Loading...</p>;

	return (
		<>
			<ClientComponent accessToken={accessToken} />
			{/* <Record /> */}
		</>
	);
}

export default Page;
