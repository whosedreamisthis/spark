import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';

export default async function HomePage() {
	const { userId } = await auth();

	if (userId) redirect('/members');

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white">
			<div className="flex flex-col gap-3 w-64">
				{/* Fixed narrow width */}
				{/* Clerk Modal Trigger */}
				<SignInButton mode="modal">
					<button className="flex items-center justify-center h-11 bg-rose-600 text-white hover:bg-rose-700 transition-colors text-sm font-semibold rounded-md shadow-sm">
						Sign In
					</button>
				</SignInButton>
				{/* Guest Access */}
				<Link
					href="/members"
					className="flex items-center justify-center h-11 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors text-sm font-semibold rounded-md"
				>
					Continue as Guest
				</Link>
			</div>
		</main>
	);
}
