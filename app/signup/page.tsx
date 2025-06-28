import { getSession } from "../_lib/actions"
import { redirect } from "next/navigation"
import SignUpForm from "../_components/signupForm"

const SignUp = async () => {  
  const session = await getSession()

  if(session.isLoggedIn){
    redirect("/")
  }
  
  return (
    <div className="p-4">
      <h1 className="flex justify-center text-4xl my-10">Ready To Transfer?</h1>
      <div className="flex justify-center items-center flex-col">
      <SignUpForm/>
      <h1 className="text-xs mt-5 text-gray-500">Already A User? {"  "}
      <Link href={"/login"} className="text-decoration-line underline text-blue-400 hover:text-gray-600">
         Login Instead
      </Link>
    </h1>
      </div>
      <TransferBlock/>
    </div>
  )
}

export default SignUp
