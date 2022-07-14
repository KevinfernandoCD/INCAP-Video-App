import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';


const Discover = () => {

    const [active,setActive] = React.useState('')

    const activeTopic = "xl:border-2 bg-red-500 hover:bg-red-500 xl:border-gray-300 px-3 py-2 rounded-full xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-white"

    const topicStyle = "xl:border-2 hover:bg-red-500 xl:border-gray-300 px-3 py-2 rounded-full xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

    return (

        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>

            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular Topics
            </p>

            <div className='flex gap-3 flex-wrap'>
                {topics.map(topic => (
                    <Link key={topic.name} href={`/?topic=${topic.name}`}>
                        <div onClick={()=> setActive(topic.name)} className={topic.name == active?activeTopic:topicStyle}><span className='font-bold text-2xl xl:text-md  capitalize'>{topic.icon}</span><span className='font-semibold text-sm hidden xl:block'>{topic.name}</span></div>
                    </Link>
                ))}
            </div>

        </div>

    )

}


export default Discover