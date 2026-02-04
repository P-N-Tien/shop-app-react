import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { useLogin } from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { mutate: handleLoginAsync, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Test data: 0909876543, 123456

    const payload = {
      phoneNumber: e.target.phoneNumber.value,
      password: e.target.password.value,
    };

    handleLoginAsync(payload, {
      onSuccess: () => {
        dispatch(loginSuccess());
        // Check user has been redirected from previous page
        const origin = location.state?.redirectTo || "/";
        // If that is checkout page and back it, if not back to home page
        navigate(origin);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body p-5">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark">Welcome Back</h2>
                    <p className="text-muted small">
                      Please enter your details to sign in
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Phone Input */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted">
                        PHONE NUMBER
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted">
                          <i className="fa fa-phone small"></i>
                        </span>
                        <input
                          type="text"
                          name="phoneNumber"
                          className="form-control border-start-0 ps-0 py-2"
                          placeholder="e.g. 0909xxxxxx"
                          required
                          style={{ fontSize: "0.9rem" }}
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label className="form-label small fw-bold text-muted">
                          PASSWORD
                        </label>
                        {/* <Link
                          to="/forgot"
                          className="small text-decoration-none fw-medium text-primary"
                        >
                          Forgot?
                        </Link> */}
                      </div>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted">
                          <i className="fa fa-lock small"></i>
                        </span>
                        <input
                          type="password"
                          name="password"
                          className="form-control border-start-0 ps-0 py-2"
                          placeholder="••••••••"
                          required
                          style={{ fontSize: "0.9rem" }}
                        />
                      </div>
                    </div>

                    {error && (
                      <div
                        className="alert alert-danger border-0 small py-2 text-center"
                        role="alert"
                      >
                        <i className="fa fa-exclamation-circle me-2"></i>
                        {error?.response?.data?.message}
                      </div>
                    )}

                    <button
                      className="btn btn-dark w-100 py-2 fw-bold mb-3 shadow-sm"
                      type="submit"
                      disabled={isPending}
                      style={{ borderRadius: "10px", letterSpacing: "0.5px" }}
                    >
                      {isPending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Checking...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-muted small mb-0">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="fw-bold text-primary text-decoration-none"
                        >
                          Sign Up Free
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Trust Badge or Footer link */}
              <div className="text-center mt-4">
                <Link to="/" className="text-muted small text-decoration-none">
                  <i className="fa fa-arrow-left me-1"></i> Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
