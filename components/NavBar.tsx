import React from 'react'
import Image from 'next/image'

const NavBar = () => {
    return (
        <div className='brand-logo flex flex-row justify-between h-11'>
            <div className='-mt-16'>
                <Image src='/images/brand.svg' height={250} width={180}  alt='brand-logo' />
            </div>
            

            <div className='nav-items text-white space-x-14 items-center justify-center font-[490] font-sans tracking-wider mt-6 md:flex hidden'>
                <a>Adventures</a>
                <a>Partners</a>
                <a>Contact</a>
            </div>

            <div className='avatar p-4'>
                <Image src='/images/avatar.svg' height={50} width={50} alt='avatar' />
            </div>
        </div>
    )
}

export default NavBar
