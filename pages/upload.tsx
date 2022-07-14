
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { client } from '../utils/sanityClient';
import { topics } from '../utils/constants';
import { SanityAssetDocument } from '@sanity/client';


const Upload = () => {

    const [isLoading,setIsLoading] = useState(false);
    const [videoAsset,setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType,setWrongFileType] = useState(false);
    const [caption,setCaption] = useState('');
    const [category,setCategory] = useState(topics[0].name);
    const [savePost,setSavePost] = useState(false);

    const {userProfile} :{userProfile:any} = useAuthStore();

    const router = useRouter();

    const uploadVideo = async(e:any) => {

        const selectedFIle = e.target.files[0];
        const fileTypes = ['video/mp4','video/webm','video/ogg'];

        if(fileTypes.includes(selectedFIle.type)) {

            setIsLoading(true)

            client.assets.upload('file',selectedFIle,{
                contentType:selectedFIle.type,
                filename:selectedFIle.name
            })

            .then((data) => {

                setVideoAsset(data);
                setIsLoading(false);
                setWrongFileType(false);
                
            })

        }else{

            setIsLoading(false);
            setWrongFileType(true);

        }

    }

    const handlePost = async(e:any) => {

        if(caption && videoAsset?._id && category){

            setSavePost(true);

            const document = {

                _type:'post',

                caption:caption,

                video:{

                    _type:'file',

                    asset:{

                        _type:'reference', 
                        
                        _ref:videoAsset?._id,  

                    }
                },

                userId:userProfile?._id,

                postedBy:{

                    _type:'postedBy',

                    _ref: userProfile?._id

                },

                topic:category

            }

            await axios.post('http://localhost:3000/api/post',document);

            router.push('/')

        }

    }

    return (

        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 justify-center'>
            <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] rounded-xl h-[460px]  cursor-pointer '>
                        {isLoading?(
                            <p className='text-xl text-gray-400'>Uploading...</p>
                        ):(
                            <div>
                                {videoAsset?(

                                    <div className='border  w-full h-[450px] '>

                                        <video loop controls className='rounded-xl h-full  bg-black' src={videoAsset.url}></video>

                                    </div>

                                ):(
                                    
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'> <FaCloudUploadAlt className='text-gray-300 text-6xl'/></p>   
                                                  <p className='text-sm font-semibold'>Select a video to upload</p>       
                                          </div>
                                          <p className='text-xs text-center mt-2 text-gray-400'>MP4,WEBm or ogg <br/> 720x1280 or higher <br/> upto 10 minutes  <br/> less than 2GB</p>
                                          <p className='bg-blue-500 text-center mt-10 rounded text-white font-medium p-2 w-52 outline-none '>Select File</p>
                                        </div>
                                        <input type='file' name='upload-file' className='hidden' onChange={uploadVideo}/>
                                    </label>

                                )}

                            </div>
                        )}
                        {wrongFileType && (
                            <>
                            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Error</p><br/>
                            <p className='text-sm text-red-500 text-center -mt-5'>Invalid file type Please check again</p> 
                            </>
                        )}
                    </div>
                 
                </div>
                   <div className='flex flex-col gap-3 pb-10 ml-10'>
                        <label className='text-md font-medium'>Caption</label>
                        <input className='rounded outline-none text-md border-2 h-[40px] md:w-[300px] w-[200px] border-gray-400' type='text' value={caption} onChange={(e) => {setCaption(e.target.value)}}/>
                      <label className='text-md font-medium'>Choose a category</label>
                      <select className='p-2 rounded border-2 border-gray-400 capitalize font-medium cursor-pointer' onChange={(e)=>{setCategory(e.target.value)}}>
                        {topics.map(topic => (

                            <option value={topic.name} className='outline-none capitalize cursor-pointer' key={topic.name}>

                                {topic.name}

                            </option>
                        ))}
                      </select>
                      <div className='flex gap-6 mt-10'>
                        <button className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none' type='button' onClick={() =>{}}>
                            Discard
                        </button>
                        <button onClick={handlePost} className='bg-blue-500 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none' type='button'>
                            Post
                        </button>
                      </div>
                    </div>
            </div>
        </div>
    )

}

export default Upload;