import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Navbar } from "../components";
import { useProductByName, useProducts } from "../hooks/useProducts";
import ImageReview from "../components/ImagePreview/ImageReview";

const ProductSkeleton = () => (
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

const SimilarSkeleton = () => (
  <div className="d-flex my-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="mx-4">
        <Skeleton height={400} width={250} />
      </div>
    ))}
  </div>
);

const Product = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("name");
  const imageUrl = import.meta.env.VITE_URL_IMAGES;

  const { data: product, isLoading } = useProductByName(productName);
  const { data: similarProducts, isLoading: loadingSimilar } =
    useProducts(null);

  const images = useMemo(
    () => product?.images?.map((img) => `${imageUrl}/${img?.imageUrl}`) || [],
    [product, imageUrl]
  );

  const handleAddToCart = (item) => dispatch(addCart(item));

  return (
    <>
      <Navbar />

      <div className="container">
        {isLoading || !product ? (
          <ProductSkeleton />
        ) : (
          <div className="container my-5 py-2">
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <ImageReview images={images} />
              </div>

              <div className="col-md-5 py-4">
                <h4 className="text-uppercase text-muted">
                  {product.category}
                </h4>
                <h1 className="display-6">{product.name}</h1>

                <p className="text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="fa fa-star" />
                  ))}
                </p>

                <h3 className="my-4">${product.price}</h3>
                <p className="lead">{product.description}</p>

                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                <Link to="/cart" className="btn btn-dark mx-3">
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Similar products */}
        <div className="row my-5 py-5 d-none d-md-block">
          <h2>You may also like</h2>

          <Marquee pauseOnHover pauseOnClick speed={50}>
            {loadingSimilar ? (
              <SimilarSkeleton />
            ) : (
              similarProducts?.content?.map((item) => (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={`${imageUrl}/${item.images?.[0]?.imageUrl}`}
                    alt={item.name}
                    height={300}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{item.name.slice(0, 20)}</h5>
                  </div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${item.price}</li>
                  </ul>

                  <div className="card-body">
                    <Link
                      to={`/product?name=${encodeURIComponent(item.name)}`}
                      className="btn btn-dark m-1"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-outline-dark m-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default Product;
