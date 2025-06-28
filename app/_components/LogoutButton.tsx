'use client'
import { logout } from "@/app/_lib/actions"

export default function LogoutButton() {
  return (
    <div onClick={() => logout()} className="absolute top-4 right-4">
      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Log Out 
      </button>
    </div>
  )
}
