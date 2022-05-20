import React from 'react'
import CarouselCard from './CarouselCard'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"

const CarouselContent = [ 
    {
        url: 'scuba-diving.jpg',
        title: 'In the Water',
        content: 'Swim with beautiful creatures',
        key: 0,
    },
    {
        url: 'snowboarding.jpg',
        title: 'On Land',
        content: 'Ski on the Snowy Hills',
        key: 1,
    },
    {
        url: 'skydiving.webp',
        title: 'In the Air',
        content: 'Sky dive over Palm Island',
        key: 2,
    },
    {
        url: 'kayak.jpg',
        title: 'In the Water',
        content: 'Go kayaking in the water',
        key: 3,
    },
    {
        url: 'paragliding.jpg',
        title: 'In the Air',
        content: 'Experience thrill while paragliding',
        key: 5,
    },
]

const CarouselSlider = () => {
    return (
        <div className='mt-20 w-[90%] md:w-4/5 mx-auto'>
            <h2 className='mb-4 title'>Discover</h2>
            <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, FreeMode]}
            breakpoints={{
                "320": {
                    "slidesPerView": 1,
                    "spaceBetween": 100
                },
                "540": {
                    "slidesPerView": 2,
                    "spaceBetween": 150
                },
                "640": {
                    "slidesPerView": 2,
                    "spaceBetween": 150
                },
                "768": {
                    "slidesPerView": 2,
                    "spaceBetween": 40
                },
                "1024": {
                    "slidesPerView": 2,
                    "spaceBetween": 60
                }
            }}
            
            freeMode={true}
            effect={'coverflow'}
            coverflowEffect={{"rotate": 30,
            "stretch": 0,
            "depth": 100,
            "modifier": 1,
            "slideShadows": true}}
        >
            {
                CarouselContent.map( content => (
                    <SwiperSlide key={content.key}>
                        <CarouselCard content={content} />
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
      </div>
    )
}

export default CarouselSlider
