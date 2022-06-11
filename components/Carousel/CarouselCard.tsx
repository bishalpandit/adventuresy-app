import React from 'react'
import Image from 'next/image'

const CarouselCard = ({ content: { title, content, url } }: any) => {
    return (
        <div className='h-[240px] w-[100%] mx-auto relative animate cursor-pointer'>
            <Image src={`/images/carousel-cards/${url}`} className='rounded-3xl opacity-[0.8]' layout='fill' objectFit='cover' alt='carousel-img' />

            <div className='inset-6 space-y-4 absolute font-poppins tracking-wide w-2/3'>
                <h2 className='text-xl sm:text-2xl font-medium'>{content}</h2>
            </div>

        </div>
    )
}

export default CarouselCard
