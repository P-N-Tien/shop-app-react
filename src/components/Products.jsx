import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

const Products = () => {
  const dispatch = useDispatch();
  const imageUrl = import.meta.env.VITE_URL_IMAGES;
  const [selectedCategory, setSelectedCategory] = useState(0);

  const { data: products, isLoading } = useProducts(selectedCategory);
  const { data: categories } = useCategories();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Category Filter Section */}
        <div className="col-12 mb-5">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            <button
              className={`btn ${
                selectedCategory === 0 ? "btn-dark" : "btn-outline-dark"
              } rounded-pill px-4`}
              onClick={() => setSelectedCategory(0)}
            >
              All
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                className={`btn ${
                  selectedCategory === cat.id ? "btn-dark" : "btn-outline-dark"
                } rounded-pill px-4`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {products?.content?.map((product) => (
            <div key={product.id} className="col-md-4 col-lg-3 col-sm-6">
              <div className="card h-100 border-0 shadow-sm custom-card">
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "280px" }}
                >
                  <img
                    className="card-img-top w-100 h-100 object-fit-contain p-4 transition-transform"
                    src={product?.thumbnailUrl}
                    alt={product.name}
                  />
                  <div className="card-overlay d-flex align-items-center justify-content-center">
                    <Link
                      to={`/product/details?name=${product.name}`}
                      className="btn btn-light btn-sm mx-1 shadow-sm"
                    >
                      <i className="fa fa-eye mr-1"></i> Quick View
                    </Link>
                  </div>
                </div>

                <div className="card-body d-flex flex-column text-center">
                  <small className="text-muted text-uppercase mb-1">
                    {product.category?.name}
                  </small>
                  <h6 className="card-title fw-bold mb-2">
                    {product.name.length > 25
                      ? `${product.name.substring(0, 25)}...`
                      : product.name}
                  </h6>
                  <p className="card-text fw-light fs-5 text-dark mb-3">
                    ${product.price.toLocaleString()}
                  </p>

                  <div className="mt-auto">
                    <button
                      className="btn btn-dark w-100 rounded-0 py-2 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => addProduct(product)}
                    >
                      <i className="fa fa-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container my-5 py-2">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="display-6 fw-bolder text-uppercase tracking-wider">
            LATEST COLLECTIONS
          </h2>
          <div
            className="mx-auto bg-dark mt-2"
            style={{ width: "80px", height: "3px" }}
          ></div>
        </div>
      </div>
      <div className="row justify-content-center">
        {isLoading ? <Loading /> : <ShowProducts />}
      </div>

      {/* Custom Styles for better aesthetics */}
      <style>{`
        .custom-card { transition: all 0.3s ease; border-radius: 15px; }
        .custom-card:hover { transform: translateY(-10px); shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .transition-transform { transition: transform 0.5s ease; }
        .custom-card:hover .transition-transform { transform: scale(1.1); }
        .card-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.05); opacity: 0; transition: 0.3s;
        }
        .custom-card:hover .card-overlay { opacity: 1; }
        .object-fit-contain { object-fit: contain; }
      `}</style>
    </div>
  );
};

export default Products;
