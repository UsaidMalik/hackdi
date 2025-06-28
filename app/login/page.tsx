import LoginForm from '@/app/_components/loginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Login</h1>
      <LoginForm />
      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
