import Image from 'next/image';
import React from 'react'
import NavBar from '../components/Layout/NavBar';
import Rating from '../components/Rating';

function Adventure() {
  return (
    <div>
      <NavBar />
      <div id="top" className="flex flex-col items-center md:flex-row md:justify-around mt-20 w-[90%] mx-auto">
        <div className="md:basis-3/5 flex flex-col space-y-6 items-center md:items-start">
          <h2 className="self-start font-montserrat font-semibold w-[60%] text-3xl tracking-wider leading-normal">Kayak With Crocodiles in South Africa</h2>
          <div className="flex space-x-8">
            <Rating />
            <div>
              <span className="bg-white text-black/90 text-sm font-medium mr-2 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">Water</span>
              <span className="bg-white text-black/90 text-sm font-medium mr-2 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">Kayak</span>
            </div>
          </div>
          <div className="h-56 sm:h-72 md:h-80 w-[96%] md:w-[80%] relative">
            <Image src='/images/carousel-cards/kayak.jpg' className='rounded-3xl' layout='fill' objectFit='cover' alt='adventure-img' />
          </div>
        </div>
        <div className="md:basis-2/5 w-[96%]">
          <div className='p-6 flex flex-col space-y-8 bg-dark-800 rounded-2xl max-w-[100%] md:max-w-[75%]  mt-8 mx-auto'>
            <div id="price">
              <h5 className="font-poppins font-medium">Price Starting</h5>
              <h2 className="ml-3 mt-1 font-roboto text-3xl">Rs 24, 000</h2>
            </div>
            <div id="partners" className='flex items-center space-x-3'>
              <div className="flex -space-x-6">
                <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/braver.svg" height={40} width={40} alt="avatar" />
                <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/braver.svg" height={40} width={40} alt="avatar" />
                <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/braver.svg" height={40} width={40} alt="avatar" />
              </div>
              <p className="text-xs font-medium font-montserrat">5+ Offering Partners</p>
            </div>
            <div id="select">
              <h2 className="font-poppins font-medium text-lg mb-2">Select Offering Partner</h2>
              <select id="countries" className="bg-[#222222] border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose from list</option>
                <option value="US">Braver</option>
                <option value="CA">OutBound Adventures</option>
              </select>
            </div>
            <div id="current-price" className="flex items-center justify-around">
              <h4 className="font-montserrat font-medium text-lg">Current Price</h4>
              <h2 className="text-sky-400 text-2xl font-bold">30, 000</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adventure;