'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function PhotoGallery({ images }: { images: string[] }) {
	const [width, setWidth] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (carousel.current) {
			// scrollWidth is the total width of all photos + gaps
			// offsetWidth is the width of the visible container
			setWidth(
				carousel.current.scrollWidth - carousel.current.offsetWidth,
			);
		}
	}, [images]); // Re-calculate if image count changes

	return (
		<div className="w-full overflow-hidden">
			<motion.div
				ref={carousel}
				className="cursor-grab active:cursor-grabbing"
			>
				<motion.div
					drag="x"
					// Add a small buffer (e.g., -20) to the left constraint
					// to ensure the last image clears the edge.
					dragConstraints={{ right: 0, left: -width - 20 }}
					className="flex gap-4"
				>
					{images.map((src, index) => (
						<div
							key={index}
							className="relative h-80 w-64 flex-shrink-0 rounded-3xl overflow-hidden shadow-lg"
						>
							<Image
								src={src}
								alt="Profile"
								fill
								className="object-cover pointer-events-none"
							/>
						</div>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
}
