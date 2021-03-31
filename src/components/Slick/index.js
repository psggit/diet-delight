import Slider from "react-slick";
import "./slick.css";
import Left from "./../../assets/left.png";
import Right from "./../../assets/right.png";
import CategoryItem from "./categoryItem.js";

export default function CustomSlicker(props) {
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextButton />,

    prevArrow: <PrevButton />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function PrevButton({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        <img src={Left} alt="" style={{ width: 30, height: 30 }} />
      </div>
    );
  }

  function NextButton({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        <img src={Right} alt="" style={{ width: 30, height: 30 }} />
      </div>
    );
  }

  return (
    <div id="slick">
      <div className="container">
        <Slider {...settings}>
          {props.categories.map((category) => {
            return (
              <CategoryItem
                category={category}
                filterMenu={props.filterMenu}
                activeId={props.activeId}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
