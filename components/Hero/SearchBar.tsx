import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = () => {
    return (
        <div className='w-full h-16 hidden lg:block bg-white rounded-full shadow-md px-4'>
            <form>
                <div className='flex flex-row divide-x-2 px-2 gap-x-10 text-black/90 font-[580] tracking-wide font-roboto text-sm'>
                    <div className='p-2 basis-4/12'>
                        <label>Location</label>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Great Barrier Reef..."
                        />
                    </div>
                    <div className='p-2 basis-4/12'>
                        <label>Adventure</label>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Skydiving, Kayak..."
                        />
                    </div>
                    <div className='p-2 basis-4/12'>
                        <label>Partner</label>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Triogo, Frolio..."
                        />
                    </div>
                    <div className='p-2'>
                        <button><SearchIcon className="h-10 w-8 text-emerald-500"/></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
