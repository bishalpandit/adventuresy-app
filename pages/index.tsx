import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AdventureCollection from '../components/Adventure/AdventureCollection'
import CarouselSlider from '../components/Carousel/CarouselSlider'
import Category from '../components/Category/Category'
import Hero from '../components/Hero/Hero'
import NavBar from '../components/Layout/NavBar'
import Partners from '../components/Partners/Partners'
import axios from 'axios'
import baseURL from '../utils/baseURL'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { collection, auth } from '../store'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

let endpoints = [
  `${baseURL}/api/adventures?ctype=recent`,
  `${baseURL}/api/adventures?ctype=popular`,
  `${baseURL}/api/adventures?ctype=trending`
];

const Home = () => {
  const setCollection = useSetRecoilState(collection);
  const accessToken = useRecoilValue(auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!accessToken) {
      router.push('/splash', undefined, { shallow: true });
    }
    else {
      const fetchData = async () => {
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }

        await axios.all(endpoints
          .map((endpoint) => axios.get(endpoint, config)))
          .then((values) => {
            console.log(values);

            setCollection((prev) => {
              return {
                ...prev,
                recent: values[0].data.data,
                popular: values[1].data.data,
                trending: values[2].data.data
              }
            });

            setLoading(false);
          });
      }

      fetchData();
    }

  }, [setCollection, router, accessToken]);

  return (
    <div >
      <Head>
        <title>Adventuresy</title>
        <meta name="description" content="Go on thrilling adventure activites and sports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        loading ?
          <div className={'flex flex-col h-screen justify-center items-center '}>
            <CircularProgress thickness={4.5} className='!text-white' size={60} />
          </div> :
          (
            <div>
              <NavBar />
              <Hero />
              <Category />
              <CarouselSlider />
              <AdventureCollection />
              <Partners />
            </div>
          )
      }
    </div>
  )
}

export default Home;