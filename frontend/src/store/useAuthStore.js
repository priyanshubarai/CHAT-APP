import {create} from "zustand"
import axiosInstance from "../lib/axios"

const useAuthStore = create((set)=> ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        }catch(err){
            set({authUser: null})
            console.log("error in check auth: ",err)
        }finally{
            set({isCheckingAuth: false })
        }
    },

    signup: async(data) => {
      try {
        const res = await axiosInstance.post("/auth/signup")
        
      } catch (error) {
        
      }  
    },
}))

export default useAuthStore