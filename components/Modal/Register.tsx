import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSetRecoilState } from 'recoil'
import { authState } from '../../store'
import Loader from '../Loader';
import { useRouter } from 'next/router';
import baseURL from '../../utils/baseURL';
import GoogleButton from 'react-google-button';

export default function RegisterModal({ open }: any) {
  const [isOpen, setIsOpen] = open;
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleGoogleLogin = () => {
    try {
      if (typeof window !== "undefined") {
        setLoading(true);
        const googleLoginURL: any = `${baseURL}/api/auth/login/google`;
        window.location.href = googleLoginURL;
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleRegister = async (data: any) => {
    setLoading(true);
    await axios
      .post(`${baseURL}/api/auth/register`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile: data.mobile,
        password: data.password
      }, { withCredentials: true })
      .then(res => {
        router.push('/', undefined, { shallow: true });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setIsOpen(false);
      })
  }

  return (

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={`inline-block ${loading ? 'w-[75%]' : 'w-full'} max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}>
              {
                loading ?
                  (
                    <Loader />
                  ) :
                  (
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium text-center text-gray-900 dark:text-white"
                      >
                        Sign Up
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(handleRegister)} className="px-6 pb-4 flex flex-col space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input {...register("email")} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" placeholder="hello@adventuresy.app" required />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                            <input {...register("first_name")} type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" placeholder="John" required />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                            <input {...register("last_name")} type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" placeholder="Doe" required />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input {...register("mobile")} type="text" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" placeholder="If you wanna add..." />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                            <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" required />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                            <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" required />
                          </div>
                          <button type="submit" className="w-[60%] mx-auto mb-4 text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
                          <GoogleButton className='mx-auto' onClick={handleGoogleLogin} />
                          <div className="text-sm font-medium text-gray-500">
                            Not registered? <a href="#" className="text-sky-700 hover:underline ">Create account</a>
                          </div>
                        </form>
                      </div>
                    </div>

                  )
              }
            </div>
          </Transition.Child>
        </div>
        )
      </Dialog>
    </Transition>
  )
}
