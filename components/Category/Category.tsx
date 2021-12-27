import React from 'react'
import CategoryItem from './CategoryItem'

const Category: () => JSX.Element = () => {
    return (
        <div className='bg-dark-800 max-w-[60%] md:max-w-[75%] mx-auto min-h-[200px] md:h-[200px] mt-16 rounded-3xl'>
            <div className='explore-title title mb-2'>
                <h2>Category</h2>
            </div>
            <div className='flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-4'> 
                <CategoryItem name='scuba diving.svg' />
                <CategoryItem name='surfing.jpg' />
                <CategoryItem name='skiing.jpg' />
                <CategoryItem name='camping.jpg' />
            </div>
        </div>
    )
}

export default Category
