"use client";

import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import { GoogleLoginButton } from "../components/googleLoginButton";

export default function LoginPage() {
	const [showPassword, setShowPassword] =
		useState(true);

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;

	const signInHandler = () => {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + API_KEY,
			},
			body: "{}",
		};

		fetch(
			"https://api.themoviedb.org/3/authentication/guest_session/new",
			options
		)
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="flex flex-row space-x-2 m-8 ">
					<h1 className="font-bold text-2xl ">
						Movie app
					</h1>
					<Image
						src={"/logo.png"}
						width={50}
						height={50}
						alt="Logo picture"
					/>
				</div>

				<div className="flex justify-center items-center h-screen ">
					<div className="border-2 flex-col p-4 rounded shadow-xl h-fit ">
						{/* Header */}
						<div className="space-y-1">
							<h1 className="text-4xl font-medium">
								Sign in
							</h1>
							<p>
								See the most extraordinary movies
							</p>
						</div>
						{/* Inputs */}
						<div className="space-y-4 flex flex-col pt-4">
							<input
								className="border border-1 p-2 rounded"
								type="text"
								placeholder="Email or Phone"
								aria-label="Email or Phone"
							/>
							<div className="flex flex-row-reverse ">
								<input
									className="border border-1 p-2 w-full rounded"
									type={
										showPassword
											? "password"
											: "text"
									}
									placeholder="Password"
									aria-label="Password"
								/>

								<button
									onClick={() => {
										setShowPassword(
											(prev) => !prev
										);
									}}
									className="absolute py-2 pr-2 text-blue-500 font-semibold hover:text-blue-400"
								>
									show
								</button>
							</div>
						</div>

						<button className="flex flex-col text-blue-500 font-semibold hover:text-blue-400 pt-2 pb-4">
							Forgot password?
						</button>
						<div className="flex flex-col justify-center items-center ">
							<button
								className="bg-blue-600 text-white py-2 w-full rounded-3xl hover:bg-blue-400"
								onClick={signInHandler}
							>
								Sign in
							</button>

							<div className="my-2">or</div>

							<GoogleLoginButton>
								<GoogleIcon className="mr-2   " />
								Sign in with Google
							</GoogleLoginButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
