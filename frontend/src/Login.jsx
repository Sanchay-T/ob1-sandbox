 import React, { useState } from 'react';
 import './Login.css'; // Importing CSS for styling
 
 const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
 
   const handleSubmit = (e) => {
     e.preventDefault();
     if (!email || !password) {
       setError('Email and password are required');
       return;
     }
     // Handle login logic here
     console.log('Logging in with', { email, password });
   };
 
   return (
     <div className="login-container">
       <h2>Login</h2>
       {error && <p className="error">{error}</p>}
       <form onSubmit={handleSubmit}>
         <div>
           <label>Email:</label>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Password:</label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
         </div>
         <button type="submit">Login</button>
       </form>
     </div>
   );
 };
 
 export default Login;
