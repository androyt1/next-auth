import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/app/(auth)/dal";
import LogoutButton from "../logout-button";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { userId: string } }) => {
    const user = await getUser(params.userId);

    if (!user) {
        redirect("/login");
    }

    return (
        <div className='flex-1 flex flex-col justify-center items-center'>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Card className='w-full md:w-[450px] bg-primary text-white'>
                    <CardHeader>
                        <CardTitle>User</CardTitle>
                        <CardDescription className='text-white'>
                            Showing current logged in user details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <p>username: {user?.username}</p>
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <p>email: {user?.email}</p>
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <p>lastname: {user?.lastname}</p>
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <p>firstname: {user?.firstname}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <LogoutButton />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default UserPage;
