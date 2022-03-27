import React from 'react'
import Image from 'next/image'
import Button from '../Button'

const AdventureCard = ({ imgURL } : { imgURL: any }) => {
    return (
        <div className='min-h-[280px] min-w-[300px] hover:blur-[2px] transition duration-250 md:w-[300px] md:h-[280px] lg:w-[300px] lg:h-[280px] relative cursor-pointer'>
            <Image src={`/images/carousel-cards/${imgURL}`} className='rounded-3xl opacity-[0.9]' layout='fill' objectFit='cover' alt='adventure-card-img' />

            <div className='inset-x-4 inset-y-36 space-y-3 absolute font-poppins tracking-wider w-[60%]'>
                <h2 className='text-2xl md:text-2xl lg-2xl font-medium'>Kayak With Crocodiles</h2>
                <p className='text-xs font-extralight'>It is so much fun kayaking with crocodiles in South Africa</p>
            </div>
            <div className='absolute bottom-8 right-6 '>
                    <Button classProp='rounded-full border px-5 py-[6px] bg-black/60'>
                        More
                    </Button>
            </div>
        </div>
    )
}

export default AdventureCard