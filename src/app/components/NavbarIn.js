// components/Navbar.js
"use client";

import Link from "next/link";

const NavbarIn = () => {
	return (
		<nav className='bg-gray-800 p-4 z-50 fixed w-full top-0 left-0'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-white text-lg font-semibold'>
					<Link
						href='/'
						legacyBehavior
					>
						<a>
							<img
								className='h-10 m-0'
								src='white-globe.png'
								alt='Globe'
							/>
						</a>
					</Link>
				</div>
				<div className='space-x-4'>
					<Link
						href='/language/UserChats'
						legacyBehavior
					>
						<a className='text-white'>Chats</a>
					</Link>

				</div>
			</div>
		</nav>
	);
};

export default NavbarIn;
// components/NavbarIn.js