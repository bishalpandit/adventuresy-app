import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"
import AdventureCard from './AdventureCard';

const AdventureSlider = ({ cardsData } : { cardsData: any }) => {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, FreeMode]}
                breakpoints={{
                    "640": {
                        "slidesPerView": 2,
                        "spaceBetween": 80
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
                spaceBetween={100}
                slidesPerView={2}
                freeMode={true}
            >
                { //@ts-ignore
                    cardsData.map((card) => (
                        <SwiperSlide key={card.id}>
                            <AdventureCard imgURL={card.URL} />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default AdventureSlider
