import React from "react";

export default function Pagination({
	totalPages,
	currentPage,
}) {
	const pages = [];

	const changeCurrentPageHandler = () => {};

	for (
		let index = 1;
		index <= totalPages;
		index++
	) {
		pages.push(index);
	}

	return (
		<div>
			{pages.map((el) => (
				<button
					key={el.id}
					className="bg-blue-400 p-4"
					onClick={changeCurrentPageHandler}
				>
					{" "}
					{el}
				</button>
			))}
		</div>
	);
}
