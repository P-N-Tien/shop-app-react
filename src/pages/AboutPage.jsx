import React from "react";
import { Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section/Jumbotron for the About Us content */}
      <header className="bg-light pt-5 pb-4">
        <div className="container">
          <h1 className="text-center display-4 fw-bold mb-3">About Us</h1>
          <hr className="w-25 mx-auto" />
          <p className="lead text-center text-muted col-lg-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            facere doloremque veritatis odit similique sequi. Odit amet fuga nam
            quam quasi facilis sed doloremque saepe sint perspiciatis explicabo
            totam vero quas provident ipsam, veritatis nostrum velit quos
            recusandae est mollitia esse fugit dolore laudantium. Ex vel
            explicabo earum unde eligendi autem praesentium, doloremque
            distinctio nesciunt porro tempore quis eaque labore voluptatibus ea
            necessitatibus exercitationem tempora molestias.
          </p>
        </div>
      </header>

      {/* Products Section */}
      <div className="container my-5 py-3">
        <h2 className="text-center display-5 fw-bold mb-4">Our Products</h2>
        <div className="row g-4 justify-content-center">
          {" "}
          {/* Use g-4 for consistent gutter */}
          {/* Card 1 */}
          <div className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm border-0 transition-3d hover-shadow-lg">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Men's Clothing"
                height={160}
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold">
                  Mens's Clothing
                </h5>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm border-0 transition-3d hover-shadow-lg">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Women's Clothing"
                height={160}
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold">
                  Women's Clothing
                </h5>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm border-0 transition-3d hover-shadow-lg">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Jewelery"
                height={160}
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold">Jewelery</h5>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm border-0 transition-3d hover-shadow-lg">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Electronics"
                height={160}
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold">
                  Electronics
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thêm CSS cho hiệu ứng hover (cần file CSS hoặc style global) */}
      <style>{`
        .transition-3d {
          transition: all 0.3s ease-in-out;
        }
        .hover-shadow-lg:hover {
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default AboutPage;
