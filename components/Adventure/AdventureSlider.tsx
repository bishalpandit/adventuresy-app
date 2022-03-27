import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"
import AdventureCard from './AdventureCard';



const AdventureSlider = ({ collection }: { collection: any }) => {
    //console.log(cardsData);
    
    return (
        <div className='w-full mx-auto'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, FreeMode]}
                breakpoints={{
                    "540": {
                        "slidesPerView": 2,
                        "spaceBetween": 80
                    },
                    "640": {
                        "slidesPerView": 2,
                        "spaceBetween": 60
                    },
                    "768": {
                        "slidesPerView": 3,
                        "spaceBetween": 80
                    },
                    "1024": {
                        "slidesPerView": 3,
                        "spaceBetween": 80
                    }
                }}
                spaceBetween={80}
                slidesPerView={1}
                freeMode={true}
            >
                { //@ts-ignore
                    collection.map((adventure, idx) => (
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
