
/// This is feedback style 
import React from 'react';

function Feedback({ setCompletedFeedback, feedback }) {
  const handleGoBack = () => {
    setCompletedFeedback(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center space-y-4">
        {feedback.map((msg, idx) => (
          <div key={idx} className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{msg.feedback}</h3>
            <p className="mt-2 text-gray-700">Rating: {msg.rating}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default Feedback;


