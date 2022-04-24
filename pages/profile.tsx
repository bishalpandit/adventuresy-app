import React, { useEffect, useState } from 'react'
import { accordionClasses, Avatar } from "@mui/material";
import Button from '../components/Button';
import Image from 'next/image';
import { user } from '../store'
import { useRecoilValue } from 'recoil'
import { collection, auth } from '../store'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

function Profile() {
    const accessToken = useRecoilValue(auth);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { first_name, last_name, email_id, mobile } = useRecoilValue(user) as any;

    useEffect(() => {
        if (!accessToken) {
            setLoading(true);
            router.push('/splash', undefined, { shallow: true });
            setLoading(false);
        }
    }, [router, accessToken]);

    return (
        loading ?
            (
                <div className={'flex flex-col h-screen justify-center items-center '}>
                    <CircularProgress thickness={4.5} className='!text-white' size={60} />
                </div>
            ) :
            (
                <div className="flex flex-col relative gap-3 items-center">
                    <h2 className="absolute left-6 top-8 text-2xl md:text-4xl ">Profile</h2>

                    <div className="mt-10 top-section flex flex-col items-center space-y-4">
                        <Image src='/images/avatar.svg' height={100} width={100} alt='avatar' />
                        <h3 className="text-2xl font-bold">{`${first_name} ${last_name}`}</h3>
                    </div>

                    <div className="mid-section w-full mt-4">
                        <div className="bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                            <label className="text font-medium text-sky-500">username</label>
                            <p>{'@' + email_id?.substr(0, email_id.indexOf('@'))}</p>
                        </div>

                        <div className="mt-6 bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                            <label className="text font-medium text-sky-500">email</label>
                            <p>{email_id}</p>
                        </div>

                        <div className="mt-6 bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                            <label className="text font-medium text-sky-500">mobile</label>
                            <p>{mobile}</p>
                        </div>
                    </div>

                    <div className="bottom-section mt-4">
                        <Button classProp='rounded-lg px-16 py-4 bg-sky-600 md:text-xl font-medium font-ubuntu'>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            )

    )
}

export default Profile;
