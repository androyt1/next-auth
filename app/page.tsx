import Link from "next/link";

export default function Page() {
    return (
        <div className='flex-1 flex flex-col justify-center items-center text-white'>
            <div className='space-y-3'>
                <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                    Welcome to our Platform
                </h1>
                <p className='mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center'>
                    The all-in-one platform for building, deploying, and managing modern web apps.
                </p>
            </div>
            <div className='flex flex-col justify-center gap-2 min-[400px]:flex-row'>
                <Link
                    className='mt-4 md:mt-6 inline-flex h-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50'
                    href='/register'>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
