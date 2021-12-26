import React from 'react'
import CarouselCard from './CarouselCard'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"

const imgURLs = [ 
    {
        URL: 'scuba-diving.jpg',
        key: 0,
    },
    {
        URL: 'snowboarding.jpg',
        key: 1,
    },
    {
        URL: 'skydiving.webp',
        key: 2,
    },
    {
        URL: 'kayak.jpg',
        key: 3,
    },
    {
        URL: 'camping.jpg',
        key: 4,
    },
    {
        URL: 'paragliding.jpg',
        key: 5,
    },
]

const CarouselSlider = () => {
    return (
        <div className='mt-20 w-full md:w-4/5 mx-auto'>
            <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, FreeMode]}
            breakpoints={{
                "640": {
                  "slidesPerView": 2,
                  "spaceBetween": 10
                },
                "768": {
                  "slidesPerView": 2,
                  "spaceBetween": 40
                },
                "1024": {
                  "slidesPerView": 2,
                  "spaceBetween": 50
                }
              }}
            spaceBetween={60}
            slidesPerView={2}
            freeMode={true}
            effect={'coverflow'}
            coverflowEffect={{"rotate": 30,
            "stretch": 0,
            "depth": 100,
            "modifier": 1,
            "slideShadows": true}}
        >
            {
                imgURLs.map( cardImg => (
                    <SwiperSlide key={cardImg.key}>
                        <CarouselCard imgURL={cardImg.URL} />
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
      </div>
    )
}

export default CarouselSlider
