import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import baseURL from '../utils/baseURL';
import { useSetRecoilState } from 'recoil';
import { collection, authState } from '../store';
import { useRouter } from 'next/router';
import AdventureCollection from '../components/Adventure/AdventureCollection';
import CarouselSlider from '../components/Carousel/CarouselSlider';
import Category from '../components/Category/Category';
import Hero from '../components/Hero/Hero';
import NavBar from '../components/Layout/NavBar';
import Partners from '../components/Partners/Partners';
import { CircularProgress } from '@mui/material';


let endpoint = `${baseURL}/api/adventures?collections=trending&collections=popular&collections=recent&limit=5`;

const Home = () => {
  const setCollection = useSetRecoilState(collection);
  const setAuth = useSetRecoilState(authState);
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
      await axios.get(endpoint, { withCredentials: true })
        .then((res) => {
          const collections = res.data.data;
          setCollection(collections);
          setLoading(false);
        })
    }

    checkAuth();

  }, [router, setAuth, setCollection]);



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