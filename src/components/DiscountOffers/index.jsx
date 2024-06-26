import React, { useState, useEffect } from "react";
import axios, { endpoint } from "../../lib/api";
import ctabanner from "../../assets/images/cta-banner.jpg";
import { Link } from "react-router-dom";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

const calculateRemainingTime = (endDate) => {
  const now = new Date();
  const diffInDays = differenceInDays(endDate, now);
  const diffInHours = differenceInHours(endDate, now) % 24;
  const diffInMinutes = differenceInMinutes(endDate, now) % 60;
  const diffInSeconds = differenceInSeconds(endDate, now) % 60;

  return {
    remainingDays: diffInDays,
    remainingHours: diffInHours,
    remainingMinutes: diffInMinutes,
    remainingSeconds: diffInSeconds,
  };
};

const DiscountOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/products/discountoffers/`); // Replace with your API endpoint
        const updatedOffers = response.data.map((offer) => {
          const endDate = new Date(offer.end_date);
          return {
            ...offer,
            ...calculateRemainingTime(endDate),
          };
        });
        setOffers(updatedOffers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setOffers((prevOffers) => {
        return prevOffers
          .map((offer) => {
            const endDate = new Date(offer.end_date);
            const newRemainingTime = calculateRemainingTime(endDate);

            if (
              newRemainingTime.remainingDays <= 0 &&
              newRemainingTime.remainingHours <= 0 &&
              newRemainingTime.remainingMinutes <= 0 &&
              newRemainingTime.remainingSeconds <= 0
            ) {
              axios
                .delete(`/api/products/discountoffers/${offer.id}/delete/`)
                .catch((error) =>
                  console.error("Error deleting offer:", error)
                );
              return null;
            }

            return { ...offer, ...newRemainingTime };
          })
          .filter((offer) => offer !== null);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-lg">
      {isLoading && <p>Loading offers...</p>}
      {error && <p>Error fetching offers: {error.message}</p>}
      <div className="container">
        <div className="testimonials-box">
          <div className="product-featured mt-4">
            <h2 className="text-3xl my-4 uppercase font-bold text-zinc-800">
              Special Offers
            </h2>

            <div className="showcase-wrapper has-scrollbar">
              {offers.map((product, i) => (
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
                        <h3 className="showcase-title font-bold">
                          {product.name}
                        </h3>
                      </Link>

                      {product.description && (
                        <p className="showcase-desc">{product.description}</p>
                      )}

                      <div className="price-box">
                        <p className="price">${product.price}</p>
                        {product.sale_price && <del>${product.sale_price}</del>}
                      </div>

                      <button className="add-cart-btn">Add to Cart</button>

                      <div className="showcase-status">
                        <div className="wrapper">
                          <p>
                            Available: <b>{product.countInStock}</b>
                          </p>
                        </div>
                      </div>

                      <div className="countdown-box">
                        <p className="countdown-desc">
                          Hurry Up! Offer ends in:
                        </p>

                        <div className="countdown">
                          <div className="countdown-content">
                            <p className="display-number">
                              {product.remainingDays}
                            </p>
                            <p className="display-text">Days</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">
                              {product.remainingHours}
                            </p>
                            <p className="display-text">Hours</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">
                              {product.remainingMinutes}
                            </p>
                            <p className="display-text">Min</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">
                              {product.remainingSeconds}
                            </p>
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

          {offers.length === 0 && !isLoading && (
            <p>No discount offers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountOffers;
