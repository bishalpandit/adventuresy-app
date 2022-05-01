import React from 'react'
import Image from 'next/image'
import SearchBar from './SearchBar'

const Hero = () => {
    return (
        <div className='h-[450px] lg:h-[600px] x max-w-[80%] mx-auto mt-20 relative'>
            <Image src='/images/hero-image.jpg' className='rounded-3xl opacity-[0.5]' layout='fill' objectFit='cover' alt='hero-img' />
            <div className='absolute font-poppins flex flex-col space-y-6 md:space-y-8 w-[75%] md:w-[80%] h-full inset-x-4 lg:inset-y-24 mt-4  md:inset-x-20' >
                <SearchBar />
                <h1 className='ml-2 sm:ml-0 mb-4 text-3xl sm:text-4xl lg:text-6xl sm:font-normal leading-[40px] sm:leading-relaxed'>Explore Exciting Adventures, Sports and Rides</h1>
                <p className='ml-2 sm:ml-0  leading-loose sm:leading-relaxed font- text-xs sm:text-base tracking-wider'>Enjoy exhilarating adventures, fun rides and cool sports. Book one with our trusted partners.</p>
                <button className='ml-4 sm:ml-0 bg-white w-24 h-10 text-sm md:text-lg font-montserrat font-medium tracking-wide py-1 px-4 animate rounded-lg text-black'>
                    Browse
                </button>
            </div>

        </div>
    )
}

export default Hero
