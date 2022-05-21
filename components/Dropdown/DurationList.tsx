import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { bookingState } from '../../store/index'
import { useRecoilState } from 'recoil'

function DurationList() {
    const [booking, setBooking] = useRecoilState<any>(bookingState);
    const durations = [
        {
            key: 0,
            name: '1 Week',
            value: 7
        },
        {
            key: 1,
            name: '2 Weeks',
            value: 14
        },
        {
            key: 2,
            name: '3 Weeks',
            value: 21
        },
        {
            key: 3,
            name: '4 Weeks',
            value: 28
        }
    ];
    
    return (
        <Listbox disabled={!booking.hasDates} value={booking.duration} onChange={(val) => setBooking((booking: any) => { return {...booking, duration: val} })}>
            <div className="relative mt-1">
                <Listbox.Button className={`relative w-full cursor-default rounded-lg border-2 border-gray-700 ${booking.hasDates ? 'bg-black/50' : 'bg-gray-800'} py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm`}>
                    <span className="block truncate font-medium">{ booking.hasDates ? booking.duration.name : 'Not available'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                            className={`${!booking.hasDates ? 'invisible' : 'visible'} h-5 w-5 text-gray-400`}
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {durations.map((duration: any) => (
                            <Listbox.Option
                                key={duration.key}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                                    }`
                                }
                                value={duration}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {duration.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default DurationList