"use client";

import { useRouter } from "next/navigation";
import React, {
	Fragment,
	useEffect,
	useState,
} from "react";
import MovieModal from "../../components/movieModal";
import MovieRatingStars from "../../components/movieRatingStars";
import { useAppSelector } from "@/lib/hooks";

export default function MovieDetails({ params }) {
	const router = useRouter();
	// Unwrap the params using React.use
	const unwrappedParams = React.use(params);
	const movieId = unwrappedParams.movies[0];

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;
	const [movieDetails, setMovieDetails] =
		useState(null);
	const [isOpen, setIsOpen] = useState(true);

	const [collections, setCollections] = useState(
		[]
	);

	const [
		selectedCollection,
		setSelectedCollection,
	] = useState("");

	const userLoggedIn = useAppSelector(
		(state) => state.login.session_id
	);

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

		const fetchCollections = async () => {
			const res = await fetch(
				"/api/collections/"
			);
			const data = await res.json();
			console.log(data);

			setCollections(data.data);
		};

		fetchMovieDetails();
		fetchCollections();
	}, [movieId, API_KEY]);

	const handleChange = (event) => {
		setSelectedCollection(event.target.value); // Update selected collection

		console.log(event.target.value);
	};

	const addMovieHandler = async () => {
		try {
			console.log(
				movieDetails,
				selectedCollection
			);

			const res = await fetch(
				"/api/collection_movies_list/",
				{
					method: "POST",
					body: JSON.stringify({
						movie: {
							title: movieDetails.title,
							poster_path:
								movieDetails.poster_path,
							movieId,
						},
						collection: {
							_id: selectedCollection,
						},
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// if (!res.ok) {
			// 	throw new Error(`Error: ${res.status}`);
			// }

			const data = await res.json();
			console.log(
				"Movie added successfully:",
				data
			);

			return data;
		} catch (error) {
			console.error(
				"Failed to add movie:",
				error
			);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		router.back(); // Go back to the previous page (the movie list)
	};

	return (
		<>
			{movieDetails && isOpen && (
				<>
					<MovieModal
						isOpen={isOpen}
						onClose={handleClose}
					>
						<h1>{movieDetails.title}</h1>
						<div className="flex flex-row space-x-20">
							<div>
								<img
									src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
									alt={movieDetails.title}
									className="mb-4"
								/>
							</div>
							<div className="flex flex-col justify-center items-center ">
								<h2>Rate the movie</h2>
								<MovieRatingStars />
							</div>
							<div>
								<h3>Add to your Collection</h3>
								<select
									name=""
									id=""
									value={selectedCollection}
									onChange={handleChange}
								>
									<option value="" disabled>
										Select a collection
									</option>
									{collections.map(
										(el, index) => (
											<Fragment key={index}>
												<option value={el._id}>
													{" "}
													{el.title}{" "}
												</option>
											</Fragment>
										)
									)}
								</select>
								<p>
									<button
										onClick={addMovieHandler}
									>
										Add to Collection
									</button>
								</p>
							</div>
						</div>
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
						<p>
							<strong>Spoken Languages:</strong>{" "}
							{movieDetails.spoken_languages
								.map((lang) => lang.name)
								.join(", ")}
						</p>
						<button
							onClick={handleClose}
							className="mt-4 bg-blue-500 text-white p-2 rounded"
						>
							Close
						</button>
					</MovieModal>
				</>
			)}
		</>
	);
}
