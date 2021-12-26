import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AdventureCollection from '../components/Adventure/AdventureCollection'
import CarouselSlider from '../components/Carousel/CarouselSlider'
import Category from '../components/Category/Category'
import Hero from '../components/Hero/Hero'
import NavBar from '../components/Hero/NavBar'

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
      <AdventureCollection />
    </div>
  )
}

export default Home
