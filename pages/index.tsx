import { useEffect, useState } from 'react'
import Head from 'next/head'
import AdventureCollection from '../components/Adventure/AdventureCollection'
import CarouselSlider from '../components/Carousel/CarouselSlider'
import Category from '../components/Category/Category'
import Hero from '../components/Hero/Hero'
import NavBar from '../components/Layout/NavBar'
import Partners from '../components/Partners/Partners'
import axios from 'axios'
import baseURL from '../utils/baseURL'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { collection, authState } from '../store'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

let endpoints = [
  `${baseURL}/api/adventures?ctype=recent`,
  `${baseURL}/api/adventures?ctype=popular`,
  `${baseURL}/api/adventures?ctype=trending`
];

const Home = () => {
  const setCollection = useSetRecoilState(collection);
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get(`${baseURL}/api/auth/user`, { withCredentials: true })
        .then(res => {
          const auth = res.data;
          console.log(auth);

          if (auth.status == true) {
            setAuth({
              isAuthenticated: true,
              authUser: auth.user
            })
            fetchData();
            setLoading(false);
          } else {
            setAuth({
              isAuthenticated: false,
              authUser: null
            });
            router.push('/splash', undefined, { shallow: true });
          }
        })
    }

    const fetchData = async () => {

      await axios.all(endpoints
        .map((endpoint) => axios.get(endpoint, { withCredentials: true })))
        .then((values) => {

          setCollection((prev) => {
            return {
              ...prev,
              recent: values[0].data.data,
              popular: values[1].data.data,
              trending: values[2].data.data
            }
          });

        });
    }

    checkAuth();

  }, []);



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