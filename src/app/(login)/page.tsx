import React from "react";

export default function LoginPage() {
	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="border-2 flex-col  ">
					{/* Header */}
					<div className="">
						<h1 className="text-4xl">Sign in</h1>
						<p>
							See the most extraordinary movies
						</p>
					</div>
					{/* Inputs */}
					<div className="space-y-3">
						<input
							type="text"
							placeholder="Email or Phone"
						/>
						<input
							type="password"
							placeholder="Password"
						/>

						<p>Forgot password?</p>
						<div>
							<button>Sign in</button>
							{/* Or */}
							<div>Or</div>
							<button>Sign in with Google</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
