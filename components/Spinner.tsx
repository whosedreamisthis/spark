import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // shadcn's utility for merging classes

interface SpinnerProps {
	className?: string;
	size?: number;
}

export function Spinner({ className, size = 24 }: SpinnerProps) {
	return (
		<Loader2
			size={size}
			className={cn('animate-spin text-rose-500', className)}
		/>
	);
}
