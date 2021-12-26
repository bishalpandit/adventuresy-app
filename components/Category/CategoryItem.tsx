import React from 'react'
import Image from 'next/image'

const CategoryItem = ({ name } : { name: any} ) => {
    return (
        <div className='flex-col place-center md:justify-evenly animate'>
            <div className='z-10  md:h-20 md:w-20 h-24 w-24 relative rounded-3xl '>
                <Image src={`/images/category/${name}`} className='rounded-2xl' layout='fill' objectFit='cover' alt='category' />
            </div>
            <p className='font-montserrat p-2'>{ name[0].toUpperCase() + name.substr(1, name.length-5)}</p>
        </div>
    )
}

export default CategoryItem
