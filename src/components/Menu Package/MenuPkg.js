import React, { useEffect, useState } from "react";
import "./MenuPkg.css";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose.js";
import card_img_rounded from "../../assets/food1.jpg";
import "./Tabs.css";
// import "./../Favourite/Favmain.css";
import DayTabsMenupkg from "../Menu Package/DayTabsMenupkg.js";
import { useHistory } from "react-router-dom";
import axios from "../../axiosInstance";
import TabMenuPkg from "./TabMenuPkg";
import MainCourse from "./MainCourse";
import Slicker from "./../Slick";
import { Update } from "@material-ui/icons";
//import { purple } from "@material-ui/core/colors";

export default function MenuPkg(props) {
  let history = useHistory();
  console.log(props.location.state);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [recentlyAddedFavourites, setRecentlyAddedFavourites] = useState([]);
  const [favouritesList, setFavouritesList] = useState([]);
  function handlePush() {
    history.push({
      pathname: "/",
    });
  }

  useEffect(() => {
    axios
      .get(`menu-categories?menu_id=` + props.location.state.mealData.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setCategory(res.data.data);
        filteredMenu(
          res.data.data[0].menu_id,
          res.data.data[0].id,
          res.data.data[0].name
        );
      })
      .catch((err) => console.log(err));

    fetchFavourites();
  }, []);

  const fetchFavourites = () => {
    axios
      .get("favourites")
      .then((res) => {
        var favourites = [];
        res.data.data.forEach((favourite) => {
          favourites.push(favourite.menu_item_id);
        });
        setFavouritesList([...favourites]);
      })
      .catch((err) => console.log(err));
  };

  const addInRecentLikeList = (data) => {
    var oldRecentlyAddedFavouritesList = recentlyAddedFavourites;
    oldRecentlyAddedFavouritesList.push(data);
    setRecentlyAddedFavourites([...oldRecentlyAddedFavouritesList]);
  };

  const filteredMenu = (menu_id, category_id, category_name) => {
    console.log(menu_id, category_id);
    setCategoryId(category_id);
    axios
      .get(
        `menu-items?menu_id=` + menu_id + `&menu_category_id=` + category_id,
        {}
      )
      .then((res) => {
        setCategoryName(category_name);

        setMenuItems(res.data.data);
        console.log(res.data.data);
      });
  };

  const renderCategory = menuItems.map((menuItem) => {
    // console.log(menuItem)
    // console.log(favouritesList)

    var mergedFavouriteList = favouritesList.concat(recentlyAddedFavourites);

    var ifFavourite = mergedFavouriteList.includes(menuItem.id);

    if (ifFavourite) {
      return (
        <MainCourse
          filterId={filter}
          key={Math.random()}
          menuItem={menuItem}
          defaultPic={props.location.state.mealData.picture}
          notifyAddedFavourite={addInRecentLikeList}
          favouriteItem={true}
        />
      );
    } else {
      return (
        <MainCourse
          filterId={filter}
          key={Math.random()}
          defaultPic={props.location.state.mealData.picture}
          menuItem={menuItem}
          notifyAddedFavourite={addInRecentLikeList}
        />
      );
    }
  });

  return (
    <div className="menu_package_main">
      <Mealchoose name="Menu Package" />
      <div id="menuPkg" className="menu_package_container">
        <div className="section1">
          <div className="meal_pkg_desc">
            <div>
              <img
                src={props.location.state.mealData.picture}
                className="rounded-circle card_img_rounded"
              ></img>
            </div>
            <div>
              <p className="meal-pkg-name">
                {props.location.state.mealData.name}
              </p>
              <p className="meal-pkg-note">
                {props.location.state.mealData.details}
              </p>
            </div>
          </div>
        </div>
        <div className="section2">
          {category && category.length > 0 && (
            <Slicker
              categories={category}
              filterMenu={filteredMenu}
              activeId={categoryId}
            />
          )}

          <h4>{categoryName}</h4>
          <div className="container">
            <div className="menuPckg-container">{renderCategory}</div>
          </div>
        </div>
      </div>
      {/* <div className="menupkg_container_main">
        <div className="row">
          <div className="card card_menupkg">
            <div className="row">
              <div className="col-lg-3 col-md-8 col-sm-5">
                <div style={{ display: "sticky" }}>
                  <div
                    style={{ background: "red" }}
                    className="row text-center"
                  >
                    <div className="col-md-3 col-sm-6">
                      <img
                        src={props.location.state.mealData.picture}
                        className="rounded-circle card_img_rounded"
                      ></img>
                    </div>
                    <div className="col-md-9 col-sm-6">
                      <div className="media-body content_media">
                        <h5 className="mt-0 immunne_text">
                          {props.location.state.mealData.name}
                        </h5>
                        <h5 className="mt-0 bhd_text">
                          {props.location.state.mealData.details}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-1" />
              <div className="col-lg-8 col-md-4 col-sm-6">
                <Slicker
                  categories={category}
                  filterMenu={filteredMenu}
                  activeId={categoryId}
                />
                <div className="container">
                  <h4 className="d-flex justify-content-center breakfast_name_menupkg mt-4 mb-4 font-weight-bold">
                    {categoryName}
                  </h4>
                  <div
                    className="menuPckg-container"
                    style={{ overflow: "scroll" }}
                  >
                    {renderCategory}
                  </div>
                </div>
              </div> */}

      {/* <div className="vertical_line_Menupkg"></div>

              <div className="col-lg-4 col-md-4 col-sm-12 btn_container_menupkg">
                <button className="buy_sub_menupkg" onClick={handlePush}>
                  Buy Subscription
                </button>
              </div> */}
      {/* </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
