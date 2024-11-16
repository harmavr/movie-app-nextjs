import React, {
	Fragment,
	useEffect,
	useState,
} from "react";
import MoviesOfCollectionContainer from "./moviesOfCollectionContainer";

export default function DisplayCollections() {
	const [collections, setCollections] = useState(
		[]
	);
	const [
		moviesByCollection,
		setMoviesByCollection,
	] = useState({});
	const [expandedRows, setExpandedRows] =
		useState([]);

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const collectionsRes = await fetch(
					"/api/collections/"
				);
				const collectionsData =
					await collectionsRes.json();
				const collections = collectionsData.data;

				if (
					collections &&
					collections.length > 0
				) {
					setCollections(collections);
				}
			} catch (error) {
				console.error(
					"Error fetching collections:",
					error
				);
			}
		};

		fetchCollections();
	}, []);

	const toggleDropdown = async (id) => {
		if (expandedRows.includes(id)) {
			setExpandedRows(
				expandedRows.filter(
					(rowId) => rowId !== id
				)
			);
		} else {
			setExpandedRows([...expandedRows, id]);

			if (!moviesByCollection[id]) {
				try {
					const moviesRes = await fetch(
						`/api/collection_movies_list`
					);
					const moviesData =
						await moviesRes.json();

					const dataArray = moviesData.data;

					const matchingMovies = dataArray.filter(
						(movie) => movie.collection_id === id
					);

					setMoviesByCollection((prev) => ({
						...prev,
						[id]: matchingMovies,
					}));
				} catch (error) {
					console.error(
						"Error fetching movies:",
						error
					);
				}
			}
		}
	};

	return (
		<div className="border-2 bg-gray-50 w-3/4 mx-auto p-6 rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Collections
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
					<thead>
						<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">
								#
							</th>
							<th className="py-3 px-6 text-left">
								Title
							</th>
							<th className="py-3 px-6 text-left">
								Description
							</th>
							<th className="py-3 px-6 text-left"></th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-sm font-light">
						{collections.map((el, index) => (
							<Fragment key={el._id}>
								<tr className="border-b border-gray-200 hover:bg-gray-100">
									<td className="py-3 px-6 text-left whitespace-nowrap">
										<div className="flex items-center">
											<span className="font-medium">
												{index + 1}
											</span>
										</div>
									</td>
									<td className="py-3 px-6 text-left">
										<div className="flex items-center">
											<span className="font-semibold text-blue-600">
												{el.title}
											</span>
										</div>
									</td>
									<td className="py-3 px-6 text-left">
										<span>{el.description}</span>
									</td>
									<td className="py-3 px-6 text-center">
										<button
											onClick={() =>
												toggleDropdown(el._id)
											}
											className="text-blue-500"
										>
											{expandedRows.includes(
												el._id
											)
												? "-"
												: "+"}
										</button>
									</td>
								</tr>
								{expandedRows.includes(
									el._id
								) && (
									<tr className="bg-gray-100">
										<td
											colSpan={4}
											className="py-3 px-6 text-left"
										>
											<div className="p-4 bg-gray-50 border rounded">
												<div className="grid grid-cols-4 gap-4">
													{moviesByCollection[
														el._id
													] ? (
														moviesByCollection[
															el._id
														].length > 0 ? (
															moviesByCollection[
																el._id
															].map(
																(
																	movie,
																	index
																) => (
																	<MoviesOfCollectionContainer
																		index={
																			index + 1
																		}
																		movie={movie}
																		key={
																			movie._id
																		}
																	/>
																)
															)
														) : (
															<p>
																No movies found
																for this
																collection.
															</p>
														)
													) : (
														<p>
															Loading movies...
														</p>
													)}
												</div>
											</div>
										</td>
									</tr>
								)}
							</Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
