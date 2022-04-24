import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSetRecoilState } from 'recoil'
import { auth } from '../../store'
import Loader from '../Loader';
import { useRouter } from 'next/router';
import baseURL from '../../utils/baseURL';

export default function Modal({ open }: any) {
    const [isOpen, setIsOpen] = open;
    const [loading, setLoading] = useState(false);
    const setAuth = useSetRecoilState(auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const handleFormSubmit = async (data: any) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            setLoading(true);

            const { data: userData } = await axios
                .post(`${baseURL}/api/users/signin`, {
                    email: data.email,
                    password: data.password
                }, config);

            //localStorage.setItem('accessToken', userData.token);
            setAuth(userData.token);
            setLoading(false);
            router.push('/', undefined, { shallow: true });
            
        } catch (error) {
            console.log(error);
        }
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
                                                Sign in
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                                        <input {...register("email")} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                                        <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                    </div>
                                                    <button type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                                        Not registered? <a href="#" className="text-sky-700 hover:underline dark:text-blue-500">Create account</a>
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
