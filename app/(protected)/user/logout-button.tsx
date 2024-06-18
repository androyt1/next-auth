"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    return (
        <button
            className=' gap-3 rounded-lg w-full p-2  text-sm font-medium text-white transition-all hover:text-gray-400 border-b-white bg-gray-700 flex justify-center items-center'
            onClick={() => router.push("/login")}>
            Logout
        </button>
    );
}
