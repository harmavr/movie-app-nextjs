"use client";

import { useRouter } from "next/navigation";
import React, {
	useEffect,
	useState,
} from "react";
import MovieModal from "../../components/movieModal";

export default function MovieDetails({ params }) {
	const router = useRouter();
	// Unwrap the params using React.use
	const unwrappedParams = React.use(params);
	const movieId = unwrappedParams.movies[0]; // Access the movieId from the unwrapped params

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;
	const [movieDetails, setMovieDetails] =
		useState(null);
	const [isOpen, setIsOpen] = useState(true);

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
			} catch (err) {
				console.error(err);
			}
		};

		fetchMovieDetails();
	}, [movieId, API_KEY]);

	const handleClose = () => {
		setIsOpen(false);
		router.back(); // Go back to the previous page (the movie list)
	};

	return (
		<>
			{movieDetails && isOpen && (
				<MovieModal
					isOpen={isOpen}
					onClose={handleClose}
				>
					<h1>{movieDetails.title}</h1>
					<img
						src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
						alt={movieDetails.title}
						className="mb-4"
					/>
					<p>
						<strong>Overview:</strong>{" "}
						{movieDetails.overview}
					</p>
					<p>
						<strong>Release Date:</strong>{" "}
						{movieDetails.release_date}
					</p>
					<p>
						<strong>Budget:</strong> $
						{movieDetails.budget?.toLocaleString()}
					</p>
					<p>
						<strong>Revenue:</strong> $
						{movieDetails.revenue?.toLocaleString()}
					</p>
					<p>
						<strong>Vote Average:</strong>{" "}
						{movieDetails.vote_average}
					</p>
					<p>
						<strong>Vote Count:</strong>{" "}
						{movieDetails.vote_count}
					</p>
					{/* <p>
						<strong>Spoken Languages:</strong>{" "}
						{movieDetails.spoken_languages
							.map((lang) => lang.name)
							.join(", ")}
					</p> */}
					<button
						onClick={handleClose}
						className="mt-4 bg-blue-500 text-white p-2 rounded"
					>
						Close
					</button>
				</MovieModal>
			)}
		</>
	);
}
