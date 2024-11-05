"use client";

import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import { GoogleLoginButton } from "../components/googleLoginButton";
import {
	useAppDispatch,
	useAppSelector,
} from "@/lib/hooks";
import { loginAction } from "@/lib/features/loginSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();

	const [showPassword, setShowPassword] =
		useState(true);

	const [loginError, setLoginError] =
		useState("");

	const [userCredentials, setUserCredentials] =
		useState({
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			phone: null,
		});

	const userEmail = useAppSelector(
		(state) => state.user.email
	);
	const userPassword = useAppSelector(
		(state) => state.user.password
	);
	const userPhone = useAppSelector(
		(state) => state.user.phone
	);

	const API_KEY =
		process.env.NEXT_PUBLIC_MOVIE_API_KEY;

	const dispatch = useAppDispatch();

	const handleInputChange = (
		field: string,
		value: string | number
	) => {
		setUserCredentials((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const checkUserCredentials = () => {
		console.log(userPhone, userCredentials.phone);

		console.log(
			(userEmail === userCredentials.email ||
				userPhone ===
					parseInt(userCredentials.phone)) &&
				userPassword === userCredentials.password
		);

		if (
			(userEmail === userCredentials.email ||
				userPhone === userCredentials.phone) &&
			userPassword === userCredentials.password
		) {
			return true;
		} else return false;
	};

	const signInHandler = () => {
		const validUserData = checkUserCredentials();

		if (validUserData) {
			setLoginError("");
			const options = {
				method: "POST",
				headers: {
					accept: "application/json",
					Authorization: "Bearer " + API_KEY,
				},
			};

			fetch(
				"https://api.themoviedb.org/3/authentication/guest_session/new",
				options
			)
				.then((res) => res.json())
				.then((res) =>
					res.success
						? dispatch(
								loginAction.saveGuestSessionId({
									sessionId: res.guest_session_id,
								})
						  )
						: undefined
				)
				.catch((err) => console.error(err));

			router.push("/home-page");
		} else {
			setLoginError("Credentials don't match!");
		}
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
						<div className="space-y-1">
							<h1 className="text-4xl font-medium">
								Sign in
							</h1>
							<p>
								See the most extraordinary movies
							</p>
						</div>

						<div className="space-y-4 flex flex-col pt-4">
							<input
								className="border border-1 p-2 rounded"
								type="text"
								placeholder="Email or Phone"
								aria-label="Email or Phone"
								onChange={(e) => {
									handleInputChange(
										"email",
										e.target.value
									);

									handleInputChange(
										"phone",
										e.target.value
									);
								}}
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
									onChange={(e) =>
										handleInputChange(
											"password",
											e.target.value
										)
									}
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

							{loginError && (
								<p className="text-red-500">
									{" "}
									{loginError}{" "}
								</p>
							)}
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
