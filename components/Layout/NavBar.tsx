import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Menu from '../Menus'
import dynamic from 'next/dynamic'
import RegisterModal from '../Modal/Register';
const LoginModal = dynamic(
    () => import('../Modal/Login'),
    { ssr: false }
)
import Link from 'next/link';

const NavBar = () => {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <div className='brand-logo flex flex-row justify-between md:justify-around h-17 p-3 '>
            <div className=' h-10 w-36 mt-2 relative cursor-pointer '>
                <Link href='/home' passHref>
                    <Image src='/logo.png' layout='fill' objectFit="contain" alt='brand-logo' />
                </Link>

            </div>

            <div className='nav-items py-2 text-white space-x-14 items-center justify-center text-sm font-medium font-montserrat tracking-wider mt-6 md:flex hidden'>
                <Link href='/activities'>
                    <a>Adventures</a>
                </Link>

                <a>Partner Finder</a>
            </div>

            <div className='w-20 mt-2'>
                <Menu login={[setLoginOpen]} />
            </div>
            <LoginModal setRegisterOpen={setRegisterOpen} open={[loginOpen, setLoginOpen]} />
            <RegisterModal setLoginOpen={setLoginOpen} open={[registerOpen, setRegisterOpen]} />
        </div>
    )
}

export default NavBar
