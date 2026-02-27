'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { User, LogIn, UserPlus, UserCircle } from 'lucide-react'; // Added UserCircle for the icon
import { useEffect, useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileButton({ userId }: { userId: string | null }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Return a placeholder with the same dimensions to avoid layout shift
	if (!mounted)
		return (
			<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
		);

	if (userId) {
		return (
			<div className="h-8 w-8 flex items-center justify-center">
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-8 w-8',
							userButtonTrigger: 'opacity-100 transition-none',
						},
					}}
				>
					{/* 🌟 THIS IS THE ADDITION: Add a custom link inside the Clerk Menu */}
					<UserButton.MenuItems>
						<UserButton.Link
							label="My Profile"
							labelIcon={<UserCircle size={16} />}
							href="/profile"
						/>
					</UserButton.MenuItems>
				</UserButton>
			</div>
		);
	}

	// ... rest of your Logged Out code remains the same
	return <DropdownMenu>{/* Logged out state code */}</DropdownMenu>;
}
