import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function LoginForm() {
    const [form, setForm] = useState({userName:'',password:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.userName === 'admin' && form.password === 'admin') {
            localStorage.setItem('isAuthenticated', 'true');
            setTimeout(() => {
                navigate('/dashboard');
            },2000);
        } else {
            setError('Invalid username or password');
        }
        }

  return (
    <div className='container mt-5 w-50'>
        <h1 className='text-center'>Login</h1>
        {error && <p className="alert alert-danger">{error}</p>}
    <form onSubmit={handleSubmit} className="login-form">
    <input type="text" name="userName" className="form-control mb-2" placeholder="Username" value={form.userName} onChange={handleChange} />
    <input type="password" name="password" className="form-control mb-2" placeholder="Password" value={form.password} onChange={handleChange} />
      <div className='text-center'>
        <div className="form-check form-check-inline mt-3">
          <input className="form-check-input" type="radio" name="loginAs" id="employee" value="employee" />
          <label className="form-check-label" htmlFor="employee">Employee</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="loginAs" id="hr" value="hr" />
          <label className="form-check-label" htmlFor="hr">HR</label>
        </div>
        </div>
      <div className='text-center'>
      <button type="submit" className='btn btn-primary mt-2'>Login</button>
      <p className='mt-2'>
       <a href="/signup">Sign up</a>
      </p>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;

