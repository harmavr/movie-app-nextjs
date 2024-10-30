import Link from "next/link";
import React from "react";

export default function SecondaryMainNavigation() {
	return (
		<nav className="bg-orange-50 p-2  sticky top-20 -z-10">
			<div className="container mx-auto flex justify-start items-center ">
				<div className="flex items-center space-x-6">
					<Link
						href={""}
						className="text-gray-600 hover:underline  "
					>
						1
					</Link>

					<Link
						href={""}
						className="text-gray-600 hover:underline  "
					>
						2
					</Link>
				</div>
			</div>
		</nav>
	);
}
