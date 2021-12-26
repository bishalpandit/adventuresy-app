import React from 'react'
import Image from 'next/image'
import SearchBar from './SearchBar'

const Hero = () => {
    return (
        <div className='h-[60vh] max-w-[80%] md:h-[600px] mx-auto mt-20 relative '>
            <Image src='/images/hero-image.jpg' className='rounded-3xl opacity-[0.8]' layout='fill' objectFit='cover' alt='hero-img'/>
            <div className='absolute inset-y-24 flex w-full justify-center'>
                <SearchBar />
            </div>
            <div className='absolute font-poppins text-white w-[75%] md:w-[80%] inset-x-4 inset-y-28 md:top-[220px] md:inset-x-20'>
                <h1 className='mb-4 text-3xl md:text-6xl font-normal md:leading-relaxed'>Explore Exciting Adventures, Sports and Rides</h1>
                <p>Enjoy exhilarating adventures, fun rides and cool sports. Book one with our trusted partners.</p>
            </div>
        </div>
    )
}

export default Hero
