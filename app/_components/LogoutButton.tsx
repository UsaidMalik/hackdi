'use client'
import { logout } from "@/app/_lib/actions"

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="text-gray-600 hover:text-gray-900 cursor-pointer hover:underline"
    >
      Log Out
    </button>
  );
}
