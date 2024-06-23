import React from 'react'

function Feedback({ feedback }) {
  return (
    <div>{feedback.map((msg, idx)=>{
      return (
							<div
								className='mt-4 mb-2'
								key={idx}
							>
								<h3>{msg.feedback}</h3>
							</div>
						);
    })}</div>
  )
}

export default Feedback;