import React from "react";

const MovieModal = ({
	isOpen,
	onClose,
	children,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
				{children}
			</div>
		</div>
	);
};

export default MovieModal;
