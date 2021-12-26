import React from 'react'
import Image from 'next/image'
import Button from '../Button'

const CarouselCard = ({ imgURL } : { imgURL: any }) => {
    return (
        <div className='h-[240px] w-[100%]  mx-auto relative animate cursor-pointer'>
            <Image src={`/images/carousel-cards/${imgURL}`} className='rounded-3xl opacity-[0.8]' layout='fill' objectFit='cover' alt='hero-img'/>
            
            <div className='inset-4 space-y-4 absolute font-poppins tracking-wide w-2/3'>
                <p className='text-sm'>Snow</p>
                <h2 className='text-sm sm:text-2xl font-medium'>Swim with most beautiful sea creatures.</h2>
                <div className='sm:w-40 pt-6'>
                    <Button 
                    classProp='bg-white text-sm md:text-lg font-montserrat font-medium tracking-wide py-1 px-4 animate rounded-lg text-black'
                    >
                    Browse
                    </Button> 
                </div>
            </div>

        </div>
    )
}

export default CarouselCard
