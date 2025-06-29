'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getClientSession, SessionData } from '@/app/_lib/client-session';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getClientSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-transparent py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-800 text-lg font-bold">
            Home
          </Link>
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">
            Explore
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {session?.isLoggedIn ? (
            <>
              <span className="text-gray-800">Welcome, {session.username}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-gray-900">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
