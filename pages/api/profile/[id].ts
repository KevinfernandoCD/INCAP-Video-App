// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {client} from '../../../utils/sanityClient';
import { singleUserQuery,userCreatedPostsQuery,userLikedPostsQuery} from '../../../utils/queries';


export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    if(req.method == 'GET') {

        const {id}  = req.query;

        const query  = singleUserQuery(id);
        const useVedioQuery = userCreatedPostsQuery(id);
        const userLikedVideos = userLikedPostsQuery(id);

        const user = await client.fetch(query);
        const userVideos = await client.fetch(useVedioQuery);
        const userLikedVideo = await client.fetch(userLikedVideos);

        res.status(200).json({user: user[0],userVideos,userLikedVideo})

    }

}
