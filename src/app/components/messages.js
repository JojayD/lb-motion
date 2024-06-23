"use client";
import React, { useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
import Feedback from "./Feedback";
const Messages = ({
	messageConversation,
	setMessageConversation,
}) => {
	const { messages } = useVoice();
	useEffect(() => {
		setMessageConversation(messages);
		console.log("Messages component updated. Messages:", messages);
	}, [messages]);

	return (
		<div className='mt-8 mx-8'>
			<h3 className='text-3xl font-semibold mb-4 text-black text-center'>
				Conversation:
			</h3>
			<div className='space-y-4'>
				{messages.length === 0 && (
					<p className='text-center text-gray-500'>
						No messages yet.
						<br />
						Select 'Start Session' to chat.
					</p>
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
									className={`max-w-lg w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg shadow-2xl animate-fade ${
										isUser ? "bg-green-500 text-white" : "bg-blue-500 text-white"
									}`}
								>
									<strong>{isUser ? "You:" : "AI:"}</strong>
									<div className='ml-2'>
										{msg.message ? msg.message.content : "No content"}
									</div>
									{isUser &&
										msg.models &&
										msg.models.prosody &&
										msg.models.prosody.scores &&
										msg.models.prosody.scores.Awkwardness && (
											<>
												<div className='mt-2'>
													Awkwardness: {msg.models.prosody.scores.Awkwardness.toFixed(2)}
												</div>
												<div>
													Contentment: {msg.models.prosody.scores.Contentment.toFixed(2)}
												</div>
											</>
										)}
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
