"use client";

import { signup } from "../_lib/actions";
import { useFormState } from "react-dom";

const SignUpForm = () => {
  const [state, formAction] = useFormState<any, FormData>(signup, undefined);

  return (
    <form action={formAction} className="flex flex-col w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-400 mb-8">Sign Up</h2>
      <input
        type="text"
        name="username"
        required
        placeholder="Username"
        className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <input
        type="submit"
        value="Sign Up"
        className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-green-500 transition duration-300 cursor-pointer"
      />
      {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
    </form>
  );
};

export default SignUpForm;
