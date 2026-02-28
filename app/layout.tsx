import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/navbar/TopNav';
import { auth } from '@clerk/nextjs/server';
import { ClerkProvider } from '@clerk/nextjs';
import PresenceTracker from '@/components/PresenceTracker';
import NotificationListener from '@/components/NotificationListener';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Spark',
	description: 'Dating App',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = await auth();
	return (
		<ClerkProvider>
			<html lang="en">
				<head>
					<link rel="preconnect" href="https://res.cloudinary.com" />
					{/* Replace with your actual image host domain */}
				</head>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Toaster richColors position="bottom-center" />
					{userId && <NotificationListener userId={userId} />}
					{userId && <PresenceTracker />}
					<TopNav userId={userId} />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
