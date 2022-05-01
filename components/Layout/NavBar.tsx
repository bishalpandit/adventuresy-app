import React, { useState } from 'react'
import Image from 'next/image'
import Menu from '../Dropdown'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='brand-logo flex flex-row justify-between md:justify-around h-11 p-3'>
            <div className=' h-10 w-36 mt-2 relative '>
                <Image src='/logo.png' layout='fill' objectFit="contain" alt='brand-logo' />
            </div>

            <div className='nav-items py-2 text-white space-x-14 items-center justify-center font-[490] font-montserrat tracking-wider mt-6 md:flex hidden'>
                <a>Adventures</a>
                <a>Partners</a>
                <a>Contact</a>
            </div>
            
            <div className='w-20'>
                <Menu />
            </div>
        </div>
    )
}

export default NavBar
