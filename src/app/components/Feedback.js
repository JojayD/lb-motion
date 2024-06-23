import React from 'react';

function Feedback({ setCompletedFeedback,feedback }) {
  const handleGoBack=()=>{
      setCompletedFeedback(false)
  }
  return (
    <>
        <div>
          {feedback.map((msg, idx) => (
          <div className='mt-4 mb-2' key={idx}>
            <h3>{msg.feedback}</h3>
            <p>Rating: {msg.rating}</p>
          </div>
          ))}
      </div>
      <button onClick={handleGoBack}> Go back</button>
    </>

  );
}

export default Feedback;
