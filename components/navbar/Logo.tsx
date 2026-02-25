import { Sparkles } from 'lucide-react';

export default function Logo() {
	return (
		<div className="flex items-center gap-2 group cursor-pointer">
			{/* The Icon Container */}
			<div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 shadow-sm transition-transform group-hover:scale-110">
				<Sparkles className="text-white w-5 h-5" fill="currentColor" />
			</div>

			{/* The Text */}
			<span className="text-xl font-bold tracking-tight text-slate-900">
				Spark<span className="text-rose-500">.</span>
			</span>
		</div>
	);
}
