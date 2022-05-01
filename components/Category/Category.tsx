import React from 'react'
import CategoryItem from './CategoryItem'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import "swiper/css/bundle"

const Category: () => JSX.Element = () => {
    const categories = [
        {
            title: "Scuba Diving",
            img: "scuba diving.svg"
        },
        {
            title: "Surfing",
            img: "surfing.jpg"
        },
        {
            title: "Skiing",
            img: "skiing.jpg"
        },
        {
            title: "Camping",
            img: "camping.jpg"
        }
    ];

    return (
        <div className='bg-dark-800 max-w-[85%] md:max-w-[75%] mx-auto min-h-[200px] md:h-[200px] mt-16 rounded-3xl'>
            <div className='flex flex-row justify-between title mb-2'>
                <h2>Category</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
            <div className='w-[85%] mx-auto '>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, FreeMode]}
                    breakpoints={{
                        "320": {
                            "slidesPerView": 2,
                            "spaceBetween": 5
                        },
                        "540": {
                            "slidesPerView": 2,
                            "spaceBetween": 10
                        },
                        "640": {
                            "slidesPerView": 2,
                            "spaceBetween": 10
                        },
                        "768": {
                            "slidesPerView": 3,
                            "spaceBetween": 10
                        },
                        "1024": {
                            "slidesPerView": 3,
                            "spaceBetween": 10
                        }
                    }}
                    freeMode={true}
                >
                    {
                        categories.map((category, idx) => (
                            <SwiperSlide key={idx}>
                                <CategoryItem key={idx} category={category} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Category
