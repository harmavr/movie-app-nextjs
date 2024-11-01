import ArrowScrollTop from "./components/arrowScrollTop";
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

				<ArrowScrollTop />
				{children}
			</body>
		</html>
	);
}
