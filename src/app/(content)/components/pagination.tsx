import React from "react";

interface PaginationValues {
	totalPages: number;
	searchMovieHandler: (
		searchedMovie: string,
		page: number
	) => void;
	searchedMovie: string;
	currentPage: number;
}

export default function Pagination({
	totalPages,
	searchMovieHandler,
	searchedMovie,
	currentPage,
}: PaginationValues) {
	const pages = [];

	const changeCurrentPageHandler = (
		page: number
	) => {
		searchMovieHandler(searchedMovie, page);
	};

	for (
		let index = 1;
		index <= totalPages;
		index++
	) {
		pages.push(index);
	}

	return (
		<div className="space-x-3">
			{pages.map((page, id) => (
				<button
					key={id}
					className={` p-4 rounded-md hover:bg-blue-200 ${
						currentPage === id
							? "bg-blue-900"
							: "bg-blue-400"
					}`}
					onClick={() =>
						changeCurrentPageHandler(id + 1)
					}
				>
					{page}
				</button>
			))}
		</div>
	);
}
