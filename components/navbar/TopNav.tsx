import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import ProfileButton from './ProfileButton';

export default function TopNav() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-rose-100 bg-gradient-to-r from-rose-200/80 via-white to-rose-100/80 backdrop-blur-md">
			<div className="flex h-16 items-center justify-between px-4">
				{/* Your Logo and Links go here */}

				<Link href="/">
					<Logo />
				</Link>
				<div className="flex gap-3">
					<Link href="/members" className="uppercase">
						Matches
					</Link>
					<Link href="/lists" className="uppercase">
						Lists
					</Link>
					<Link href="/messages" className="uppercase">
						Messages
					</Link>
				</div>
				<ProfileButton />
			</div>
		</nav>
	);
}
