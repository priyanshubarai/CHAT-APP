import {create} from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"
import useAuthStore from "./useAuthStore"

const useChatStore = create( (set,get) => ({
    messages : [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    
    getUsers: async()=>{
        set({isUsersLoading : true})
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal server error")
        }finally{
            set({isUsersLoading: false})
        }
    },
    
    getMessages: async(userId)=>{
        set({isMessagesLoading : true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal server error")
        }finally{
            set({isMessagesLoading: false})
        }
    },
    sentMessage: async(messageData)=>{
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            // Don't add to messages here - let socket.io handle it for real-time updates
            console.log("Message sent successfully:", res.data);
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    addMessage: (newMessage) => {
        const {messages} = get();
        // Check if message already exists to avoid duplicates
        const messageExists = messages.some(msg => msg._id === newMessage._id);
        if (!messageExists) {
            set({messages: [...messages, newMessage]});
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser}), 

}));

export default useChatStore;