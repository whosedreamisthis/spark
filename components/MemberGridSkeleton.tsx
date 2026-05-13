export default function MemberGridSkeleton() {
	const skeletonCards = Array.from({ length: 8 });

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{skeletonCards.map((_, i) => (
				<div
					key={i}
					className="relative aspect-square rounded-xl bg-slate-200 animate-pulse overflow-hidden"
				>
					{/* This box matches the Image container exactly */}
					<div className="absolute bottom-0 w-full p-2 bg-slate-300 h-12" />
					{/* This simulates the name/city text area */}
				</div>
			))}
		</div>
	);
}
