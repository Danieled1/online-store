import Slider from "react-slick";
import ItemCard from "../ItemCard";
import "./ItemSlider.css";
import ItemCard2 from "../ItemCard/ItemCard2";
import React, { useEffect, useState } from "react";
// ItemSlider Component
const ItemSlider = ({ data, isProduct = true }) => {
  const sliderClass = isProduct ? "product-slider" : "post-slider";
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipe: true,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    autoplay: true,
    touchMove: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        // Between Laptop and PC
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        // Tablet
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        // Between Mobile and Tablet
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        // Small Mobile
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Check if data is not available or empty
  if (!data || data.length === 0) {
    return <div>No products available. 2</div>;
  }
  useEffect(() => {
    console.log("DATA:", data);
  }, [data]);

  const dataArray = Array.isArray(data) ? data : [];


  return (
    <Slider className={sliderClass} {...settings}>
      {dataArray.map((item, index) => (
        <ItemCard key={index} item={item} isProduct={isProduct} />
      ))}
    </Slider>
  );
};

export default ItemSlider;
