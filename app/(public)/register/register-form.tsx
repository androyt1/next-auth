"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserProp = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const initialState: UserProp = {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
    };

    const router = useRouter();
    const [user, setUser] = useState<UserProp>(initialState);
    const { username, email, firstname, lastname, password, confirmPassword } = user;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        const { id, value } = e.target;
        setUser((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password and continue password do not match");
        } else if (!username || !email || !firstname || !lastname || !password) {
            setError("All fields are required");
            return;
        } else {
            setLoading(true);
            const records = { username, email, firstname, lastname, password };

            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(records),
                });
                const data = await response.json();
                if (response.ok) {
                    setLoading(false);
                    router.push("/login");
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className='w-full md:w-[700px] bg-secondary-foreground text-primary-foreground border-gray-600 border-2'>
                <CardHeader>
                    <CardTitle>User Registration</CardTitle>
                    <CardDescription className='text-gray-400'>
                        Get registered to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-y-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    id='username'
                                    placeholder='Enter username'
                                    autoComplete='username'
                                    onChange={handleChange}
                                    className='bg-primary'
                                />
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    placeholder='Enter Email'
                                    autoComplete='email'
                                    className='bg-primary'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='firstname'>Firstname</Label>
                                <Input
                                    id='firstname'
                                    placeholder='Enter Firstname'
                                    onChange={handleChange}
                                    className='bg-primary'
                                />
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='lastname'>Lastname</Label>
                                <Input
                                    type='text'
                                    id='lastname'
                                    placeholder='Enter Lastname'
                                    className='bg-primary'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Enter password'
                                    onChange={handleChange}
                                    className='bg-primary'
                                />
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='confirmPassword'>Confirm password</Label>
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    placeholder='Confirm password'
                                    className='bg-primary'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-start'>
                    <div className='flex justify-between items-center w-full'>
                        <Button
                            variant={"default"}
                            type='submit'
                            className='border-gray-600 border'>
                            {loading ? "Submitting..." : "Register"}
                        </Button>
                        <Link href='/login' className='text-gray-400 hover:text-gray-200'>
                            Already have an account click here to login
                        </Link>
                    </div>
                    <div className='flex justify-start items-center b'>
                        {error && <p className='text-red-500 mt-2'>* {error}</p>}
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
};

export default RegisterForm;
