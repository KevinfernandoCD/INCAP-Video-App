import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const  MyApp = ({ Component, pageProps }: AppProps) => {

  const[isSSR,setIsSSR] = useState(true);

  useEffect(()=>{

    setIsSSR(false)

  },[]);

  //CHECKING FOR SERVER SIDE RENDER
  if(isSSR) return null;

  return (
  <GoogleOAuthProvider clientId="852435423749-m6n0obl95ogf037srspcbfvdbp5c05oa.apps.googleusercontent.com">
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
       <NavBar/>
    <div className='flex gap-6 md:gap-20'>
      <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
        <SideBar/>  
      </div>
      <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
      <Component {...pageProps} />
      </div>
    </div>
  </div>
  </GoogleOAuthProvider>
  
  )

}

export default MyApp
