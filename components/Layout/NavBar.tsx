import React from 'react'
import Image from 'next/image'

const NavBar = () => {
    return (
        <div className='brand-logo flex flex-row justify-between md:justify-around h-11 p-3'>
            <div className='h-20 md:h-36 w-20 p-6 md:w-36 relative mx-4 md:-mt-6'>
                <Image src='/images/brand.svg'  layout='fill' objectFit="cover"  alt='brand-logo' />
            </div>

            <div className='nav-items py-2 text-white space-x-14 items-center justify-center font-[490] font-montserrat tracking-wider mt-6 md:flex hidden'>
                <a>Adventures</a>
                <a>Partners</a>
                <a>Contact</a>
            </div>

            <div className='avatar p-6'>
                <Image src='/images/avatar.svg' height={50} width={50} alt='avatar' />
            </div>
        </div>
    )
}

export default NavBar