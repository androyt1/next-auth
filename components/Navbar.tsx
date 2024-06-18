"use client";

import Link from "next/link";

const Navbar = () => {
    return (
        <nav className='container w-full h-16 bg-primary border-b-secondary border-b text-foreground flex justify-between items-center'>
            <div className='text-primary-foreground'>
                <Link href='/' className='text-xl text-gray-400'>
                    Authentication
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
