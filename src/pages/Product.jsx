import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Navbar } from "../components";
import { useProductByName, useProducts } from "../hooks/useProducts";
import ImageReview from "../components/ImagePreview/ImageReview";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={120} />
          <Skeleton height={120} />
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("name");

  const { data: product, isLoading } = useProductByName(productName);
  const { data: similarProducts, isLoading: loadingSimilar } =
    useProducts(null);

  const handleAddToCart = (item) => dispatch(addCart(item));

  const SimilarSkeleton = () => {
    return (
      <div className="d-flex my-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container py-5">
        {isLoading || !product ? (
          <ProductSkeleton />
        ) : (
          <div className="row g-5">
            {/* Left: Image Gallery */}
            <div className="col-md-7">
              <div className="bg-white rounded-4 overflow-hidden shadow-sm p-3">
                <ImageReview images={product?.images || []} />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="col-md-5">
              <div className="sticky-top" style={{ top: "100px", zIndex: 1 }}>
                <nav aria-label="breadcrumb" className="mb-3">
                  <ol className="breadcrumb text-uppercase fw-bold small">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none text-muted">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active text-primary">
                      {product.category}
                    </li>
                  </ol>
                </nav>

                <h1 className="display-5 fw-bold mb-2 text-dark">
                  {product.name}
                </h1>

                <div className="d-flex align-items-center mb-4">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" aria-hidden="true"></i>
                    ))}
                  </div>
                  <span className="text-muted small">(150+ Reviews)</span>
                </div>

                <div className="d-flex align-items-baseline mb-4">
                  <h2 className="fw-bold text-primary mb-0">
                    ${product.price}
                  </h2>
                  <span className="text-decoration-line-through text-muted ms-3 fs-5">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                <p
                  className="text-secondary lh-lg mb-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  {product.description}
                </p>

                <div className="d-grid gap-3 d-md-flex">
                  <button
                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i
                      className="fa fa-shopping-cart me-2"
                      aria-hidden="true"
                    ></i>{" "}
                    Add to Cart
                  </button>
                  <Link
                    to="/cart"
                    className="btn btn-outline-dark btn-lg px-5 py-3 rounded-pill d-flex align-items-center justify-content-center"
                  >
                    Go to Cart <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products Section */}
        <div className="mt-5 pt-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold mb-0">You may also like</h2>
            <Link
              to="/products"
              className="text-primary fw-bold text-decoration-none"
            >
              View all
            </Link>
          </div>

          <Marquee pauseOnHover speed={40} gradient gradientWidth={50}>
            {loadingSimilar ? (
              <SimilarSkeleton />
            ) : (
              similarProducts?.content?.map((item) => (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm mx-3 rounded-4 overflow-hidden"
                  style={{ width: "280px" }}
                >
                  <div className="position-relative">
                    <img
                      className="card-img-top p-4 object-fit-contain"
                      src={item?.thumbnailUrl}
                      alt={item.name}
                      style={{
                        height: "260px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <span className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 m-3 rounded-pill small fw-bold">
                      -20%
                    </span>
                  </div>

                  <div className="card-body pt-0 px-4 pb-4">
                    <h6 className="text-muted text-uppercase mb-1 small">
                      {item.category}
                    </h6>
                    <h5 className="fw-bold mb-2 text-truncate">{item.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5">${item.price}</span>
                      <button
                        className="btn btn-sm btn-dark rounded-circle p-2"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i
                          className="fa fa-shopping-cart me-2"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Product;
