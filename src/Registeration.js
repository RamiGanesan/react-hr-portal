import React, { useState } from 'react';

function Registeration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleSubmit = (event) => {
        event.preventDefault();
   
    };

    return (
        <div className="container mt-5 w-50">
            <h1 className="text-center">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                 <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required  />
                </div>
                 <div className="text-center">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <p className='mt-2'>
       <a href="/">Login</a>
      </p>
                </div>
            </form>
        </div>
    );
}

export default Registeration;
