import React, { useState } from "react";
import bgimg from "./images/background.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Get existing employees from localStorage (or empty array if none)
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Add the new employee to the array
      const updatedUsers = [...existingUsers, formData];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setShowToast(true); // Show the toast!
      setTimeout(() => setShowToast(false), 3000);
      setFormData({
        userName: "",
        email: "",
        password: "",
        role: "employee",
      });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
      style={backgroundStyle}
    >
      <div
        className="bg-white  p-4 rounded-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.userName ? "is-invalid" : ""}`}
              placeholder="Username"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && (
              <div className="invalid-feedback">{errors.userName}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
                value="employee"
                checked={formData.role === "employee"}
                onChange={handleChange}
              />
              <label className="form-check-label">Employee</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="hr"
                checked={formData.role === "hr"}
                onChange={handleChange}
              />
              <label className="form-check-label">Hr</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>

          <div className="text-center mt-3">
            <a href="/">Login</a>
          </div>
        </form>
        {/* Toast Notification */}
        {showToast && (
          <div
            className="toast text-bg-primary border-0 show position-absolute top-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 9999 }}
          >
            {" "}
            <div class="d-flex">
              <div className="toast-body">
                Account created successfully!
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setShowToast(false)}
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
