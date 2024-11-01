"use client";

import React, {
	useEffect,
	useState,
} from "react";
import styles from "./movies-list.module.css";
import Pagination from "../components/pagination";
import Link from "next/link";

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

	const [searchErrors, setSearchErrors] =
		useState("");

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;

	const searchedMovieSpecsHandler = (
		inputMovie: string
	) => {
		if (
			inputMovie.length >= 3 &&
			/^[A-Za-z]+$/.test(inputMovie)
		) {
			setSearchErrors("");

			return true;
		} else {
			setSearchErrors("Invalid input");
			setMoviesFound([]);
			return false;
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	async function searchMovieHandler(
		inputMovie: string,
		currentPage: number
	) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + API_KEY,
			},
		};

		const validInput =
			searchedMovieSpecsHandler(inputMovie);
		if (validInput) {
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
	}

	return (
		<>
			<div
				className={`${styles.moviesListPageContainer} flex flex-col space-y-10 p-4 pb-16 `}
			>
				<div className="flex justify-center pt-10  space-x-4">
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
							searchMovieHandler(
								searchedMovie,
								currentPage
							)
						}
					>
						Search
					</button>
				</div>
				<div className="flex justify-center ">
					<div className="grid grid-cols-4 gap-4 ">
						{moviesFound.length > 0 &&
							moviesFound.map((el, index) => (
								<div key={index}>
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
											{el.vote_average}{" "}
										</p>
										<Link
											href={`movies-list/movies/${el.id}`}
											className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Read more
										</Link>
									</div>
								</div>
							))}
					</div>
					{searchErrors.length > 0 && (
						<div className="text-red-600 text-2xl justify-center items-center flex">
							{searchErrors}{" "}
						</div>
					)}

					{moviesFound.length === 0 &&
						searchErrors.length < 1 && (
							<div className="pr-10">
								{" "}
								<h2 className="text-4xl text-white">
									No Movies Found
								</h2>
							</div>
						)}
				</div>

				{totalPages > 1 && (
					<div className="flex justify-center items-center pt-4 space-x-4">
						<Pagination
							totalPages={totalPages}
							searchMovieHandler={
								searchMovieHandler
							}
							searchedMovie={searchedMovie}
							currentPage={currentPage}
						/>
					</div>
				)}
			</div>
		</>
	);
}
