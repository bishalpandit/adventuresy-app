import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { LogoutIcon, UserIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useSetRecoilState } from 'recoil'
import { authState } from '../../store'
import axios from 'axios'
import baseURL from '../../utils/baseURL'
import { useRouter } from 'next/router'

export default function Dropdown() {
  const setAuth = useSetRecoilState(authState);

  const router = useRouter();

  const logoutHandler = async () => {

    await axios
      .get(`${baseURL}/api/auth/logout`, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setAuth({
          isAuthenticated: false,
          authUser: null
        })
        router.push('/splash', undefined, { shallow: true });
      })
      .catch(err => {
        console.log(err);

      })

  }


  return (
    <div className="w-24 text-right top-8">
      <Menu as="div" className="z-20 relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Image src='/images/avatar.svg' height={50} width={50} alt='avatar' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-4 w-32 md:w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link href="/profile" passHref={true} shallow={true}>
                      <button
                        className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <UserIcon
                          className="w-5 h-5 mr-2 text-sky-500"
                          aria-hidden="true"
                        />
                        Profile
                      </button>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={logoutHandler}
                  >
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-sky-500"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu >
    </div >
  )
}




