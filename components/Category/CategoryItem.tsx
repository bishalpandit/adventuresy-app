import React from 'react'
import Image from 'next/image'
import axios from 'axios';
import apiUrl from '../../utils/apiUrl';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activitiesState, errorState } from '../../store';
import { useRouter } from 'next/router';

interface Category {
    title: string;
    img: string;
}

const CategoryItem = ({ category }: { category: Category }) => {
    const [activities, setActivities] = useRecoilState(activitiesState);
    const setError = useSetRecoilState(errorState);
    const router = useRouter();

    const handleClick = () => {
        axios
            .get(`${apiUrl}/api/adventures/category`, {
                params: {
                    category: category.title,
                }
            })
            .then((res) => {
                const data = res.data.data;
                console.log(data);
                
                setActivities(data);
                router.push('/activities');
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            })
    }

    return (
        <div onClick={handleClick} className='flex-col place-center md:justify-evenly animate'>
            <div className='z-10  md:h-20 md:w-20 h-24 w-24 relative rounded-3xl '>
                <Image src={`/images/category/${category.img}`} className='rounded-2xl' layout='fill' objectFit='cover' alt='category' />
            </div>
            <p className='font-montserrat p-2'>{category.title}</p>
        </div>
    )
}

export default CategoryItem
