"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    return (
        <button
            className='flex items-center gap-3 rounded-lg w-full py-1  text-sm font-medium text-white transition-all hover:text-gray-400 border-b-white'
            onClick={() => router.push("/login")}>
            Logout
        </button>
    );
}
