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

  const RenderFavourites = () => {
    return (
      <div className="favContainer">
        {favouriteData.map((favourite) => {
          return (
            <FavouriteMemo
              favourite={favourite}
              key={Math.random()}
              handleFavourites={handleFavourites}
              loadingFav={loadingFav}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="fav_bg_container">
      {/* choose meal component */}

      <Mealchoose name="Favorites" />

      {/* card component */}

      <div className="menupkg_container_main_1">
        <div className="container">
          {!loadingFav && <div className="row">{<RenderFavourites />}</div>}
        </div>
      </div>
    </div>
  );
}
