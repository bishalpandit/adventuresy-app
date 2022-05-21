import React from 'react'
import Image from 'next/image'
import imgBaseURL from '../../utils/imgBaseURL'
import Link from 'next/link'


const AdventureCard = ({ adventure }: { adventure: any }) => {
    
    return (
        <div className='min-h-[280px] min-w-max transition duration-250 relative cursor-pointer '>
            <Image src={`${imgBaseURL}/${adventure.img_link}`} className='rounded-3xl opacity-[0.9]' layout='fill' objectFit='cover' alt='adventure-card-img' />

            <div className='inset-x-4 inset-y-32 space-y-3 absolute font-poppins tracking-wider w-[60%]'>
                <h2 className='text-2xl md:text-2xl lg-2xl font-medium'>{adventure.title}</h2>
                <p className='text-xs font-extralight'>{adventure.summary.substr(0, 40) + "..."}</p>
            </div>
            <div className='absolute bottom-8 right-6 '>
                <Link scroll={false} passHref href={`/adventure/${adventure.id}`}>
                    <a className='rounded-full border px-5 py-[6px] bg-black/60'>
                        More
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default AdventureCard
