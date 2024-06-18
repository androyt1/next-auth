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
    password: string;
};

const LoginForm = () => {
    const initialState: UserProp = {
        username: "",
        password: "",
    };

    const router = useRouter();
    const [user, setUser] = useState<UserProp>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { username, password } = user;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        const { id, value } = e.target;
        setUser((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Username and password is required");
            return;
        }

        const records = { username, password };
        setLoading(true);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(records),
            });
            const data = await response.json();
            if (response.ok) {
                const userId = data.userId;
                router.push(`/user/${userId}`);
                setLoading(false);
            } else {
                setError(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className='w-full max-w-[650px] bg-secondary-foreground text-primary-foreground border-2 border-gray-600'>
                <CardHeader>
                    <CardTitle>User Login</CardTitle>
                    <CardDescription className='text-primary-foreground'>
                        Login with username and password to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
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
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                type='password'
                                id='password'
                                placeholder='Enter password'
                                className='bg-primary'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-start '>
                    <div className='w-full flex justify-between items-center'>
                        <Button
                            variant={"default"}
                            type='submit'
                            className='border-gray-600 border mr-8'>
                            {loading ? "Submitting.." : "Login"}
                        </Button>
                        <Link href='/register' className='text-gray-400 hover:text-gray-200'>
                            You don&apos;t have an account, click here to sign up
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

export default LoginForm;
