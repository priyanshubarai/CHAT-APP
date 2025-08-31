import {create} from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"

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
        set({isSigningUp: true});
      try {
        const res = await axiosInstance.post("/auth/signup",data);
        set({authUser: res.data});
        toast.success("Account created successfully!");
      } catch (error) {
        console.log("error in signing up :",error);
        toast.error(error.response.data.message);        
      } finally{
        set({isSigningUp: false});
      }
    },

    logout: async() =>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logged out successfully")
        }catch(err){
            toast.error(err.response?.data?.message || "Logout Failed");
        }
    },
}))

export default useAuthStore