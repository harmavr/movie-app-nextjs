import React, {
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Notification from "./notification";
import NotificationContext from "@/store/notification-context";

export default function CreateCollection() {
	const titleRef =
		useRef<HTMLInputElement | null>(null);
	const descriptionRef =
		useRef<HTMLInputElement | null>(null);

	const notificationCtx = useContext(
		NotificationContext
	);

	const saveCollectionHandler = () => {
		const title = titleRef.current?.value || "";
		const description =
			descriptionRef.current?.value || "";

		if (title !== "" && description !== "") {
			notificationCtx.showNotification({
				title: "Saving...",
				message: "Saving your collection.",
				status: "pending",
			});

			fetch("/api/collection/", {
				method: "POST",
				body: JSON.stringify({
					collection: { title, description },
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(
							"Failed to save collection."
						);
					}
					return res.json();
				})
				.then((data) => {
					console.log(data);

					notificationCtx.showNotification({
						title: "Success!",
						message:
							"Your collection has been saved.",
						status: "success",
					});
				})
				.catch((error) => {
					console.error("Error:", error);

					notificationCtx.showNotification({
						title: "Error",
						message:
							"Failed to save collection. Please try again.",
						status: "error",
					});
				});
		} else {
			notificationCtx.showNotification({
				title: "Validation Error",
				message:
					"Title and description cannot be empty.",
				status: "error",
			});
		}
	};

	useEffect(() => {
		if (notificationCtx.notification) {
			console.log(
				"Notification:",
				notificationCtx.notification
			);
		}
	}, [notificationCtx.notification]);

	return (
		<div className="border-2 bg-gray-50 w-1/2 flex items-center flex-col space-y-4">
			<h1 className="text-3xl">
				Save your Favorite Movies
			</h1>
			<h3 className="text-xl">
				Create your own Collection
			</h3>
			<div className="grid grid-2 gap-4 pb-4">
				<form className="flex w-full pb-4 space-x-5">
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

				<div>
					<button
						className="bg-gray-400 p-2 rounded-xl hover:bg-gray-300"
						onClick={saveCollectionHandler}
					>
						Save
					</button>
				</div>

				{notificationCtx.notification && (
					<Notification
						title={
							notificationCtx.notification.title
						}
						message={
							notificationCtx.notification.message
						}
						status={
							notificationCtx.notification.status
						}
					/>
				)}
			</div>
		</div>
	);
}
