import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress';
import baseURL from '../utils/baseURL';
import dynamic from 'next/dynamic'
import RegisterModal from '../components/Modal/Register';
const LoginModal = dynamic(
  () => import('../components/Modal/Login'),
  { ssr: false }
)

function Splash() {

    const [isLoading, setIsLoading] = useState(true);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            isLoading && window.scrollTo(0, 0);
        }, 800);

        return () => clearInterval(intervalId);
    }, [isLoading]);

    return (
        <div >
            <div className={`relative items-center justify-center h-screen overflow-hidden ${isLoading ? 'h-1' : 'flex'}`}>
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute -z-10 w-auto min-w-full min-h-full max-w-none opacity-30"
                    onPlay={() => {
                        setIsLoading(false)
                    }}
                >
                    <source
                        src={`${baseURL}/api/stream/splash`}
                        type="video/webm"
                    />
                    Your browser does not support the video tag.
                </video>

                <div className='absolute top-4 md:top-8 left-2 md:left-6'>
                    <Image src='/logo.png' height={40} width={144} alt='brand-logo' />
                </div>

                <div className='mid-content space-y-8 h-screen flex flex-col justify-center items-center z-5 px-6 md:px-1'>
                    <h1 className='font-poppins font-extrabold md:font-bold text-6xl hidden md:block leading-relaxed '>Your World of Adventures</h1>
                    <h1 className='font-poppins font-extrabold md:font-bold text-4xl block md:hidden leading-relaxed '>Your World <br /> of Adventures</h1>
                    <p className='font-poppins px-2 md:px-0 md:text-md font-light md:font-medium text-justify'>Explore adventures, attend local events, go on animal safaris. Dive in.</p>
                    <button onClick={() => setLoginOpen((prev) => !prev)} className='font-poppins rounded-md px-3 py-4 bg-white font-medium tracking-widest text-black w-40 md:w-60'>Login</button>
                </div>
                <LoginModal setRegisterOpen={setRegisterOpen} open={[loginOpen, setLoginOpen]} />
                <RegisterModal setLoginOpen={setLoginOpen} open={[registerOpen, setRegisterOpen]} />
            </div>
            {
                isLoading &&
                <div className={'flex flex-col h-screen justify-center items-center '}>
                    <CircularProgress thickness={4.5} className='!text-white' size={60} />
                </div>
            }
        </div>
    )
}

export default Splash;