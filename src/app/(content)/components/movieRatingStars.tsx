import React, {
	useEffect,
	useState,
} from "react";
import styles from "@/app/(content)/styles/movieModal.module.css";
import {
	useAppDispatch,
	useAppSelector,
} from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { userActionsAction } from "@/lib/features/userActionsSlice";

export default function MovieRatingStars() {
	const dispatch = useAppDispatch();
	const [movieRateId, setMovieRateId] = useState<
		number | null
	>(null);

	const sessionId = useAppSelector(
		(state) => state.login.session_id
	);
	const moviesTable = useAppSelector(
		(state) => state.userAction.movie
	);
	const pathname = usePathname();
	const movieId = pathname.split("/").pop();

	useEffect(() => {
		const movieIndex = moviesTable.findIndex(
			(movie) => movie.movie_id === movieId
		);

		if (movieIndex !== -1) {
			setMovieRateId(
				parseInt(moviesTable[movieIndex].rate)
			);
		}
	}, [movieId, moviesTable]);

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;

	const postRateHandler = async (
		rating: number
	) => {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type":
					"application/json;charset=utf-8",
				Authorization: "Bearer " + API_KEY,
			},
			body: JSON.stringify({ value: rating }),
		};

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`,
				options
			);
			const result = await response.json();

			if (result.success) {
				dispatch(
					userActionsAction.postRate({
						id: movieId,
						rating: rating,
					})
				);
				setMovieRateId(rating);
			} else {
				console.error("Rating was unsuccessful.");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const stars = [5, 4, 3, 2, 1];
	return (
		<div className={`${styles.rate}`}>
			{stars.map((star) => (
				<React.Fragment key={star}>
					<input
						type="radio"
						id={`star${star}`}
						name="rate"
						value={star}
						checked={movieRateId === star} // Check if this star is the current rating
						onChange={() => postRateHandler(star)}
					/>
					<label
						htmlFor={`star${star}`}
						title={`${star} stars`}
					>
						{star} {star === 1 ? "star" : "stars"}
					</label>
				</React.Fragment>
			))}
		</div>
	);
}
