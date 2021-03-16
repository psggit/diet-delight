import React, { useState, useEffect } from "react";
import "../Menu Package/MenuPkg.css";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose.js";
import "../Menu Package/TabMenuPkg.css";
import "./Favmain.css";
import axios from "../../axiosInstance";
import FavComponent from "./FavComponent";

export default function FavouriteMain() {
  const [likeColor, setLikeColor] = useState("fa fa-heart-o heart_menu_pkg");

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
              <div className="row">
                <FavComponent />
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
