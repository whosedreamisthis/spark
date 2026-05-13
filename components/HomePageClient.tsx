'use client';

import { useClerk } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function HomePageClient() {
	const { openSignIn } = useClerk();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-rose-50 to-white">
			<div className="flex flex-col gap-3 w-64">
				<button
					onClick={() => openSignIn({ mode: 'modal' })}
					className="w-full flex items-center justify-center h-11 bg-rose-600 text-white hover:bg-rose-700 transition-colors text-sm font-semibold rounded-md shadow-sm cursor-pointer"
				>
					<LogIn className="mr-2 h-4 w-4" />
					<span>Sign In</span>
				</button>

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
