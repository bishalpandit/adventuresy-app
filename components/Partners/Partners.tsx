import React from 'react'
import Partner from './Partner'

const PartnersData = [
    {
        URL: 'alta-advent.svg',
        key: 0,
    },
    {
        URL: 'braver.svg',
        key: 1,
    },
    {
        URL: 'schwager.svg',
        key: 3,
    },
]

const Partners = () => {
    return (
        <div className='flex flex-col ml-4 md:ml-14 my-20 gap-y-6'>
            <h2 className='title '>Top Partners</h2>
            <div className='flex flex-col sm:flex-row items-center space-y-16 justify-evenly -ml-16'>
                {PartnersData.map(item => (
                    <Partner key={item.key} imgURL={item.URL} />
                ))}
            </div>

        </div>
    )
}

export default Partners
