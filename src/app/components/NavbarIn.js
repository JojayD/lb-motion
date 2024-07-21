// components/NavbarIn.js
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaCog } from 'react-icons/fa'; // Import the settings icon

const NavbarIn = () => {
  return (
    <nav className='bg-gray-800 p-4 z-50 fixed w-full top-0 left-0'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-lg font-semibold'>
          <Link href='/' legacyBehavior>
            <a>
              <img
                className='h-10 m-0'
                src='white-globe.png'
                alt='Globe'
              />
            </a>
          </Link>
        </div>
        <div className='space-x-4 flex items-center'>
          <Link href='/language/UserChats' legacyBehavior>
            <a className='text-white bg-red-450 px-4 py-2 rounded-lg'>Chats</a>
          </Link>
          <Link href='/usersetting' legacyBehavior>
            <a className='text-white bg-gray-500 px-4 py-2 rounded-lg flex items-center'>
              <FaCog className='mr-2' /> Settings
            </a>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className='text-white bg-red-500 px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarIn;
