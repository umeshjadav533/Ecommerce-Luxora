import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRef } from "react";

const ProductSlider = ({
  title = "",
  data = [],
  renderItem,
  slidePerMove = 2,
  itemClass = "px-1.5",
  showTitleSection = true,
  loop = true,
  superLargeDesktopPerView=4,
  desktopPerView=4,
  tabletPerView=2,
  mobilePerView=1

}) => {
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: superLargeDesktopPerView,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: desktopPerView,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: tabletPerView,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: mobilePerView,
    },
  };

  return (
    <div className="w-full">
      {showTitleSection && (
        <div className="flex justify-between items-center mb-5 px-3">
          <h1 className="text-3xl font-bold premium-cursive">{title}</h1>
          <div className="flex gap-3">
            <button
              onClick={() => carouselRef.current?.previous()}
              className="border cursor-pointer hover:bg-black hover:text-white px-4 py-2"
            >
              <MoveLeftIcon />
            </button>

            <button
              onClick={() => carouselRef.current?.next()}
              className="border cursor-pointer hover:bg-black hover:text-white px-4 py-2"
            >
              <MoveRightIcon />
            </button>
          </div>
        </div>
      )}

      <Carousel
        ref={carouselRef}
        responsive={responsive}
        swipeable={true}
        infinite={loop}
        slidesToSlide={slidePerMove}
        itemClass={itemClass}
        arrows={false} // default arrows off
      >
        {data?.map((item) => renderItem(item))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;