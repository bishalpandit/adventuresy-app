import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import SearchBar from '../components/Hero/SearchBar'
import { activitiesState } from '../store/index';
import { useRecoilState } from 'recoil';
import AdventureCard from '../components/Adventure/AdventureCard'
import NavBar from '../components/Layout/NavBar'
import axios from 'axios';
import baseURL from '../utils/baseURL';
import Loader from '../components/Loader'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: false },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Skiing', href: '#' },
    { name: 'Scuba Diving', href: '#' },
    { name: 'Bungee Jumping', href: '#' },
    { name: 'Para Gliding', href: '#' },
]
const filters = [
    {
        id: 'type',
        name: 'Activity',
        options: [
            { value: 'Scuba Diving', label: 'Scuba Diving', checked: false },
            { value: 'Para Gliding', label: 'Para Gliding', checked: false },
            { value: 'Bungee Jumping', label: 'Bungee Jumping', checked: false },
            { value: 'Sky Diving', label: 'Sky Diving', checked: false }
        ],
    },
    {
        id: 'address',
        name: 'Location',
        options: [
            { value: 'India', label: 'India', checked: true },
            { value: 'Uttarakhand', label: 'Uttarakhand', checked: false },
            { value: 'Goa', label: 'Goa', checked: false },
        ],
    },
    {
        id: 'pname',
        name: 'Partner',
        options: [
            { value: 'Alta Advent', label: 'Alta Advent', checked: false },
            { value: 'Skywalt', label: 'Skywalt', checked: false },
            { value: 'Braver', label: 'Braver', checked: false },
            { value: 'OutBound Adventures', label: 'OutBound', checked: false },
        ],
    },
]


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Activities() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [activities, setActivities] = useRecoilState(activitiesState);
    const [loading, setLoading] = useState(false);

    const [selectFilters, setSelectFilters] = useState([
        Array<boolean>(filters[0].options.length).fill(false),
        Array<boolean>(filters[0].options.length).fill(false),
        Array<boolean>(filters[2].options.length).fill(false)
    ]);

    useEffect(() => {
        if (activities.length === 0)
            handleFilters(1, 0);
    }, []);

    const handleFilters = (sectionIdx: number, optionIdx: number) => {

        let newState = [...selectFilters];
        newState[sectionIdx][optionIdx] = !newState[sectionIdx][optionIdx];

        setSelectFilters(newState);

        interface Query {
            type: any[];
            address: any[];
            pname: any[];
        }

        let query: Query = {
            type: [],
            address: [],
            pname: []
        };

        selectFilters.forEach((section, secIdx) => {
            //@ts-ignore
            query[filters[secIdx].id] = filters[secIdx].options
                .filter((option, optIdx) => {
                    if (section[optIdx])
                        return option;
                })
        });

        query.type = query.type
            .map(type => {
                return type['value'];
            });

        query.address = query.address
            .map(address => {
                return address['value'];
            });

        query.pname = query.pname
            .map(pname => {
                return pname['value'];
            });

        setLoading(true);
        axios
            .get(`${baseURL}/api/adventures/filter`, {
                params: query
            })
            .then((res) => {
                const queryData = res.data.data;
                setActivities(queryData);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <div className="bg-black/80">

            <div>
                <div className='pb-10'>
                    <NavBar />
                </div>

                <div className='w-[75%] mx-auto p-4'>
                    <SearchBar />
                </div>

                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex z-40">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">

                                        {filters.map((section, sectionIdx) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            value={filters[sectionIdx].options[optionIdx].value}
                                                                            type="checkbox"
                                                                            checked={selectFilters[sectionIdx][optionIdx]}
                                                                            onChange={() => handleFilters(sectionIdx, optionIdx)}
                                                                            className="h-4 w-4 border-gray-300 rounded text-sky-600 focus:ring-sky-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-800"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6">
                        <h1 className="text-3xl font-extrabold tracking-tight ">Activities</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-200 hover:text-gray-300">
                                        Sort
                                        <ChevronDownIcon
                                            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-200 group-hover:text-gray-300"
                                            aria-hidden="true"
                                        />
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
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-200 hover:text-gray-200 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FilterIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>



                    <section aria-labelledby="activities-heading" className="pt-6 pb-24">
                        <h2 id="acitivites-heading" className="sr-only">
                            Activities
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                            {/* Filters */}
                            <form className="hidden lg:block rounded-lg bg-dark-800 p-4 h-fit">

                                <h3 className='font-medium text-xl'>Filters</h3>
                                {filters.map((section, sectionIdx) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-sky-500 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3  w-full flex items-center justify-between text-sm text-gray-200 hover:text-gray-300">
                                                        <span className="font-medium text-gray-200">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    value={option.value}
                                                                    type="checkbox"
                                                                    checked={selectFilters[sectionIdx][optionIdx]}
                                                                    onChange={(e) => handleFilters(sectionIdx, optionIdx)}
                                                                    className="h-4 w-4 border-gray-300 rounded text-sky-600 focus:ring-sky-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-200"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Activities grid */}
                            <div className="lg:col-span-3">
                                {
                                    loading
                                        ?
                                        <div className='w-full mx-auto h-full mt-32'>
                                            <Loader />
                                        </div>
                                        :
                                        <div className='grid xs:grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2'>
                                            {
                                                activities.map((activity, idx) =>
                                                    <AdventureCard
                                                        key={idx}
                                                        adventure={activity}
                                                    />
                                                )
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </section>
                </main>


            </div>
        </div>
    )
}

// export async function getServerSideProps({ query }) {
//     const minPrice = query.minPrice || '0';
//     const maxPrice = query.maxPrice || '1000000';
//     const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

//     return {
//         props: {
//             properties: data?.hits,
//         },
//     };
// }

// const updatedState: boolean[][] = selectFilters.map((section, secIdx) => {
//     return section.map((option, optIdx) => {
//         return (sectionIdx === secIdx && optionIdx == optIdx) ? !option : option;
//     })
// }) as boolean[][];

{/* <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul> */}