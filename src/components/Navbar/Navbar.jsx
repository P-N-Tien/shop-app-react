import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action";
import { useLogout } from "@/hooks/useLogout";
import { showCustomToast } from "../Notify/ReactToast";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import "./navbar.css";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { mutate } = useLogout();
  const cartItems = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  const handleLogout = async () => {
    showCustomToast("You Signed out of your account.", "info");
    dispatch(logout());
    mutate();
  };

  const totalQuantity = useMemo(() => {
    return cartItems?.reduce((acc, item) => acc + item.qty, 0);
  }, [cartItems]);

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3">
          <span className="text-primary">AMER</span>ICAN
        </Navbar.Brand>

        <Navbar.Toggle border={0} aria-controls="navContent" />

        <Navbar.Collapse id="navContent">
          <Nav className="mx-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/" className="px-3">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/product" className="px-3">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="px-3">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="px-3">
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            {/* Cart Icon */}
            <NavLink to="/cart" className="btn border-0 position-relative me-3">
              <i
                className="fa fa-shopping-cart text-dark"
                style={{ fontSize: "1.3rem" }}
              />
              {totalQuantity > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 translate-middle"
                  style={{ fontSize: 10, left: "90%" }}
                >
                  {totalQuantity}
                </Badge>
              )}
            </NavLink>

            {/* User Dropdown */}
            <NavDropdown
              align="end"
              title={
                <i
                  className="fa fa-user-circle-o"
                  style={{ fontSize: "1.3rem" }}
                />
              }
              id="user-dropdown"
              className="custom-dropdown"
            >
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item as={NavLink} to="#" className="py-2">
                    <i className="fa fa-user fa-fw me-2" /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="button"
                    onClick={handleLogout}
                    className="py-2"
                  >
                    <i className="fa fa-sign-out fa-fw me-2" /> Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={NavLink} to="/login" className="py-2">
                    <i className="fa fa-sign-in fa-fw me-2" /> Login
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/register"
                    className="py-2"
                  >
                    <i className="fa fa-user-plus fa-fw me-2" /> Join us
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
