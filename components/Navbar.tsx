"use client";

const Navbar = () => {
    return (
        <nav className='container w-full h-16 bg-primary border-b-secondary border-b text-foreground flex justify-between items-center'>
            <div className='text-primary-foreground'>
                <h3 className='text-xl text-gray-400'>Authentication</h3>
            </div>
        </nav>
    );
};

export default Navbar;
