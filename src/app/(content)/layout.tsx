import MainNavigation from "./components/mainNavigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<MainNavigation />
				{children}
			</body>
		</html>
	);
}
