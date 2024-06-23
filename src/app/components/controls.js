"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import axios from "axios";

const sendMessagesToBackend = (messages) => {
	console.log("Sending messages to backend:", messages);
	axios
		.post("http://127.0.0.1:5000/receive_text", {
			messages: messages
				.filter((_, index) => index !== 0 && index !== 1)
				.map((msg) => ({
					role: msg.message.role,
					content: msg.message.content,
				})),
			// "messages": messages,
		})
		.then((response) => {
			console.log("Messages sent successfully:", response.data);
		})
		.catch((error) => {
			console.error("Error sending messages:", error);
		});
};

export default function Controls({ messages, onStop }) {
	const { connect, disconnect, readyState } = useVoice();

	const handleStopConversation = () => {
		sendMessagesToBackend(messages);
		console.log("Stopping conversation. Sending messages:", messages);
		disconnect();
		onStop();
	};

	if (readyState === VoiceReadyState.OPEN) {
		return (
			<div className='fixed bottom-4 right-4'>
				<button
					onClick={handleStopConversation}
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
