'use client';

import { toggleLikeMember } from '@/app/actions/likeActions';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
	targetId: string;
	hasLiked: boolean;
};
export default function LikeButton({ targetId, hasLiked }: Props) {
	const router = useRouter();

	async function togglerLike(e: React.MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		await toggleLikeMember(targetId, hasLiked);
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
