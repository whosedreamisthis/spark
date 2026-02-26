'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { User, LogIn, UserPlus } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileButton({ userId }: { userId: string | null }) {
	if (userId) {
		return (
			<div className="h-8 w-8 flex items-center justify-center">
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-8 w-8',
							// This is the secret: we set the initial state to look like the button
							userButtonTrigger: 'opacity-100 transition-none',
						},
					}}
				/>
			</div>
		);
	}

	// 3. Logged Out: Custom Dropdown
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* Replaced Button with plain button to save ~10ms of TBT */}
				<button
					className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors outline-none"
					aria-label="User menu"
				>
					<User className="h-5 w-5 text-slate-600" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56 z-[100]">
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<SignInButton mode="modal">
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className="cursor-pointer"
					>
						<LogIn className="mr-2 h-4 w-4" />
						<span>Log In</span>
					</DropdownMenuItem>
				</SignInButton>

				<SignUpButton mode="modal">
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className="cursor-pointer"
					>
						<UserPlus className="mr-2 h-4 w-4" />
						<span>Sign Up</span>
					</DropdownMenuItem>
				</SignUpButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
