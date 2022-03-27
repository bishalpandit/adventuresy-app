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


const Home = (props: any) => {
  
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
      <AdventureCollection recent={props.recentAdventures}  />
      <Partners />
    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  const baseURL = 'http://adventuresy.southeastasia.azurecontainer.io';

  const { data: { data: recentAdventures} } = await axios.get(`${baseURL}/api/adventures?ctype=recent`)
  
  return ({
    props: {
      recentAdventures,
    }
  })
}

export default Home;