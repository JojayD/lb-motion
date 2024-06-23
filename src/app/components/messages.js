"use client";
import React, { useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
const Messages = ({ messageConversation, setMessageConversation}) => {
	const { messages } = useVoice();
	useEffect(() => {
    setMessageConversation(messages);

		console.log("Messages component updated. Messages:", messages);
	}, [messages]);

	return (
		<div className='mt-8 mx-8'>
			<h3 className='text-2xl font-semibold mb-4 text-black text-center'>
				Conversation:
			</h3>
			<div className='space-y-4'>
				{messages.length === 0 && (
					<p className='text-center text-gray-500'>No messages yet.</p>
				)}
				{messages.map((msg, index) => {
					if (msg.type === "user_message" || msg.type === "assistant_message") {
						const isUser = msg.message && msg.message.role === "user";
						return (
							<div
								key={index}
								className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"} mx-2`}
							>
								<div
									className={`max-w-lg w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg shadow-2xl ${
										isUser ? "bg-green-500 text-white" : "bg-blue-500 text-white"
									}`}
								>
									<strong>{isUser ? "You:" : "AI:"}</strong>
									<div className='ml-2'>
										{msg.message ? msg.message.content : "No content"}
									</div>
								</div>
							</div>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Messages;
