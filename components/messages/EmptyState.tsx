import { MailOpen } from 'lucide-react';

export default function EmptyState({ container }: { container: string }) {
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<div className="bg-slate-100 p-6 rounded-full mb-4">
				<MailOpen size={40} className="text-slate-400" />
			</div>
			<h2 className="text-xl font-bold text-slate-800">
				Your {container} is empty
			</h2>
			<p className="text-sm text-slate-500 max-w-50 mt-2">
				{container === 'inbox'
					? "When people message you, they'll appear here."
					: "You haven't sent any messages yet."}
			</p>
		</div>
	);
}
