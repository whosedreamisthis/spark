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

	if (!dbUser) {
		await prisma.sparkUser.upsert({
			where: { email: user.emailAddresses[0].emailAddress },
			update: { clerkId: user.id }, // Update the ID in case it changed
			create: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
				name: `${user.firstName} ${user.lastName}`,
				image: user.imageUrl,
				// ... any other fields
			},
		});
	}

	if (dbUser) {
		// Logged in? Go straight to the action.
		redirect('/members');
	}
}
