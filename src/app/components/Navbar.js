// components/Navbar.js
"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 z-50 fixed w-full top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link href="/" legacyBehavior>
            <a><img className="h-10 m-0" src="white-globe.png" alt="Globe"/></a>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/login" legacyBehavior>
            <a className="text-white">Login</a>
          </Link>
          <Link href="/aboutus" legacyBehavior>
            <a className="text-white">About Us</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
