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
          <Link href="/" className="text-text text-lg font-bold flex items-center space-x-1">
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </Link>
          <Link href="/contribute" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
            <span className="material-symbols-outlined">explore</span>
            <span>Contribute</span>
          </Link>
          <Link href="/blog" className="text-text hover:text-primary flex items-center space-x-1">
            <span className="material-symbols-outlined">article</span>
            <span>Blog</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {session?.isLoggedIn ? (
            <>
              <Link href="/profile" className="text-text hover:text-primary flex items-center space-x-1">
                <span className="material-symbols-outlined">person</span>
                <span>Profile</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-text hover:text-primary">
                Login
              </Link>
              <Link href="/signup" className="text-text hover:text-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
