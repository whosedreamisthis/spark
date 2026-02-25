import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function HomePage() {
	const user = await currentUser();

	// 1. If no user is logged in, show your landing page
	if (!user) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white">
				<h1 className="text-5xl font-bold text-rose-600">Spark</h1>
				<p className="mt-4 text-slate-600">Find your perfect match.</p>
				{/* Your SignUp/SignIn buttons will be in the navbar we built! */}
			</main>
		);
	}

	// 2. If logged in, check if they exist in your Neon DB
	const dbUser = await prisma.sparkUser.findUnique({
		where: { clerkId: user.id },
	});

	// 3. Create the user if they don't exist yet
	if (!dbUser) {
		await prisma.sparkUser.create({
			data: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
				name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
				image: user.imageUrl,
			},
		});
	}

	// 4. Show the "Discovery" or "Members" feed for logged-in users
	return (
		<main className="p-8">
			<h1 className="text-2xl font-bold">
				Welcome back, {user.firstName}!
			</h1>
			<p className="text-slate-500">Ready to find your Spark?</p>

			{/* This is where your Discovery Feed component will go later */}
			<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Member Cards will go here */}
			</div>
		</main>
	);
}
