import React, { useState, useEffect } from "react";
import "../Menu Package/MenuPkg.css";
import "../Menu Package/TabMenuPkg.css";
import "./Favmain.css";
import "./FavouriteComponent.css";
import axios from "../../axiosInstance";
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
        <div id="FavWrapper">
          <div className="imageContainer">
            <img src={props.favourite.menu_item.picture} alt="food" />
          </div>
          <div className="note">
            <p>{props.favourite.menu_item.name}</p>
            <div className="icon">
              <div className="action-icon">
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
              {props.favourite.menu_item.veg === 0 ? (
                <VegComponent />
              ) : (
                <NonvegComponent />
              )}
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
