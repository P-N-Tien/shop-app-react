import React, { useState } from "react";
import { Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, error, isPending: loading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: e.target.fullName.value,
      phoneNumber: e.target.phoneNumber.value,
      password: e.target.password.value,
    };

    // Register user information
    register(payload, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {/* Card Wrapper */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark">Create Account</h2>
                    <p className="text-muted">Join our community today</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fa fa-user text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0 shadow-none"
                          name="fullName"
                          placeholder="Elon Musk"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fa fa-phone text-muted"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control border-start-0 ps-0 shadow-none"
                          name="phoneNumber"
                          placeholder="0123 456 789"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fa fa-lock text-muted"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control border-start-0 border-end-0 ps-0 shadow-none"
                          name="password"
                          placeholder="••••••••"
                          required
                        />
                        <span
                          className="input-group-text bg-white border-start-0"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            } text-muted`}
                          ></i>
                        </span>
                      </div>
                    </div>

                    {error && (
                      <div className="alert alert-danger py-2 small border-0 mb-4">
                        <i className="fa fa-exclamation-circle me-2"></i>{" "}
                        {error?.response?.data?.message}
                      </div>
                    )}

                    <button
                      className="btn btn-dark w-100 py-2 fw-bold rounded-3 shadow-sm hover-elevate"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : null}
                      Register
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="mb-0 text-muted">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Home Link */}
              <div className="text-center mt-3">
                <Link to="/" className="text-muted small text-decoration-none">
                  <i className="fa fa-arrow-left me-1"></i> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input-group:focus-within {
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          border-radius: 0.375rem;
        }
        .form-control:focus {
          border-color: #dee2e6;
        }
        .hover-elevate:hover {
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default Register;
