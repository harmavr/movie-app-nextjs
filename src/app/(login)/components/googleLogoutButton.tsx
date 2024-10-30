"use client";

import React, { FC, ReactNode } from "react";
import { signOut } from "next-auth/react";

interface GoogleSignOutButtonProps {
	children: ReactNode;
}

export const GoogleLogoutButton: FC<
	GoogleSignOutButtonProps
> = ({ children }) => {
	const logoutWithGoogle = () => {
		signOut({
			callbackUrl:
				"http://localhost:3000/login-page/",
		});
	};

	return (
		<button
			className="border-2 bg-red-900 text-white p-2 rounded-lg hover:bg-red-700"
			onClick={logoutWithGoogle}
		>
			{children}
		</button>
	);
};
