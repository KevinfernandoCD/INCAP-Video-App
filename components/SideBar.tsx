import {useState} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import Discover from './Discover';
import SuggestedAccounsts from './SuggestedAccounsts';
import Footer from './Footer';



const SideBar = () => {

    const [showSideBar,setShowSideBar] = useState(true);

    const [userProfile,setUserProfile] = useState(false);

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 cursor-pointer justify-center xl:justify-start font-semibold rounded'
    
    return (

        <div>
            <div onClick={() => setShowSideBar(!showSideBar)} className='block xl:hidden m-2 ml-4 mt-3 text-xl cursor-pointer'>
            {showSideBar ? <ImCancelCircle/> : <AiOutlineMenu/>}
            </div>
            {showSideBar && (
            <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                   <Link href='/'>
                    <div className={normalLink}>
                        <p className='text-2xl'><AiFillHome/></p>
                        <span className='text-base hidden xl:block'>For You</span>
                    </div>
                   </Link>
                </div>
                 {!userProfile && (
                 <div className='px-2 py-4 hidden xl:block'>
                    <p className='text-gray-400 text-sm'>Login to access all features</p>
                    <div className='pr-4'>
                        <GoogleLogin
                        clientId=''
                        render={(renderProps) => (
                        <button className='bg-white text-sm border-black text-black font-semibold cursor-pointer px-2 py-1 rounded-md outline-none w-full mt-3 border-[1px] hover:bg-red-500 hover:text-white transition-all duration-[0.4s]' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            Login
                        </button>
                        )}
                       onSuccess={() => {}} onFailure={() => {}} cookiePolicy='single_host_origin'/> 
                    </div>
                </div>
                )} 
                <Discover/>
                <SuggestedAccounsts/>
                <Footer/>
            </div>
            )}
        </div>
    )
}

export default SideBar