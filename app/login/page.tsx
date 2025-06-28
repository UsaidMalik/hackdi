import LoginForm from '@/app/_components/loginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Login</h1>
      <LoginForm />
    </main>
  );
}
