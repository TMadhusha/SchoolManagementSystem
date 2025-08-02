import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/auth/login',{email,password});
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('token',res.data.role);

            if(res.data.role==='admin') {
                navigate('/admin');
            }else if(res.data.role==='principal'){
                navigate('/principal')
            }else{
                navigate('/teacher');
            }
        }catch(error){
            alert(error.response.data.message);
            console.log("Error Log in",error);
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold">Login</h2>
        <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  )
}
export default Login