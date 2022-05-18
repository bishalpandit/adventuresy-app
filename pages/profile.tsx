import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRecoilState } from 'recoil'
import { authState } from '../store'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import baseURL from '../utils/baseURL';

function Profile() {
    const [auth, setAuth] = useRecoilState(authState);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { authUser, isAuthenticated } = auth as any;
    let first_name = '', last_name = '', email_id = '', mobile = ''; 

    first_name = authUser?.first_name;
    last_name = authUser?.last_name;
    email_id = authUser?.email_id;
    mobile = authUser?.mobile;

    useEffect(() => {
        const checkAuth = async () => {
            await axios
                .get(`${baseURL}/api/auth/user`, { withCredentials: true })
                .then(res => {
                    const auth = res.data;

                    if (auth.status) {
                        setAuth({
                            isAuthenticated: true,
                            authUser: auth.user
                        })
                        setLoading(false);
                    } else {
                        setAuth({
                            isAuthenticated: false,
                            authUser: null
                        });
                        router.push('/splash', undefined, { shallow: true });
                    }
                })
        }

        checkAuth();
    }, []);

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
                        <button className='rounded-lg px-16 py-4 bg-sky-600 md:text-xl font-medium font-ubuntu'>
                            Edit Profile
                        </button>
                    </div>
                </div>
            )

    )
}

export default Profile;
