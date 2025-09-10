import {create} from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:7000";

const useAuthStore = create((set,get)=> ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()
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
        console.log("successfull login!")
        get().connectSocket()
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
            get().disConnectSocket()
        }catch(err){
            toast.error(err.response?.data?.message || "Logout Failed");
        }
    },

    login: async(data) =>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser: res.data})
            toast.success("Logged in Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed")
        }finally{
            set({isLoggingIn: false})
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error in update profile :",error);
            toast.error(error.response?.data?.message || "Upload Failed!")           
        }finally{
            set({isUpdatingProfile: false})
        }

    },

    connectSocket : ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query: {
                userId : authUser._id,
            },
        })
        socket.connect()
        set({socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers: userIds})
        })
        
        // Listen for new messages
        socket.on("newMessage", (newMessage) => {
            // Import useChatStore dynamically to avoid circular dependency
            import("./useChatStore").then(({ default: useChatStore }) => {
                const { addMessage, selectedUser } = useChatStore.getState();
                // Only add message if it's for the currently selected user
                if (selectedUser && 
                    (newMessage.senderId === selectedUser._id || 
                     newMessage.receiverId === selectedUser._id)) {
                    addMessage(newMessage);
                }
            });
        });
    },
    disConnectSocket : ()=>{
        if(get().socket?.connected){
            get().socket.disconnect()
            set({socket : null})
        }
    },

    
}))

export default useAuthStore