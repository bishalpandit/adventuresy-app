import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRecoilValue } from 'recoil'
import { authState } from '../store'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import baseURL from '../utils/baseURL';
import { useAuth } from '../hooks/useAuth';
import NavBar from '../components/Layout/NavBar';

function Profile() {
    const { authUser } = useRecoilValue(authState);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const { first_name, last_name, email_id } = authUser as any;
    const { checkAuth } = useAuth();

    useEffect(() => {
        (async () => {
            await checkAuth();
            setLoading(false);
        })();
    }, []);

    const handleSave = () => {

    }

    return (
        loading ?
            (
                <div className={'flex flex-col h-screen justify-center items-center '}>
                    <CircularProgress thickness={4} className='!text-white' size={60} />
                </div>
            ) :
            (
                <div className='flex flex-col space-y-4'>
                    <NavBar />
                    <div className="flex flex-col relative gap-3 items-center w-full">
                        <h2 className="absolute left-6 top-8 text-2xl md:text-4xl ">Profile</h2>

                        <div className="mt-10 top-section flex flex-col items-center space-y-4">
                            <Image src='/images/avatar.svg' height={100} width={100} alt='avatar' />
                            <input className="text-2xl font-bold bg-black/80 rounded-lg border-0 w-[65%]" readOnly={!edit} type="text" defaultValue={`${first_name} ${last_name}`} />
                        </div>

                        <div className="mid-section w-full mt-4">
                            <div className="bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                                <label className="text font-medium text-sky-500">username</label>
                                <input className='bg-black/80 border-0 rounded-md w-[80%]' readOnly={!edit} type="text" value={'@' + email_id.substr(0, email_id.indexOf('@'))} />
                            </div>

                            <div className="mt-6 bg-dark-800 flex flex-col space-y-2 w-[75%] md:w-[40%] min-h-14 p-3 rounded-md mx-auto ">
                                <label className="text font-medium text-sky-500">email</label>
                                <input className='bg-black/80 border-0 rounded-md w-[80%]' readOnly={!edit} type="email" value={email_id} />
                            </div>
                        </div>

                        <div className="bottom-section mt-4">
                            <button onClick={() => setEdit((prev) => !prev)} className='rounded-lg px-16 py-4 bg-sky-600 md:text-xl font-medium font-ubuntu'>
                                {
                                    edit ?
                                        <p onClick={handleSave}>Save</p> :
                                        <p>Edit</p>
                                }
                            </button>
                        </div>
                    </div>
                </div>

            )

    )
}

export default Profile;
