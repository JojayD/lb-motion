"use client";
import { useState, useEffect } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import Feedback from "./Feedback";
export default function ClientComponent({ accessToken }) {
	const [messageConversation, setMessageConversation] = useState([]);
	const [completedFeedback, setCompletedFeedback] = useState(false);
	const [feedback, setFeedback] = useState([]);

	// This function might be triggered by a button or at the end of a conversation
	const handleStopConversation = async () => {
		// Simulate fetching feedback from a backend or generating it
		const newFeedback = "Detailed feedback based on the entire conversation.";
		setFeedback(newFeedback);
		setCompletedFeedback(true); // Switch view to show feedback
	};

	return (
		<VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
			{!completedFeedback ? (
				// Show messages if feedback is not completed
				<div>
					<Messages
						messages={messageConversation}
						setMessageConversation={setMessageConversation}
						feedback={feedback}
						setFeedback={setFeedback}
					/>
					<Controls
						feedback={feedback}
						messages={messageConversation}
						setFeedback={setFeedback}
						setCompletedFeedback={setCompletedFeedback}
						onStop={handleStopConversation}
					/>
				</div>
			) : (
				// Show feedback if feedback is completed
				<Feedback
					setCompletedFeedback={setCompletedFeedback}
					completedFeedback={completedFeedback}
					feedback={feedback}
				/>
			)}
		</VoiceProvider>
	);
}
