import React from 'react'
import { Avatar } from "@mui/material";
import Button from '../components/Button';
import Image from 'next/image';

function Profile() {
    return (
        <div className="flex flex-col relative gap-3 items-center">
            <h2 className="absolute left-6 top-8 text-2xl md:text-4xl ">Profile</h2>

            <div className="mt-10 top-section flex flex-col items-center space-y-4">
                <Image src='/images/avatar.svg' height={100} width={100} alt='avatar' />
                <h3 className="text-2xl font-bold">Jit Mishra</h3>
            </div>

            <div className="mid-section w-full mt-4">
                <div className="bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                    <label className="text font-medium text-sky-500">username</label>
                    <p>@jitmishra777</p>
                </div>

                <div className="mt-6 bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                    <label className="text font-medium text-sky-500">email</label>
                    <p>jit.mishra@gmail.com</p>
                </div>

                <div className="mt-6 bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                    <label className="text font-medium text-sky-500">mobile</label>
                    <p>7980060620</p>
                </div>
            </div>

            <div className="bottom-section mt-4">
                <Button classProp='rounded-lg px-16 py-4 bg-sky-600 md:text-xl font-medium font-ubuntu'>
                    Edit Profile
                </Button>
            </div>
        </div>
    )
}

export default Profile
