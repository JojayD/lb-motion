"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebaseConfig";
export async function handleStopConversation(
	messages,
	messageScores,
	setFeedback,
	setCompletedFeedback,
	disconnect,
	setIsLoading,
	setMessageConversation, // Add setMessageConversation to clear messages
	session
) {
	// const apiUrl = process.env.NEXT_PUBLIC_API_URL
	setIsLoading(true); // Start loading spinner
	disconnect(); // Disconnect immediately
	setMessageConversation([]); // Clear message conversation

	console.log("Sending messages to backend:", messages);
	try {
		const selectedLanguage =
			localStorage.getItem("selectedLanguage") || "defaultLanguage"; // Providing a fallback directly here
		const filteredMessages = messages.map(({ message }, index) => ({
			role: message?.role || "assistant",
			content: message?.content,
			id: `user_message_${index}`,
		}));

		// Include the top two scores
		const topScores = [];
		messages.forEach((msg, index) => {
			const messageId = `user_message_${index}`;
			if (messageScores && messageScores[messageId]) {
				// Check if messageScores and messageScores[messageId] exist
				topScores.push({ messageId, scores: messageScores[messageId] });
			}
		});
		console.log("Top scores to be sent:", topScores); // Added log

		const response = await axios.post("http://127.0.0.1:8000/receive_text", {
			messages: filteredMessages,
			language: selectedLanguage,
			topScores,
		});
		// const response = await axios.post(
		// 	`https://backend-young-haze-7759.fly.dev/receive_text`,
		// 	{
		// 		messages: filteredMessages,
		// 		language: selectedLanguage,
		// 		topScores,
		// 	}
		// );
		//

		https: setFeedback(response.data.feedback);
		setCompletedFeedback(true); // Set completed feedback to true after feedback is set
		setIsLoading(false); // Stop loading spinner
		const conversationId = `conversation${Date.now()}`;
		console.log("HANDLE STOP CONVERSATION SETTING DOC");
		try {
			console.log(session.user.email); // Log to confirm the email is correct
			const userDocRef = doc(db, "users", session.user.email);
			const conversationDocRef = doc(userDocRef, "conversations", conversationId);

			try {
				await setDoc(
					conversationDocRef,
					{
						messages: messages,
						feedback: response.data.feedback,
					},
					{ merge: true }
				); // Using merge: true to update the document or create it if it doesn't exist
				console.log("Document written/updated with ID: ", conversationId);
			} catch (e) {
				console.error("Error adding/updating document: ", e);
			}
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.error("An error occurred:", error);
		setIsLoading(false); // Stop loading spinner in case of error
	}

	console.log(localStorage.getItem("selectedLanguage"));
	console.log("Stopping conversation. Sending messages:", messages);
	localStorage.removeItem("selectedLanguage");
}

export default function Controls({
	messages,
	messageScores,
	setFeedback,
	setCompletedFeedback,
	setIsLoading,
	setMessageConversation, // Add setMessageConversation
	feedback,
	session,
}) {
	const { connect, disconnect, readyState } = useVoice();
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		console.log("Feedback updated:", feedback);
	}, [feedback]);

	const handleEndConversation = () => {
		if (isProcessing) return;
		setIsProcessing(true);
		handleStopConversation(
			messages,
			messageScores,
			setFeedback,
			setCompletedFeedback, // Pass setCompletedFeedback
			disconnect,
			setIsLoading, // Pass setIsLoading
			setMessageConversation, // Pass setMessageConversation
			session
		);
		setIsProcessing(false);
	};

	if (readyState === VoiceReadyState.OPEN) {
		return (
			<div className='fixed bottom-4 right-4'>
				<button
					onClick={handleEndConversation}
					className='cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-red-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-red-300 shadow-red-300 active:shadow-none'
				>
					End Session
				</button>
			</div>
		);
	}

	return (
		<div className='fixed bottom-4 right-4'>
			<button
				onClick={() => {
					connect()
						.then(() => {
							console.log("connected!");
							/* handle success */
						})
						.catch((e) => {
							console.log("disconnected");
							console.log(e);
							/* handle error */
						});
				}}
				className='cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none'
			>
				Start Session
			</button>
		</div>
	);
}
