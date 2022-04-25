import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"
import AdventureCard from './AdventureCard';



const AdventureSlider = ({ collection }: { collection: any }) => {
    
    return (
        <div className='w-full mx-auto'>
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
                        "spaceBetween": 180
                    },
                    "1024": {
                        "slidesPerView": 3,
                        "spaceBetween": 80
                    }
                }}
                freeMode={true}
            >
                { 
                    collection?.map((adventure: any, idx: number) => (
                        <SwiperSlide key={idx}>
                            <AdventureCard key={idx} adventure={adventure} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default AdventureSlider
