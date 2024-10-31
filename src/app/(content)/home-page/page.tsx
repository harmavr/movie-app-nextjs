import React from "react";
import styles from "./home-page.module.css";

export default function ContentPage() {
	return (
		<div className={styles.homePageContainer}>
			<div className=" fixed top-1/3 text-white text-6xl flex justify-center items-center transform translate-x-1/2">
				Welcome <br /> to the most Awesome <br />{" "}
				Movie Application
			</div>
		</div>
	);
}
