import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const [role, setRole] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [errors2, setErrors2] = useState('');

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { username: "", password: "" };
    let valid = true;

    if (username.trim() === "") {
      newErrors.username = "Username is required";
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
    e.preventDefault();
 validate();
    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");
    if (username === getUsername && password === getPassword ) {
      localStorage.setItem("isAuthenticated", "true");
      setTimeout(() => {
        if(role === "hr"){
        navigate("/hrdashboard");
        }
        else if(role === "employee"){
          navigate("/employeedashboard");
        }
        else if(role === "admin"){
          navigate("/admindashboard");
        }else{
          setErrors2("Select your role");
        }
        }, 2000);
    } else{
      setErrors2("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
      style={{
        backgroundImage: "url(/your-background-image.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-white bg-opacity-75 p-4 rounded-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        {errors2 && <p className="alert alert-danger">{errors2}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-3 d-flex gap-3 justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <label className="form-check-label">Admin</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
              />
              <label className="form-check-label">Employee</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="hr"
                checked={role === "hr"}
                onChange={() => setRole("hr")}
              />
              <label className="form-check-label">Hr</label>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="text-center mt-3">
            <a href="/signup">SignUp</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
