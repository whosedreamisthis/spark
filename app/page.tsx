import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
	const { userId } = await auth();

	if (userId) redirect('/members');

	return <HomePageClient />;
}