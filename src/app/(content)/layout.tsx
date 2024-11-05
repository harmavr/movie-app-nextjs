import ArrowScrollTop from "./components/arrowScrollTop";
import MainNavigation from "./components/mainNavigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MainNavigation />

			<ArrowScrollTop />
			{children}
		</>
	);
}
