import axios from 'axios';
import type { NextPage } from 'next';
import NoResults from '../components/Noresults';
import PostCard from '../components/PostCard';
import {Video} from  '../types';

interface IProps{

  posts : Video[]

}

//THIS IS HOW YOU PASS IN TH PROP AND THE PROPS TYPE IN TYPESCRIPT ITS A MUST

const Home = ({posts}:IProps) => {

  console.log(posts)


  return (

    <div className='flex flex-col gap-10 videos h-full'>
      {posts.length ? (
        posts.map((post:Video) => (
          <PostCard post={post} key={post._id}/>
        ))
      ):(
        <NoResults text={'No Posts Available'}/>
      )}
    </div>

  )
}

export const getServerSideProps = async ({query:{topic}}:{query:{topic:string}}) => {
   
  let res = null

  if(!topic){

     res = await axios.get('http://localhost:3000/api/post');

  }else{

     res = await axios.get(`http://localhost:3000/api/discover/${topic}`);

  }

  return {
    
    props:{

      posts:res.data

    }

  }

}

export default Home
