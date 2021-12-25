import React from 'react'
import Image from 'next/image'
import Button from './Button'

const CarouselCard = ({ imgURL } : { imgURL: any }) => {
    return (
        <div className='h-[240px] w-[90%]  mx-auto relative animate cursor-pointer'>
            <Image src={`/images/carousel-cards/${imgURL}`} className='rounded-3xl opacity-[0.6]' layout='fill' objectFit='cover' alt='hero-img'/>
            
            <div className='inset-4 space-y-4 absolute font-poppins tracking-wide w-2/3'>
                <p className='text-sm'>Snow</p>
                <h2 className='text-sm sm:text-2xl font-medium'>Swim with most beautiful sea creatures.</h2>
                <div className='sm:w-40 pt-6'>
                    <Button />
                </div>
            </div>

        </div>
    )
}

export default CarouselCard
