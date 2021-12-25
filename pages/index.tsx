import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CarouselSlider from '../components/CarouselSlider'
import Category from '../components/Category'
import Hero from '../components/Hero'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div className='min-h-screen '>
      <Head>
        <title>Adventuresy</title>
        <meta name="description" content="Go on thrilling adventure activites and sports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NavBar />
      <Hero />
      <Category />
      <CarouselSlider />
    </div>
  )
}

export default Home
