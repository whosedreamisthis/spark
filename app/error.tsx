'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-[70vh] p-4">
			<Card className="w-full max-w-md border-rose-100 shadow-xl overflow-hidden">
				{/* Decorative Top Bar */}
				<div className="h-2 bg-gradient-to-r from-rose-400 to-pink-500" />

				<CardHeader className="text-center pb-2">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-rose-50 rounded-full">
							<AlertCircle className="w-10 h-10 text-rose-500" />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-gray-800">
						Oops! Connection Lost
					</CardTitle>
				</CardHeader>

				<CardContent className="text-center space-y-3">
					<p className="text-gray-600">
						Even the best sparks sometimes flicker. Something went
						wrong while loading this page.
					</p>
					{error.digest && (
						<p className="text-[10px] font-mono text-gray-400">
							Error ID: {error.digest}
						</p>
					)}
				</CardContent>

				<CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
					<Button
						onClick={() => reset()}
						variant="default"
						className="w-full bg-rose-500 hover:bg-rose-600 gap-2 h-11"
					>
						<RefreshCcw size={18} />
						Try Again
					</Button>

					<Button
						variant="outline"
						asChild
						className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 gap-2 h-11"
					>
						<Link href="/members">
							<Home size={18} />
							Back to Discover
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
