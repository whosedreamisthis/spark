'use client';

import { toggleLikeMember } from '@/app/actions/likeActions';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { useClerk } from '@clerk/nextjs';

type Props = {
	targetId: string;
	hasLiked: boolean;
};
export default function LikeButton({ targetId, hasLiked }: Props) {
	const { openSignIn } = useClerk();

	const router = useRouter();

	async function togglerLike(e: React.MouseEvent) {
		e.stopPropagation();
		e.preventDefault();

		const result = await toggleLikeMember(targetId, hasLiked);

		if (result?.status === 'unauthorized') {
			toast(`Join the conversation`, {
				description: 'Sign in to like members and start matching!',
				descriptionClassName: 'text-slate-800 font-medium',
				action: {
					label: 'Sign In',
					onClick: () => openSignIn(), // Opens the Clerk modal
				},
			});
		}

		if (result?.status === 'error') {
			toast.error('Failed to update like');
		}

		router.refresh();
	}
	return (
		<div
			onClick={togglerLike}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<Heart
				size={28}
				className={`text-white absolute -top-0.5 -right-0.5 ${
					hasLiked ? 'fill-rose-500' : 'fill-neutral-500/70'
				}`}
			/>
		</div>
	);
}
