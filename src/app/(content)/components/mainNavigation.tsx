// components/Navigation.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import UserLoginDropdown from "./userLoginDropdown";
import SecondaryMainNavigation from "./secondaryNavigation";

export default function MainNavigation() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			if (session) {
				setUsername(session.user?.name!);
			}
		};

		checkSession();
	}, []); // Added an empty dependency array to prevent re-rendering

	return (
		<nav className="bg-white shadow-lg sticky p-4 top-0 z-10">
			<div className="flex justify-between items-center px-4 py-2">
				<div className="flex items-center space-x-2">
					<Link
						href="/content-page"
						className="hover:underline flex items-center"
					>
						<Image
							src="/logo.png"
							width={50}
							height={50}
							alt="Logo picture"
						/>
						<h1 className="font-bold text-2xl ml-2">
							{" "}
							Movie App
						</h1>
					</Link>
				</div>
				<div>
					<UserLoginDropdown user={username} />
				</div>
			</div>
			<SecondaryMainNavigation />
		</nav>
	);
}
