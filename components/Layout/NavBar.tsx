import React, { useState } from 'react'
import Image from 'next/image'
import Menu from '../Menus'
import { useRecoilValue } from "recoil";
import { authState } from "../../store";
import dynamic from 'next/dynamic'
import RegisterModal from '../Modal/Register';
const LoginModal = dynamic(
    () => import('../Modal/Login'),
    { ssr: false }
)
import { LoginIcon } from '@heroicons/react/solid'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const auth = useRecoilValue(authState);
    

    return (
        <div className='brand-logo flex flex-row justify-between md:justify-around h-17 p-3 bg-dark-800  shadow-lg shadow-black/90'>
            <div className=' h-10 w-36 mt-2 relative '>
                <Image src='/logo.png' layout='fill' objectFit="contain" alt='brand-logo' />
            </div>

            <div className='nav-items py-2 text-white space-x-14 items-center justify-center font-medium font-montserrat tracking-wider mt-6 md:flex hidden'>
                <a>Adventures</a>
                <a>Find Adventure Partner</a>
            </div>

            <div className='w-20'>
                {
                    auth.isAuthenticated
                        ?
                        <Menu />
                        :
                        (
                            <div className='flex items-center'>
                                <p onClick={() => setLoginOpen(prev => !prev)} className='cursor-pointer mt-6 font-medium'>Login <LoginIcon className='inline' width={15} height={15} /></p>
                            </div>
                        )

                }
            </div>
            <LoginModal setRegisterOpen={setRegisterOpen} open={[loginOpen, setLoginOpen]} />
            <RegisterModal setLoginOpen={setLoginOpen} open={[registerOpen, setRegisterOpen]} />
        </div>
    )
}

export default NavBar
