import React, { useState, useEffect } from "react";
import "../Menu Package/MenuPkg.css";
import "../Menu Package/TabMenuPkg.css";
import "./Favmain.css";
import axios from "../../axiosInstance";
import card_img_rounded from "../../assets/food1.jpg";
// import veg_icon from "../../assets/vegicon.png";
import VegComponent from "../veg non veg component/VegComponent.js";
import NonvegComponent from "../veg non veg component/NonvegComponent.js";

function FavComponent(props) {
  const [unmarkingFav, setUnmarkingFav] = useState(false);

  function colorHandle(menu_id) {
    console.log(menu_id);
    handleUnlike(menu_id);
  }

  const handleUnlike = (id) => {
    console.log("menuId Data");
    console.log(id);
    setUnmarkingFav(true);
    axios
      .delete(`favourites/` + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setUnmarkingFav(false);
        console.log(res);
        console.log("Delete Data");
        // likeColor === "fa fa-heart-o heart_menu_pkg"
        //   ? setLikeColor("fa fa-heart heart_menu_pkg_fill")
        //   : setLikeColor("fa fa-heart-o heart_menu_pkg");
        props.handleFavourites();
      })
      .catch((err) => {
        console.log(err);
        setUnmarkingFav(false);
      });
  };

  if (props.favourite.menu_item != null) {
    return (
      <>
        {" "}
        <div className="col-md-6 col-xs-12" key={Math.random()}>
          <div className="card text-center card_border_menupkg">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <img
                  src={props.favourite.menu_item.picture}
                  alt="food"
                  className="rounded-circle tabmenu_roundedimg"
                ></img>
              </div>
              <div className="col-md-7 col-sm-12">
                <div className="media-body content_media">
                  <h5 className="something_text">
                    {props.favourite.menu_item.name}
                  </h5>
                </div>
              </div>

              <div className="col-lg-2 col-md-2 col-xs-12">
                {props.favourite.menu_item.veg === 0 ? (
                  <VegComponent />
                ) : (
                  <NonvegComponent />
                )}
                {unmarkingFav && (
                  <i
                    className="fa fa-spinner fa-spin loader"
                    aria-hidden="true"
                  ></i>
                )}
                {!unmarkingFav && !props.loadingFav && (
                  <i
                    className="fa fa-heart heart_menu_pkg_fill"
                    aria-hidden="true"
                    onClick={() => colorHandle(props.favourite.id)}
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default React.memo(FavComponent);
