import React from 'react'
import Image from 'next/image'

const CarouselCard = ({ content: { title, content, url } }: any) => {
    return (
        <div className='h-[240px] w-[100%] mx-auto relative animate cursor-pointer'>
            <Image src={`/images/carousel-cards/${url}`} className='rounded-3xl opacity-[0.8]' layout='fill' objectFit='cover' alt='carousel-img' />

            <div className='inset-4 space-y-4 absolute font-poppins tracking-wide w-2/3'>
                <div className='bg-white text-black/90 font-medium px-2 py-1 rounded-xl max-w-fit'>
                    <p className='text-xs md:text-sm'>{title}</p>
                </div>
                <h2 className='text-xl sm:text-2xl font-medium'>{content}</h2>
                <div className='sm:w-40 pt-6'>
                    <a className='bg-white text-sm md:text-lg font-montserrat font-medium tracking-wide py-1 px-4 animate rounded-lg text-black'>
                        See
                    </a>
                </div>
            </div>

        </div>
    )
}

export default CarouselCard
