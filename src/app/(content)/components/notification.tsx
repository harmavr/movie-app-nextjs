import NotificationContext from "@/store/notification-context";
import React, { useContext } from "react";

export default function Notification(props) {
	const notificationCtx = useContext(
		NotificationContext
	);

	const { title, message, status } = props;

	return (
		<div
			className={
				status === "pending"
					? "bg-blue-400"
					: status === "success"
					? "bg-green-400"
					: "bg-red-400"
			}
		>
			<div
				className="flex justify-between p-2"
				onClick={notificationCtx.hideNotification}
			>
				<div>{title}</div>
				<div>{message}</div>
			</div>
		</div>
	);
}
