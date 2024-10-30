import Image from "next/image";
import React from "react";

export default function ContentPage() {
	return (
		<>
			<div className="relative">
				<Image
					src="/font-background.jpg"
					alt={""}
					width={2000}
					height={100}
				></Image>

				<div className="absolute top-0 text-white text-6xl flex justify-center items-center transform translate-y-1/2 translate-x-1/2 ">
					Welcome <br /> to the most Awesome{" "}
					<br /> Movie Application
				</div>
			</div>
		</>
	);
}
