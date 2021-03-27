import React, { useState, useEffect } from "react";
import "../Menu Package/MenuPkg.css";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose.js";
import "../Menu Package/TabMenuPkg.css";
import "./Favmain.css";
import axios from "../../axiosInstance";
import FavouriteMemo from "./FavComponent";

export default function FavouriteMain(props) {
  const [favouriteData, setFavouriteData] = useState([]);
  const [loadingFav, setLoadingFav] = useState(false);

  const handleFavourites = () => {
    userFavourites();
  };

  useEffect(() => {
    userFavourites();
  }, []);

  const userFavourites = () => {
    setLoadingFav(true);
    axios
      .get(`favourites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setLoadingFav(false);
        console.log(res);
        setFavouriteData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoadingFav(false);
      });
  };

  const renderFavourites = favouriteData.map((favourite) => (
    <FavouriteMemo
      favourite={favourite}
      key={Math.random()}
      handleFavourites={handleFavourites}
      loadingFav={loadingFav}
    />
  ));

  return (
    <div className="fav_bg_container">
      {/* choose meal component */}

      <Mealchoose name="Favorites" />

      {/* card component */}

      <div className="menupkg_container_main_1">
        <div className="container">
          {/* only for starter card */}
          <br />
          <br />
          <br />

          {/* <h4 className="d-flex justify-content-center mt-2 mb-2 font-weight-bold">Starter</h4> */}
          <div className="row">
            <div className="col-md-10">
              {!loadingFav && <div className="row">{renderFavourites}</div>}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
