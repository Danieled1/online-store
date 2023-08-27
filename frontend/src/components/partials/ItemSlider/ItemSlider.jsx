import Slider from "react-slick";
import ItemCard from "../ItemCard";
import "./ItemSlider.css";
import ItemCard2 from "../ItemCard/ItemCard2";

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

  return (
    <Slider className={sliderClass} {...settings}>
      {data.map((item, index) => (
        <ItemCard key={index} item={item} isProduct={isProduct} />
      ))}
    </Slider>
  );
};

export default ItemSlider;
