import { getSession } from "../_lib/actions"
import { redirect } from "next/navigation"
import SignUpForm from "../_components/signupForm"
import Link from 'next/link'

const SignUp = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect('/');
  }

  return (
    <div className="p-4">
      <h1 className="my-10 flex justify-center text-4xl">Muqata'ah</h1>
      <div className="flex flex-col items-center justify-center">
        <SignUpForm />
        <h1 className="mt-5 text-xs text-gray-500">
          Already A User?{' '}
          <Link
            href={'/login'}
            className="text-decoration-line text-blue-400 underline hover:text-gray-600"
          >
            Login Instead
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignUp
