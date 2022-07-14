import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import NoResults from '../../components/Noresults';
import { IUser, Video } from '../../types';
import PostCard from '../../components/PostCard';


interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideo: Video[];
  };
}




const Profile = ({data}:IProps) => {

  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { user, userVideos, userLikedVideo } = data;
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
   
  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideo);
      }
    };
     fetchVideos();
  }, [showUserVideos]);

    return (
        <div className='w-full'>
             <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                  <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={data?.user?.image}
            alt='user-profile'
          />
          </div>
          <div>
             <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
               <span>{data?.user?.username.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
             </div>
              <p className='text-sm font-medium'> {data?.user?.username}</p>
          </div>
          </div>
           <div>
             <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
              <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
             </div>
               <div className='flex gap-6 flex-wrap md:justify-start'>
                {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <PostCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
               </div>
           </div>
      </div>
    )
}

export const getServerSideProps = async({params:{id}}:{params:{id:string}}) => {

    const res = await axios.get(`http://localhost:3000/api/profile/${id}`)

    return {

        props:{

        data:res.data

      }

    }
}

export default Profile