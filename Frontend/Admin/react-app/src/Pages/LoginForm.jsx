// LoginForm.jsx

import React, { useState } from "react";
import "./LoginForm.css";


const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { username: credentials.username, password: credentials.password };
    console.log('Data to send:', dataToSend);

    const response = await fetch('http://localhost:5001/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (response.ok) {
       
        console.log(data.message);
        
    } else {
        // Handle error
        console.error('Sign-in failed:', data.message);
        // show popup error
        alert(data.message);
    }
}; 

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default LoginForm;
