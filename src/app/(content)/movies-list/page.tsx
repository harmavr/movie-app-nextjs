"use client";

import React, { useState } from "react";
import styles from "./movies-list.module.css";
import Pagination from "../components/pagination";

export default function MoviesList() {
	const [searchedMovie, setSearchedMovie] =
		useState("");

	const [moviesFound, setMoviesFound] = useState(
		[]
	);

	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] =
		useState(1);
	const [totalResults, setTotalResults] =
		useState(1);

	const API_KEY = process.env.MOVIE_API_KEY;

	async function searchMovieHandler(
		inputMovie: string
	) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
		};

		fetch(
			`https://api.themoviedb.org/3/search/movie?query=${inputMovie}&include_adult=false&language=en-US&page=${currentPage}`,
			options
		)
			.then((res) => res.json())
			.then((res) => {
				setMoviesFound(res.results);
				setTotalPages(res.total_pages);
				setTotalResults(res.total_results);
			})
			.catch((err) => console.error(err));
	}

	return (
		<>
			<div
				className={`${styles.moviesListPageContainer} pb-4`}
			>
				<div className="flex justify-center items-center h-1/2 space-x-4">
					<input
						type="text"
						className="w-1/2 p-4"
						placeholder="Search for a movie"
						onChange={(e) =>
							setSearchedMovie(e.target.value)
						}
					/>
					<button
						className="bg-blue-200 p-4 rounded hover:bg-blue-400 font-semibold"
						onClick={() =>
							searchMovieHandler(searchedMovie)
						}
					>
						Search
					</button>
				</div>

				<div className="flex justify-center ">
					<div className="grid grid-cols-4 gap-4 ">
						{moviesFound.map((el) => (
							<div key={el.id}>
								<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										{el.title}
									</h5>

									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
										<img
											src={`https://image.tmdb.org/t/p/w200${el.poster_path}`}
										/>
									</p>
									<p className="mb-3 font-normal text-green-700 ">
										{el.vote_average} {totalPages}{" "}
										{totalResults}
									</p>
									<button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Read more
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
				{totalPages > 1 && (
					<div className="flex justify-center items-center pt-4 space-x-4">
						<Pagination
							totalPages={totalPages}
							currentPage={currentPage}
						/>
					</div>
				)}
			</div>
		</>
	);
}
