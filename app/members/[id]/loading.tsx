import { Spinner } from '@/components/Spinner';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="flex flex-col md:flex-row gap-6 p-6">
			<Skeleton className="h-[200px] w-[200px] rounded-2xl" />
			<div className="space-y-3 flex-1">
				<Skeleton className="h-8 w-[250px]" />
				<Skeleton className="h-4 w-[150px]" />
				<div className="flex gap-2 mt-4">
					<Skeleton className="h-6 w-16 rounded-full" />
					<Skeleton className="h-6 w-16 rounded-full" />
				</div>
			</div>
			<Spinner />
		</div>
	);
}
