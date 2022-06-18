import { CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import PartnersList from '../../components/Menus/PartnersList';
import NavBar from '../../components/Layout/NavBar';
import Rating from '../../components/Rating';
import baseURL from '../../utils/baseURL';
import imgBaseURL from '../../utils/imgBaseURL';
import { bookingState, IBooking } from '../../store/index'
import { useRecoilState } from 'recoil'
import DurationList from '../../components/Menus/DurationList';
import PersonList from '../../components/Menus/PersonList';
import dynamic from 'next/dynamic';
import { useAuth } from '../../hooks/useAuth';
const AdventureMap = dynamic(
    () => import('../../components/Maps/AdventureMap'),
    { ssr: false }
)


function Adventure() {
    const [adventure, setAdventure] = useState<any>({
        adventure: {},
        partners: [],
        rating: {},
        minPrice: 0
    });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useRecoilState<any>(bookingState);

    useEffect(() => {
        const calcMinPrice = (partners: []) => {
            let mini = 1000000000;
            partners
                .forEach((partner: any) => {
                    mini = (partner.price < mini) ?
                        partner.price :
                        mini;
                });

            return mini;
        }

        const fetchAdventure = async () => {
            await axios
                .get(`${baseURL}/api/adventures/details/${router.query.id}`, {
                    withCredentials: true
                })
                .then((res) => {
                    const partner = res.data.data.partners[0];
                    setAdventure({
                        ...res.data.data,
                        minPrice: calcMinPrice(res.data.data.partners)
                    });
                    setBooking((booking: any) => {
                        return {
                            ...booking,
                            partner: partner,
                            startDate: (partner.avail_dates === null) ? null : new Date(partner.avail_dates[0]),
                            price: partner.price,
                            hasDates: (partner.avail_dates === null) ? false : true,
                        }
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        };
        
        (async () => {
            await fetchAdventure();
        })();
    }, []);



    return (

        loading ?
            (
                <div className={'flex flex-col h-screen justify-center items-center '} >
                    <CircularProgress thickness={4} className='!text-white' size={60} />
                </div>
            ) :
            (
                <div>
                    <NavBar />
                    <div id="title-and-pricing" className="flex flex-col space-y-6 items-center md:flex-row md:justify-around mt-20 w-[90%] mx-auto">
                        <div className="md:basis-3/5 flex flex-col space-y-6 items-center md:items-start">
                            <h2 className="self-start font-montserrat font-semibold w-[60%] text-3xl tracking-wider leading-normal">{adventure.adventure.title}</h2>
                            <div className="flex space-x-8">
                                <Rating rating={adventure.rating} />
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        adventure.adventure.tags ?
                                            adventure.adventure.tags
                                                .map((tag: string, idx: number) =>
                                                    <span key={idx} className="bg-white text-black/90 text-sm font-medium mr-2 px-3 py-1 rounded-full">{tag.charAt(0).toUpperCase() + tag.substr(1)}</span>
                                                )
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div className="h-56 sm:h-72 md:h-80 w-[96%] md:w-[80%] relative">
                                <Image src={`${imgBaseURL}/${adventure.adventure.img_link}`} className='rounded-3xl' layout='fill' objectFit='cover' alt='adventure-img' />
                            </div>
                        </div>
                        <div className="md:basis-2/5 w-[96%]">
                            <div className='p-6 flex flex-col space-y-8 bg-dark-800 rounded-2xl max-w-[100%] md:max-w-[75%]  mt-8 mx-auto'>
                                <div id="price">
                                    <h5 className="font-poppins font-medium">Price Starting</h5>
                                    <h2 className="ml-3 mt-1 font-roboto text-3xl">Rs {adventure.minPrice}</h2>
                                </div>
                                <div id="partners" className='flex items-center space-x-3'>
                                    <div className="flex -space-x-6">
                                        <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/braver.svg" height={40} width={40} alt="avatar" />
                                        <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/alta-advent.svg" height={40} width={40} alt="avatar" />
                                        <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/images/partners/braver.svg" height={40} width={40} alt="avatar" />
                                    </div>
                                    <p className="text-sm font-medium font-montserrat">{adventure.partners.length} Offering Partners</p>
                                </div>
                                <div id="select">
                                    <h2 className="font-poppins font-medium text-lg mb-2">Select Offering Partner</h2>
                                    <PartnersList partners={adventure.partners} />
                                </div>
                                <div id="current-price" className="flex items-center justify-around">
                                    <h4 className="font-montserrat font-medium text-lg">Current Price</h4>
                                    <h2 className="text-sky-400 text-2xl tracking-wider font-bold">Rs {booking.price}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="details-and-booking" className="flex flex-col items-center md:flex-row md:justify-around mt-16 w-[90%] mx-auto">
                        <div className="md:basis-3/5 flex flex-col space-y-6 items-center md:items-start ">
                            <h2 className="self-start font-montserrat font-semibold w-[60%] text-3xl tracking-wider leading-normal">Description</h2>
                            <p className='font-roboto text-sm w-[95%] text-justify'>{adventure.adventure.summary}</p>
                            <h2 className="self-start font-montserrat font-semibold w-[60%] text-2xl tracking-wider leading-normal">Partner Facilities</h2>
                            <div className='flex gap-4 flex-wrap '>
                                <span className="bg-white text-black/90 text-sm font-medium mr-2 px-4 py-2 rounded-lg">Transportation</span>
                                <span className="bg-white text-black/90 text-sm font-medium mr-2 px-4 py-2 rounded-lg">Insurance</span>
                                <span className="bg-white text-black/90 text-sm font-medium mr-2 px-4 py-2 rounded-lg">Food</span>
                                <span className="bg-white text-black/90 text-sm font-medium mr-2 px-4 py-2 rounded-lg">Lodging</span>
                            </div>
                        </div>
                        <div className="md:basis-2/5 w-[96%]">
                            <div className='p-6 flex flex-col space-y-8 bg-dark-800 rounded-2xl max-w-[100%] md:max-w-[75%]  mt-8 mx-auto'>
                                <div id="select-start-date">
                                    <h2 className="font-poppins font-medium text-lg mb-2">Select From Available Dates</h2>
                                    <DatePicker
                                        selected={booking.startDate}
                                        onChange={(date: Date) =>
                                            setBooking((booking: IBooking) => {
                                                return {
                                                    ...booking,
                                                    startDate: date
                                                };
                                            })}
                                        includeDates={(!booking.hasDates) ? [] : booking.partner.avail_dates.map((date: any) => new Date(date))}
                                        disabled={!booking.hasDates}
                                        withPortal
                                        className={`${booking.hasDates ? 'bg-black/70' : 'bg-gray-800'} !w-[80%] rounded-xl`}
                                        calendarClassName='!bg-gray-900 !text-green-500'
                                        placeholderText='No Dates Available'
                                    />
                                </div>
                                <div id="select-duration">
                                    <h2 className=" font-poppins font-medium text-lg">Select Duration</h2>
                                    <DurationList />
                                </div>
                                <div id="select-persons">
                                    <h2 className=" font-poppins font-medium text-lg">Select Persons</h2>
                                    <PersonList />
                                </div>
                                <button disabled={!booking.hasDates} className={`${booking.hasDates ? 'bg-green-400' : 'bg-green-200'} text-black/90 text- font-medium px-4 py-2 rounded-lg animate`}>Book Now</button>
                            </div>
                        </div>
                    </div>

                    <div id="location-map" className="flex flex-col space-y-8 mb-12 items-center justify-start w-[90%] mx-auto">
                        <h2 className="self-start font-montserrat font-semibold w-[60%] text-3xl tracking-wider leading-normal mt-6 md:mt-0">Location on Map</h2>
                        <AdventureMap location={Object.values(adventure.adventure.location)} address={adventure.adventure.address} />
                    </div>
                </div >
            )

    )
}

export default Adventure;