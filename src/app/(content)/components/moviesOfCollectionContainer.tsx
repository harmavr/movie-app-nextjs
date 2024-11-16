"use client";

import Link from "next/link";
import React, { useEffect } from "react";

export default function MoviesOfCollectionContainer({
	movie,
	index,
}) {
	useEffect(() => {
		console.log(movie);
	}, [movie]);

	const removeMovieFromCollectionHandler = (
		id
	) => {
		fetch(`/api/collection_movies_list`, {
			method: "DELETE",
			body: JSON.stringify({
				movie: {
					id,
				},
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<>
			<div className="flex flex-col">
				#{index}
				<h2 className="text-xl">{movie.title}</h2>
				<div className="flex flex-row space-x-5">
					<div className="relative group max-w-48">
						<img
							src={`https://image.tmdb.org/t/p/w200${movie.image}`}
							alt={movie.title}
							className="w-full h-auto object-cover transition duration-300 group-hover:blur-sm"
						/>

						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<button
								onClick={() =>
									removeMovieFromCollectionHandler(
										movie._id
									)
								}
								className="bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-400"
							>
								X
							</button>

							<Link
								href={`/movies-list/${movie._id}`}
								className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-400"
							>
								Read more
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
