'use client';

import { login } from '@/app/_lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    error: undefined,
  });

  return (
    <form action={action}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="rounded-md border border-gray-300 px-2 py-1"
          id="username"
          name="username"
          type="text"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-md border border-gray-300 px-2 py-1"
          id="password"
          name="password"
          type="password"
        />
      </div>
      <SubmitButton />
      {state?.error && <p className="mt-4 text-red-500">{state.error}</p>}
    </form>
    
  );
}
