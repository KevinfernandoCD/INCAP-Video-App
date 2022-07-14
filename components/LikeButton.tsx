
import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import useAuthStore from '../store/authStore';

interface IProps {
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}


const  LikeButton = ({likes,flex,handleLike,handleDislike}:IProps) => {

  const[alreadyLiked,setAlreadyLiked] = useState(false);
  const {userProfile}:any = useAuthStore();

  console.log(alreadyLiked)

    const isLiked = () => {

      /*likes?.find((like:any) => {

        console.log('ran')

        if(like._ref == userProfile._id){

           setAlreadyLiked(true)
           console.log('yes')

        }else{

          setAlreadyLiked(false)
          console.log('no')

        }

      })*/

      const Liked = likes?.find((like:any) => like._ref == userProfile._id) 

      if(Liked){

        setAlreadyLiked(true)
   

      }else{

        setAlreadyLiked(false)
   

      }

    }

    useEffect(() => {

      isLiked()

    },[likes])

    return (

        <div className='flex gap-6'>
          <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
            {alreadyLiked ? ( 
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] ' onClick={handleDislike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
          </div>
        </div>

    )
}

export default LikeButton
