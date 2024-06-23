import React from "react";

const Popup = ({ message, color, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p style={{ color }}>{message}</p>
        <button
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

