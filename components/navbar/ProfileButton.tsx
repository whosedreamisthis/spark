'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { User, LogIn, UserPlus, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function ProfileButton({ userId }: { userId: string | null }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent Hydration Mismatch
	if (!mounted) {
		return (
			<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
		);
	}

	// --- LOGGED IN STATE ---
	if (userId) {
		return (
			<div className="h-8 w-8 flex items-center justify-center">
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-8 w-8',
							userButtonTrigger:
								'opacity-100 transition-none focus:shadow-none focus:outline-none',
						},
					}}
				>
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

	// --- LOGGED OUT STATE ---
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full p-0 overflow-hidden bg-gray-100 hover:bg-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
				>
					<User className="h-5 w-5 text-gray-600" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							Welcome
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							Sign in to manage your profile
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<SignInButton mode="modal">
					<DropdownMenuItem className="cursor-pointer">
						<LogIn className="mr-2 h-4 w-4" />
						<span>Log in</span>
					</DropdownMenuItem>
				</SignInButton>

				<SignUpButton mode="modal">
					<DropdownMenuItem className="cursor-pointer">
						<UserPlus className="mr-2 h-4 w-4" />
						<span>Sign up</span>
					</DropdownMenuItem>
				</SignUpButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
