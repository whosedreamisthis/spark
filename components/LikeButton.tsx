'use client';

import { toggleLikeMember } from '@/app/actions/likeActions';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { useClerk } from '@clerk/nextjs';

type Props = {
	targetId: string;
	hasLiked: boolean;
};
export default function LikeButton({ targetId, hasLiked }: Props) {
	const { openSignIn, user } = useClerk();
	const [isPending, startTransition] = useTransition();

	const [optimisticLike, addOptimisticLike] = useOptimistic(
		hasLiked,
		(state, newState: boolean) => newState,
	);
	const router = useRouter();

	async function togglerLike(e: React.MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (!user) {
			return toast(`Join the conversation`, {
				description: 'Sign in to like members and start matching!',
				descriptionClassName: 'text-slate-800 font-medium',
				action: {
					label: 'Sign In',
					onClick: () => openSignIn(), // Opens the Clerk modal
				},
			});
		}

		startTransition(async () => {
			try {
				addOptimisticLike(!optimisticLike);

				const result = await toggleLikeMember(targetId, hasLiked);
				router.refresh();
			} catch (error) {
				toast.error('Something went wrong');
			}
		});
	}

	return (
		<div
			onClick={togglerLike}
			disabled={isPending}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<Heart
				size={28}
				className={`text-white absolute -top-0.5 -right-0.5 ${
					optimisticLike ? 'fill-rose-500' : 'fill-neutral-500/70'
				}`}
			/>
		</div>
	);
}
