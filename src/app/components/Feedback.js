import React from 'react';

function Feedback({ setCompletedFeedback, feedback }) {
  const handleGoBack = () => {
    setCompletedFeedback(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const intRating = parseInt(rating, 10); // Ensure the rating is an integer
    for (let i = 0; i < 5; i++) {
      if (i < intRating) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center space-y-4">
        {feedback.map((msg, idx) => (
          <div key={idx} className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{msg.feedback}</h3>
            <div className="mt-2 flex items-center">{renderStars(msg.rating)}</div>
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
