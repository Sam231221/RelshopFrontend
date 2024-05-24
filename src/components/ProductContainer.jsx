import React from "react";
import { useEffect } from "react";
import bn1 from "../assets/images/banner-01.jpg";
import bn2 from "../assets/images/banner-02.jpg";
import bn3 from "../assets/images/banner-03.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ctabanner from "../assets/images/cta-banner.jpg";
import { useDispatch } from "react-redux";
import Rating from "./Rating";
import axios, { endpoint } from "../lib/api";
export default function ProductContainer() {
  const [recentProducts, SetRecentProducts] = useState([]);
  const [isRpLoading, SetRpLoading] = useState(true);

  const [dealProducts, SetDealProducts] = useState([]);
  const [isDpLoading, SetDpLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadRecentProducts = async () => {
    const { data } = await axios.get(`/api/products/recents/`);
    SetRecentProducts(data);
    SetRpLoading(false);
  };

  const loadDealProducts = async () => {
    const { data } = await axios.get("api/products/deals/");
    SetDealProducts(data);
    SetDpLoading(false);
  };
  const addToCartHandler = (id, quantity = 1) => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };

  useEffect(() => {
    loadRecentProducts();
    loadDealProducts();
  }, []);

  return (
    <div className="container-lg mx-auto my-8">
      {/* Banner */}

      <div className="flex flex-wrap gap-3 ">
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn1} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Women
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                Spring 2018
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn2} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Men
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                Spring 2018
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn3} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Accessories
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                New Trend
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
      </div>
      {/* New Products */}
      <div className=" my-10">
        <h2 className="text-3xl my-4 uppercase font-bold text-zinc-800">
          New Products
        </h2>

        <div className="product-container product-grid">
          {recentProducts.map((product, i) => (
            <div key={i} className="showcase">
              <div className="showcase-banner">
                <img
                  src={`${endpoint}${product.thumbnail}`}
                  alt={product.name}
                  className="product-img default"
                  width="300"
                />
                <img
                  src={`${endpoint}${product.thumbnail}`}
                  alt={product.name}
                  className="product-img hover"
                  width="300"
                />
                {product.sale_price && (
                  <p className="showcase-badge angle black">sale</p>
                )}
                <div className="showcase-actions">
                  <button className="btn-action">
                    <ion-icon
                      name="heart-outline"
                      role="img"
                      className="md hydrated"
                      aria-label="heart outline"
                    ></ion-icon>
                  </button>

                  <Link to={`/product/${product._id}`} className="btn-action">
                    <ion-icon
                      name="eye-outline"
                      role="img"
                      className="md hydrated"
                      aria-label="eye outline"
                    ></ion-icon>
                  </Link>
                  <button className="btn-action">
                    <ion-icon name="repeat-outline"></ion-icon>
                  </button>
                  <button
                    onClick={() => addToCartHandler(product._id)}
                    className="btn-action"
                  >
                    <ion-icon
                      name="bag-add-outline"
                      role="img"
                      className="md hydrated"
                      aria-label="bag add outline"
                    ></ion-icon>
                  </button>
                </div>
              </div>

              <div className="showcase-content">
                <Link
                  to={`/product/${product._id}`}
                  className="showcase-category"
                >
                  <h3 className="showcase-title">{product.name}</h3>
                </Link>

                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#F6A355"}
                />

                <div className="price-box">
                  <p className="price">${product.price}</p>
                  {product.sale_price && <del>${product.sale_price}</del>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* deal of the day */}
      <div className="product-featured mt-4">
        <h2 className="text-3xl my-4 uppercase font-bold text-zinc-800">
          Deal of the day
        </h2>

        <div className="showcase-wrapper has-scrollbar">
          {dealProducts.map((product, i) => (
            <div key={i} className="showcase-container">
              <div className="showcase">
                <div className="showcase-banner">
                  <img
                    src={`${endpoint}${product.thumbnail}`}
                    alt={product.name}
                    className="showcase-img"
                  />
                </div>

                <div className="showcase-content">
                  <div className="showcase-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </div>

                  <Link to="/">
                    <h3 className="showcase-title">{product.name}</h3>
                  </Link>

                  {product.description && (
                    <p className="showcase-desc">
                      Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                      dolor sit amet consectetur Lorem ipsum dolor
                    </p>
                  )}

                  <div className="price-box">
                    <p className="price">${product.price}</p>
                  </div>

                  <button className="add-cart-btn">add to cart</button>

                  <div className="showcase-status">
                    <div className="wrapper">
                      <p>
                        already sold: <b>20</b>
                      </p>

                      <p>
                        available: <b>40</b>
                      </p>
                    </div>

                    <div className="showcase-status-bar"></div>
                  </div>

                  <div className="countdown-box">
                    <p className="countdown-desc">Hurry Up! Offer ends in:</p>

                    <div className="countdown">
                      <div className="countdown-content">
                        <p className="display-number">360</p>

                        <p className="display-text">Days</p>
                      </div>

                      <div className="countdown-content">
                        <p className="display-number">24</p>
                        <p className="display-text">Hours</p>
                      </div>

                      <div className="countdown-content">
                        <p className="display-number">59</p>
                        <p className="display-text">Min</p>
                      </div>

                      <div className="countdown-content">
                        <p className="display-number">00</p>
                        <p className="display-text">Sec</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="testimonials-box">
          <div className="cta-container">
            <img
              src={ctabanner}
              alt="summer collection"
              className="cta-banner"
            />

            <a href="#" className="cta-content">
              <p className="discount">25% Discount</p>

              <h2 className="cta-title">Summer collection</h2>

              <p className="cta-text">Starting @ $10</p>

              <button className="cta-btn">Shop now</button>
            </a>
          </div>

          <div className="service">
            <h2 className="title">Our Services</h2>

            <div className="service-container">
              <a href="#" className="service-item">
                <div className="service-icon">
                  <ion-icon name="boat-outline"></ion-icon>
                </div>

                <div className="service-content">
                  <h3 className="service-title">Worldwide Delivery</h3>
                  <p className="service-desc">For Order Over $100</p>
                </div>
              </a>

              <a href="#" className="service-item">
                <div className="service-icon">
                  <ion-icon name="rocket-outline"></ion-icon>
                </div>

                <div className="service-content">
                  <h3 className="service-title">Next Day delivery</h3>
                  <p className="service-desc">UK Orders Only</p>
                </div>
              </a>

              <a href="#" className="service-item">
                <div className="service-icon">
                  <ion-icon name="call-outline"></ion-icon>
                </div>

                <div className="service-content">
                  <h3 className="service-title">Best Online Support</h3>
                  <p className="service-desc">Hours: 8AM - 11PM</p>
                </div>
              </a>

              <a href="#" className="service-item">
                <div className="service-icon">
                  <ion-icon name="arrow-undo-outline"></ion-icon>
                </div>

                <div className="service-content">
                  <h3 className="service-title">Return Policy</h3>
                  <p className="service-desc">Easy & Free Return</p>
                </div>
              </a>

              <a href="#" className="service-item">
                <div className="service-icon">
                  <ion-icon name="ticket-outline"></ion-icon>
                </div>

                <div className="service-content">
                  <h3 className="service-title">30% money back</h3>
                  <p className="service-desc">For Order Over $100</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}