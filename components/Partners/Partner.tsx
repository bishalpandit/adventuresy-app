import React from 'react'
import Image from 'next/image'

const Partner = ({imgURL} : { imgURL : any }) => {
    return (
        <div className='relative h-[100px] w-[210px]'>
            <Image src={`/images/partners/${imgURL}`} layout='fill' objectFit='contain' alt='partner-logo'/>
        </div>
    )
}

export default Partner
