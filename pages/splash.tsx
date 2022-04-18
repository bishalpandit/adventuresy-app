import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress';

function Splash() {

    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 6000);

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
          }, 800);
      
          return () => {
            clearInterval(timer);
          };
    }, []);
    
    return (
        <div >
            {
                isLoading 
                ? 
                <div className='flex flex-col h-screen justify-center items-center'>
                    <CircularProgress variant="determinate" thickness={4.5} className='!text-white' size={60} value={progress} />
                </div> 
                :
                    (
                        <div className='relative flex items-center justify-center h-screen overflow-hidden'>
                            <video
                                autoPlay
                                loop
                                muted
                                className="absolute -z-10 w-auto min-w-full min-h-full max-w-none opacity-30"
                            >
                                <source
                                    src="https://adventuresy-apis.azurewebsites.net/api/stream/splash"
                                    type="video/webm"
                                />
                                Your browser does not support the video tag.
                            </video>

                            <div className='absolute top-4 md:top-8 left-2 md:left-6'>
                                <Image src='/logo.png' height={50} width={182} alt='brand-logo' />
                            </div>

                            <div className='mid-content space-y-8 h-screen flex flex-col justify-center items-center z-20 px-6 md:px-1'>
                                <h1 className='font-poppins font-extrabold md:font-bold text-2xl md:text-5xl'>Your World of Adventures</h1>
                                <p className='font-poppins text-sm font-[450] text-justify'>Explore adventures, attend local events, go on animal safaris. Just dive in!</p>
                                <button onClick={() => { }} className='font-poppins rounded-md px-3 py-4 bg-white font-medium tracking-widest text-black w-40 md:w-60'>Login</button>
                            </div>
                        </div>

                    )
            }
        </div>
    )
}

export default Splash