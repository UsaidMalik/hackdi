"use client";

import LoginForm from '@/app/_components/loginForm';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-800">Mgm3</h1>
          <p className="text-gray-500 mt-1 italic">
            Welcome back — let’s get aggregating.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <LoginForm />
        </motion.div>

        <motion.p
          className="text-sm text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
