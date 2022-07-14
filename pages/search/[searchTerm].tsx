import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import NoResults from '../../components/Noresults';
import { IUser, Video } from '../../types';
import PostCard from '../../components/PostCard';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useAuthStore from '../../store/authStore';

interface IProps {

    videos:Video[]
}



const SearchTerm = ({videos}:IProps) => {

  const [isAccounts, setIsAccounts] = useState(false);
  
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();
  
  const router = useRouter();

  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers?.filter((user: IUser) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    return (

    <div className='w-full'>
         <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
          <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
          Accounts
        </p>
         <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
       {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.username} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.username}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ):(
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
          {videos.length ? (
            videos.map((post: Video, idx: number) => (
              <PostCard post={post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
    )
}

export const getServerSideProps = async({params:{searchTerm}}:{params:{searchTerm:string}}) => {

    const res = await axios.get(`http://localhost:3000/api/search/${searchTerm}`)

    return {

        props:{

        videos:res.data

      }

    }
}

export default SearchTerm