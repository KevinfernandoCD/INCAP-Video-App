import create from 'zustand';
import {persist} from 'zustand/middleware';
import axios from 'axios';

const authStore = (set:any) => ({

    userProfile:null,
    allUsers:[],
    addUser:(user:any) => set({userProfile:user}),
    logoutUser:() => set({userProfile:null}),

    fetchAllUsers : async() => {

        const response = await axios.get('http://localhost:3000/api/users')

        set({allUsers:response.data})

    }

})


const userAuthStore = create(

    persist(authStore,{
        name:'auth'
    })
)

export default userAuthStore;
