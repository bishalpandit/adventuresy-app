import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { LogoutIcon, UserIcon } from '@heroicons/react/solid'
import Avatar, { genConfig } from 'react-nice-avatar'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { authState } from '../../store'
import axios from 'axios'
import apiUrl from '../../utils/apiUrl'
import { LoginIcon } from '@heroicons/react/outline'
import { useAuth } from '../../hooks/useAuth'

export default function NavMenu({ login }: any) {
  const [auth, setAuth] = useRecoilState(authState);
  const [setLoginOpen] = login;
  const config = genConfig();
  const { checkAuth } = useAuth();

  useEffect(() => {
      checkAuth();
  }, []);

  const logoutHandler = async () => {

    await axios
      .get(`${apiUrl}/api/auth/logout`, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setAuth({
          isAuthenticated: false,
          authUser: null
        })
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
            {
              auth.isAuthenticated ?
              <Avatar className='w-[50px] h-[50px]' {...config} /> :
              <UserIcon
              className="w-8 h-8 text-white border-2 border-white rounded-full p-1"
              aria-hidden="true"
            />
            }
            
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
            {
              auth.isAuthenticated &&
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
            }
            {
              auth.isAuthenticated &&
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
            }
                        {
              !auth.isAuthenticated &&
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => setLoginOpen((prev: any) => !prev)}
                    >
                      <LoginIcon
                        className="w-5 h-5 mr-2 text-sky-500"
                        aria-hidden="true"
                      />
                      Login
                    </button>
                  )}
                </Menu.Item>
              </div>
            }
          </Menu.Items>
        </Transition>
      </Menu >
    </div >
  )
}




