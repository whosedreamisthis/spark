export default function MemberGridSkeleton() {
	// Create an array of 8 items to represent the initial loading state
	const skeletonCards = Array.from({ length: 8 });

	return (
		<div className="m-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{skeletonCards.map((_, index) => (
				<div
					key={index}
					className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200 animate-pulse"
				>
					{/* Mimic the bottom info bar of your MemberCard */}
					<div className="absolute bottom-0 w-full h-16 bg-slate-300/50 backdrop-blur-sm p-3">
						<div className="h-4 w-3/4 bg-slate-400 rounded mb-2" />
						<div className="h-3 w-1/2 bg-slate-400/60 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}
