import ListsBottomBar from '@/components/ListsBottomBar';

export default async function ListsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
			<main className="flex-grow overflow-y-auto no-scrollbar">
				{children}
			</main>
			<ListsBottomBar />
		</div>
	);
}
