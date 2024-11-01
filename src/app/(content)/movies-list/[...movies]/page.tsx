"use client";

import React, {
	useEffect,
	useState,
} from "react";

export default function MovieDetails({
	params,
	isOpen,
	onClose,
}) {
	const movieId = params.movies[1];
	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;
	const [movieDetails, setMovieDetails] =
		useState(null);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: "Bearer " + API_KEY,
				},
			};

			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
					options
				);
				const data = await response.json();
				setMovieDetails(data);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchMovieDetails();
	}, [movieId, API_KEY]);
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-5 rounded shadow-lg">
				<h1>{movieDetails?.title}</h1>
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
					alt={movieDetails?.title}
					className="mb-4"
				/>
				<p>
					<strong>Overview:</strong>{" "}
					{movieDetails?.overview}
				</p>
				<p>
					<strong>Release Date:</strong>{" "}
					{movieDetails?.release_date}
				</p>
				<p>
					<strong>Budget:</strong> $
					{movieDetails?.budget.toLocaleString()}
				</p>
				<p>
					<strong>Revenue:</strong> $
					{movieDetails?.revenue.toLocaleString()}
				</p>
				<p>
					<strong>Vote Average:</strong>{" "}
					{movieDetails?.vote_average}
				</p>
				<p>
					<strong>Vote Count:</strong>{" "}
					{movieDetails?.vote_count}
				</p>
				<p>
					<strong>Spoken Languages:</strong>{" "}
					{movieDetails?.spoken_languages
						.map((lang) => lang.name)
						.join(", ")}
				</p>

				<button
					onClick={onClose}
					className="mt-4 bg-blue-500 text-white p-2 rounded"
				>
					Close
				</button>
			</div>
		</div>
	);
}
