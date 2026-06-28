import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import axios from 'axios';

const signUp = () => {
  let navigate=useNavigate()
  let [show, setShow]=useState(false)
  const [userName, setUserName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')


  const handleSignUp=async (e)=>{
    e.preventDefault()
    try{
      //we will send the data to the backend using axios.post
      //Explain axios.
      //Axios is a promise-based HTTP client for the browser and Node.js.
        //It is isomorphic (can run on the server and in the browser).
        //It supports the Promise API.
        //It can be used in the browser with a XMLHttpRequest or with Node.js with the native http interface.
        //It can be used in the browser with a XMLHttpRequest or with Node.js with the native http interface.
        //it is a library for making HTTP requests from the browser.
        //it is a library for making HTTP requests from the browser.
      //if we will not use withCredentials:true then we will not be able to access the cookie in the browser
      let result=await axios.post(`${serverUrl}/api/auth/signup`, {userName, email, password},{withCredentials:true})
      console.log(result)
    }catch(error){
      console.log(error)
    }
  }



  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
        <div className='w-full h-[200px] bg-[#2c7fff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to  <span className='text-white'>MeChat</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}>
          <input type="text" placeholder='username'className='w-[90%] h-[50px] shadow-gray-400 shadow-lg outline-none border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px] bg-white text-gray-700 text-[19px]' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
          <input type="email" placeholder='email'className='w-[90%] h-[50px] shadow-gray-400 shadow-lg outline-none border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px] bg-white text-gray-700 text-[19px]' onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-400 shadow-lg relative'>
            <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full  outline-none  px-[20px] py-[10px] bg-white text-gray-700 text-[19px]' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            {/* <FaEye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' /> */}
            <span onClick={()=>setShow(prev=>!prev)} className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] text-semibold'>{`${show?"hidden":"show"}`}</span>
          </div>
          <button type='submit' className='w-[90%] h-[20%] outline-none border-2 shadow-gray-400 rounded-lg p-[10px] bg-[#2c7fff] text-white font font-semibold shadow-lg hover:shadow-inner'>Sign Up</button>
          <p className='cursor-pointer' onClick={()=>navigate('/login')}>Already have an account? <span className='text-[#20c7ff] font-semibold' to='/login'>Login</span></p>
        </form>

      </div>
      
    </div>
  )
}

export default signUp;
