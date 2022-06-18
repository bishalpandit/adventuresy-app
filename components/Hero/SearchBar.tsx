import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { activitiesState, searchState, errorState } from '../../store';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const SearchBar = () => {

    const router = useRouter();
    const setActivities = useSetRecoilState(activitiesState);
    const setError = useSetRecoilState(errorState);
    const [search, setSearch] = useRecoilState(searchState);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleSearch = async (data: any) => {
        const { location, activity, partner } = data;
        
        axios.get(`${baseURL}/api/adventures/search?location=${location}&activity=${activity}&partner=${partner}`)
        .then((res) => {
            const queryData = res.data.data;
            setActivities(queryData);
            setSearch({
                location,
                activity,
                partner
            });
            router.push('/activities', undefined, { shallow: true });
        })
        .catch(err => {
            console.log(err);
            setError({
                name: 'Search Err',
                message: err,
                code: 400
            })
        })
    }

    return (
        <div className='w-full h-16 hidden lg:block bg-white rounded-full shadow-md px-4'>
            <form onSubmit={handleSubmit(handleSearch)}>
                <div className='flex flex-row divide-x-2 px-2 gap-x-10 text-black/90 font-[580] tracking-wide font-roboto text-sm'>
                    <div className='p-2 basis-4/12'>
                        <label>Location</label>
                        <input
                          {...register("location")}
                          type="text"
                          name="location"
                          id="location"
                          defaultValue={search.location}
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Great Barrier Reef..."
                        />
                    </div>
                    <div className='p-2 basis-4/12'>
                        <label>Activity</label>
                        <input
                          {...register("activity")}
                          type="text"
                          name="activity"
                          id="activity"
                          defaultValue={search.activity}
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Skydiving, Kayak..."
                        />
                    </div>
                    <div className='p-2 basis-4/12'>
                        <label>Partner</label>
                        <input
                          {...register("partner")}
                          type="text"
                          name="partner"
                          id="partner"
                          defaultValue={search.partner}
                          className="focus:border-white focus:ring-gray-200 h-6 flex-1 block w-full  rounded-lg sm:text-sm border-white"
                          placeholder="e.g. Triogo, Frolio..."
                        />
                    </div>
                    <div className='p-2'>
                        <button type='submit'><SearchIcon className="h-10 w-8 text-emerald-500"/></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
