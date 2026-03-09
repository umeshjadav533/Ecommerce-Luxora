import { MoveLeft, MoveRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CustomLeftArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-35 p-3 rounded-full hover:bg-black hover:text-white cursor-pointer border-5"
    >
      <MoveLeft />
    </button>
  );
}

function CustomRightArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-35 p-3 rounded-full hover:bg-black hover:text-white cursor-pointer border-5"
    >
      <MoveRight />
    </button>
  );
}

export default function Slider({ data, renderItem }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        swipeable={true}
        infinite={true}
        slidesToSlide={1}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        className="relative"
      >
        {data?.map((item) => renderItem(item))}
      </Carousel>
    </div>
  );
}
