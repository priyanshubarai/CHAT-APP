import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes , Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import useAuthStore from './store/useAuthStore'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"


const App = () => {

  const {checkAuth,authUser,isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[]);
  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>

  ) 
  

  return (
    <div>
      
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/>: <LogInPage/>} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUpPage/>} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LogInPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/> } />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
