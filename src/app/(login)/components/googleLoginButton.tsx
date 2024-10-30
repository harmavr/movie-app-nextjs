import React, {
	FC,
	ReactNode,
	useEffect,
} from "react";
import {
	signIn,
	getSession,
} from "next-auth/react";

interface GoogleSignInButtonProps {
	children: ReactNode;
}

export const GoogleLoginButton: FC<
	GoogleSignInButtonProps
> = ({ children }) => {
	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			if (session) {
				console.log(session.user?.name);
			}
		};

		checkSession();
	}, []);

	const loginWithGoogle = () => {
		signIn("google", {
			callbackUrl:
				"http://localhost:3000/content-page",
		});
	};

	return (
		<button
			className="border border-gray-300 py-2 px-4 w-full rounded-3xl hover:bg-slate-100 flex items-center justify-center"
			onClick={loginWithGoogle}
		>
			{children}
		</button>
	);
};
