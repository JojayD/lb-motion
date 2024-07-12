const Modal = ({ show, onClose, onConfirm }) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-xl mb-4">Confirm Delete</h2>
				<p className="mb-4">Are you sure you want to delete this conversation permanently?</p>
				<div className="flex justify-end">
					<button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
					<button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
				</div>
			</div>
		</div>
	);
};
