import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberBottomBar from '@/components/MemberBottomBar';
import { notFound } from 'next/navigation';

export default async function MemberLayout({
	children,
	params, // Layouts can access params!
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const member = await getMemberByUserId(id);

	if (!member) return notFound();

	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-grow">{children}</main>
			<MemberBottomBar member={member} />
		</div>
	);
}
