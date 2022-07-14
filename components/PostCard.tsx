import React,{useEffect, useRef, useState} from 'react';
import { Video } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

interface IProps {

    post : Video
    
}




const PostCard = ({post}:IProps) => {

    const [isHover,setIsHover] = useState(false);
    const [playing,setPlaying] = useState(false);
    const [isMuted,setIsMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {

        if(playing){

            videoRef?.current?.pause();
            setPlaying(false);

        }else{

             videoRef?.current?.play();
 
            setPlaying(true);


        }

    }

    
    useEffect(() => {

        if(videoRef?.current){

            videoRef.current.muted = isMuted

        }


    },[isMuted])

    return (

        <div className='flex flex-col border-b-2 
        border-gray-200 pb-6'>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer fonmt-semibold rounded'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/details/${post._id}`}>
                            <>
                            <Image width={62} height={62} className='rounded-full shadow-lg' src={post.postedBy.image} alt='profile photo' layout='responsive'/>
                            </>
                        </Link>
                    </div>
                    <div>
                    <Link href={`/details/${post._id}`}>
                        <div  className='flex itesm-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.username}<GoVerified className='text-blue-400 text-md'/>   </p>
                            <p className='font-medium text-sm capitalize text-gray-500 hidden md:block'>{post.postedBy.username}</p>
                        </div>
                    </Link>
                 </div>
                </div>
            </div>

            <div onMouseEnter={() => {setIsHover(true)}} onMouseOut={() => {setIsHover(false)}} className='lg:ml-20 flex gap-4 relative'>
                <div  className='rounded-3xl'>
                    <Link href='/'>
                        <video onClick={onVideoPress} ref={videoRef} loop className="lg:w-[800px] h-[300px] md:h-[400px] lg:h-[530px] md:w-[500px] w-[300px] rounded-2xl cursor-pointer bg-gray-100 m-5" src={post?.video?.asset?.url}></video>
                    </Link>
                   
                        <div className='absolute bottom-8 lg:bottom-6 cursor-pointer left-8 md:left-8 lg:left:0 flex gap-10 md:justify-between lg:justify-between  w-[57%]'>
                            {playing? (<button onClick={onVideoPress} className='text-black text-2xl lg:text-4xl'><BsFillPauseFill/></button>):
                            (<button onClick={onVideoPress}  className='text-black text-2xl lg:text-4xl'><BsFillPlayFill/></button>)}
                             {isMuted? (<button onClick={() => setIsMuted(false)} className='text-black text-2xl lg:text-4xl'><HiVolumeOff/></button>):
                            (<button onClick={() => setIsMuted(true)} className='text-black text-2xl lg:text-4xl'><HiVolumeUp/></button>)}
                        </div>
            
                </div>
            </div>

        </div>
    )
}

export default PostCard