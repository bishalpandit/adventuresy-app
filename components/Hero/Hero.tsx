import React from 'react'
import Image from 'next/image'
import SearchBar from './SearchBar'
import { randomInt } from 'crypto';
import Link from 'next/link';

const Hero = () => {
    const heroImages = [
        'kayak.jpg',
        'camping.jpg',
        'scuba-diving.jpg',
        'paragliding.jpg',
        'skydiving.webp'
    ];
    const heroImage = heroImages[Math.floor(Math.random() * (heroImages.length - 1))]

    return (
        <div className='h-[450px] lg:h-[600px] max-w-[80%] mx-auto mt-20 relative'>
            <Image src={`/images/carousel-cards/${heroImage}`} className='rounded-3xl opacity-[0.5]' layout='fill' objectFit='cover' alt='hero-img' />
            <div className='absolute font-poppins flex flex-col space-y-6 md:space-y-12 w-[75%] md:w-[80%] h-full inset-x-4 lg:inset-y-24 mt-4  md:inset-x-20' >
                <SearchBar />
                <h1 className='ml-2 sm:ml-0 mb-4 text-3xl sm:text-4xl lg:text-6xl sm:font-normal leading-[45px] md:leading-[80px]' >Explore Exciting Adventures, Sports and Rides</h1>
                <p className='ml-2 sm:ml-0 leading-loose sm:leading-relaxed text-xs sm:text-base tracking-wider'>Enjoy exhilarating adventures, fun rides and cool sports. Book one with our trusted partners.</p>
                <Link href='/activities' passHref shallow>
                    <button
                        className='h-8 w-24 md:hidden bg-white text-[10px] font-medium text-black rounded-lg'
                    >
                        See Activities
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Hero
