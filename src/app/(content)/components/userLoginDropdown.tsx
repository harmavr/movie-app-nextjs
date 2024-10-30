"use client";

import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { GoogleLogoutButton } from "@/app/(login)/components/googleLogoutButton";

interface UserLoginDropdownProps {
	user: string;
}

const UserLoginDropdown: React.FC<
	UserLoginDropdownProps
> = ({ user }) => {
	const [isOpenDropdown, setIsOpenDropdown] =
		useState(false);

	const handleDropdown = () => {
		setIsOpenDropdown(!isOpenDropdown);
	};

	return (
		<div className="relative flex items-center space-x-2">
			<div className="font-semibold">{user}</div>
			<div className="relative">
				<button
					onClick={handleDropdown}
					className="flex items-center"
				>
					<ManageAccountsIcon />
				</button>
				{isOpenDropdown && (
					<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded p-2 z-20">
						<p className="cursor-pointer hover:bg-gray-100 p-2 rounded">
							Settings
						</p>
						<p className="cursor-pointer hover:bg-gray-100 p-2 rounded">
							User Details
						</p>
						<div className="cursor-pointer hover:bg-gray-100 p-2 rounded">
							<GoogleLogoutButton>
								Logout
							</GoogleLogoutButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserLoginDropdown;
