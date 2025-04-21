import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  const validate = () => {
    const newErrors = { username: "", email: "", password: "" };
    let valid = true;

    if (username.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    }

    if ( email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if ( !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    validate();
    e.preventDefault();
       localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{ backgroundImage: 'url(/your-background-image.jpg)', backgroundSize: 'cover' }}>
      <div className="bg-white bg-opacity-75 p-4 rounded-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

  
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>

          <div className="text-center mt-3">
            <a href="/">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
