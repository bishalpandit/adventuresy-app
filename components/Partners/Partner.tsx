import React from 'react'
import Image from 'next/image'

const Partner = ({imgURL} : { imgURL : any }) => {
    return (
        <div className='relative  h-[60px] w-[150px] md:h-[100px] md:w-[210px]'>
            <Image src={`/images/partners/${imgURL}`} layout='fill' objectFit='cover' alt='partner-logo'/>
        </div>
    )
}

export default Partner
