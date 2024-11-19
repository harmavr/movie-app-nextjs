"use client";

import React, { useState } from "react";

import styles from "./collections.module.css";
import DisplayCollections from "../components/displayCollections";
import CreateCollection from "../components/createCollection";
import { NotificationContextProvider } from "@/store/notification-context";

export default function Collections() {
	const [tab, setTab] = useState(0);

	return (
		<NotificationContextProvider>
			<div
				className={`${styles.collectionsContainer} pt-10`}
			>
				<div className="text-white text-3xl flex justify-center items-center space-x-10 top-10">
					<button
						className="hover:underline"
						onClick={() => setTab(1)}
					>
						Your Collections
					</button>
					<button
						className="hover:underline"
						onClick={() => setTab(2)}
					>
						New Collection
					</button>
				</div>
				<div className="pt-10">
					{tab === 1 ? (
						<div className=" flex justify-center items-center ">
							<DisplayCollections />
						</div>
					) : (
						<div className=" flex justify-center items-center ">
							<CreateCollection />
						</div>
					)}
				</div>
			</div>
		</NotificationContextProvider>
	);
}
