import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName ] = useState('')
    const [password, setPassword ] = useState('')

    const handleLogin = async () => {
        const uri = 'http://localhost:3000/login?name=' + name + '&password=' + password
        console.log(uri)
        const res = await axios.get(uri)
        console.log(res)
        if (res.status === 200){
            const redirectUri = "/dashboard/" + res.data
            navigate(redirectUri)
        }
    }


    return (
        <div>
        <h2>Name: </h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <h2>Password: </h2>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value) }></input>
        <button onClick={handleLogin}> Login </button>
        </div>
    );
};

export default Login;
