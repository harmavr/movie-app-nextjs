import React, { useRef, useState } from "react";

export default function CreateCollection() {
	const titleRef =
		useRef<HTMLInputElement | null>(null);
	const descriptionRef =
		useRef<HTMLInputElement | null>(null);
	const [errors, setErrors] = useState<
		null | string
	>(null);
	const [collectionTitle, setCollectionTitle] =
		useState<string | null>(null);

	const saveCollectionHandler = () => {
		const title = titleRef.current?.value || "";
		const description =
			descriptionRef.current?.value || "";

		console.log(
			"title:",
			title,
			"description:",
			description
		);

		if (title !== "" && description !== "") {
			fetch("/api/collection/", {
				method: "POST",
				body: JSON.stringify({
					collection: { title, description },
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					setCollectionTitle(data.message);
					setErrors(null);
					setTimeout(
						() => setCollectionTitle(null),
						3000
					);
				})
				.catch((error) => {
					console.error("Error:", error);
					setErrors(
						"Failed to save collection. Please try again."
					);
				});
		} else {
			setErrors("Empty Data");
			setCollectionTitle(null);
		}
	};

	const displayCollectionHandler = () => {
		fetch("/api/collection/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res.data));
	};

	return (
		<div className="border-2 bg-gray-50 w-1/2 flex items-center flex-col space-y-4">
			<h1 className="text-3xl">
				Save your Favorite Movies
			</h1>
			<h3 className="text-xl">
				Create your own Collection
			</h3>
			<div className="grid grid-2 gap-4 pb-4">
				<form
					className="flex w-full pb-4 space-x-5"
					action=""
				>
					<div className="flex flex-col">
						<label htmlFor="title">
							Give a name for your Collection
						</label>
						<input
							className="border-2 p-1"
							type="text"
							id="title"
							name="title"
							placeholder="Title"
							ref={titleRef}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description">
							Give a description for your
							Collection
						</label>
						<input
							className="border-2 p-1"
							type="text"
							id="description"
							name="description"
							placeholder="Description"
							ref={descriptionRef}
						/>
					</div>
				</form>

				{errors && (
					<p className="text-red-500">{errors}</p>
				)}

				{collectionTitle && (
					<p className="text-green-500">
						{collectionTitle}
					</p>
				)}

				<div>
					<button
						className="bg-gray-400 p-2 rounded-xl hover:bg-gray-300"
						onClick={saveCollectionHandler}
					>
						Save
					</button>
				</div>

				{/* <button
					onClick={displayCollectionHandler}
				>
					Show Collection
				</button> */}
			</div>
		</div>
	);
}
