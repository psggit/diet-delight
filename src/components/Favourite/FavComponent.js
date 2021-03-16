import React, { useState, useEffect } from "react";
import "../Menu Package/MenuPkg.css";
import "../Menu Package/TabMenuPkg.css";
import "./Favmain.css";
import axios from "../../axiosInstance";
import card_img_rounded from "../../assets/food1.jpg";
import veg_icon from "../../assets/vegicon.png";

export default function FavComponent() {
  const [likeColor, setLikeColor] = useState("fa fa-heart-o heart_menu_pkg");
  const [favouriteData, setFavouriteData] = useState([]);

  function colorHandle() {
    likeColor === "fa fa-heart-o heart_menu_pkg"
      ? setLikeColor("fa fa-heart heart_menu_pkg_fill")
      : setLikeColor("fa fa-heart-o heart_menu_pkg");
  }

  useEffect(() => {
    axios
      .get(`favourites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setFavouriteData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderFavourites = favouriteData.map((favourites) => {
    if (favourites.menu_item != null) {
      return (
        <div className="col-md-6 col-xs-12" key={Math.random()}>
          <div className="card text-center card_border_menupkg">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <img
                  src={favourites.menu_item.picture}
                  alt="food"
                  className="rounded-circle tabmenu_roundedimg"
                ></img>
              </div>
              <div className="col-md-7 col-sm-12">
                <div className="media-body content_media">
                  <h5 className="something_text">
                    {favourites.menu_item.name}
                  </h5>
                </div>
              </div>

              <div className="col-lg-2 col-md-2 col-xs-12">
                <img
                  src={veg_icon}
                  alt="veg"
                  className="veg_icon_menupkg"
                ></img>

                <i
                  className={likeColor}
                  aria-hidden="true"
                  onClick={colorHandle}
                ></i>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return <>{renderFavourites}</>;
}
