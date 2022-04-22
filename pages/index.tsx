import type { NextPage } from 'next'
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



const Home = ({ recent, popular, trending }: any) => {

  return (
    <div className=''>
      <Head>
        <title>Adventuresy</title>
        <meta name="description" content="Go on thrilling adventure activites and sports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Hero />
      <Category />
      <CarouselSlider />
      <AdventureCollection recent={recent} popular={popular} trending={trending} />
      <Partners />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const baseURL = 'https://adventuresy-apis.azurewebsites.net';

  let endpoints = [
    `${baseURL}/api/adventures?ctype=recent`,
    `${baseURL}/api/adventures?ctype=popular`,
    `${baseURL}/api/adventures?ctype=trending`
  ];

  const [recent, popular, trending] = await axios.all(endpoints
    .map((endpoint) => axios.get(endpoint)));

  return ({
    props: {
      recent: recent.data,
      popular: popular.data,
      trending: trending.data,
    }
  });
}

export default Home;