"use client";

import React, {
	useEffect,
	useState,
} from "react";
import ArrowCircleUpSharpIcon from "@mui/icons-material/ArrowCircleUpSharp";

export default function ArrowScrollTop() {
	const [showArrow, setShowArrow] =
		useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowArrow(true);
			} else {
				setShowArrow(false);
			}
		};

		window.addEventListener(
			"scroll",
			handleScroll
		);
		return () => {
			window.removeEventListener(
				"scroll",
				handleScroll
			);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div>
			{showArrow && (
				<div
					className="fixed bottom-5 right-5 z-20 cursor-pointer border-2 bg-white rounded "
					onClick={scrollToTop}
				>
					<ArrowCircleUpSharpIcon
						style={{ fontSize: 50 }}
					/>
				</div>
			)}
		</div>
	);
}
