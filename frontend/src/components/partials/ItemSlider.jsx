import Slider from "react-slick";
import ItemCard from "./ItemCard";

// ItemSlider Component
const ItemSlider = ({ data, isProduct = true }) => {
    const slidesToShow = Math.min(4, data.length);
    const slidesToScroll = Math.min(4, data.length);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      swipe: true,
      slidesToScroll: slidesToScroll,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };
  
    return (
      <Slider {...settings}>
        {data.map((item, index) => (
          <ItemCard key={index} {...item} isProduct={isProduct} />
        ))}
      </Slider>
    );
  };

export default ItemSlider;