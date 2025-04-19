import './Login.css'
import React, { useState } from 'react';
import DogImage from '../assets/dogs.png'
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/Dogs'; 

function Login( { onLogin } ) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginApi(name, email);
        localStorage.setItem('token', 'logged-in');  // or whatever
        onLogin(); 
        navigate('/search');
      };


  return (
    <>
    <div className="login-page">
      {/* LEFT HALF: form */}
      <div className="form-container">
        <div className="form-box">
          <h1>Fetch Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>


      <div className="image-container">
        <img src={DogImage} alt="Happy dogs" />
      </div>
    </div>
    </>
  );
}

export default Login;

