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
import { Update } from "@material-ui/icons";

export default function MenuPkg(props) {
  let history = useHistory();
  console.log(props.location.state);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
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
      <div style={{ position: "relative", top: 100 }}>
        <div className="menupkg_container_main">
          <div className="row justify-content-center">
            <div className="card card_menupkg">
              <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="row text-center">
                    <div className="col-md-3 col-sm-12">
                      <img
                        src={props.location.state.mealData.picture}
                        className="rounded-circle card_img_rounded"
                      ></img>
                    </div>
                    <div className="col-md-9 col-sm-12">
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
                {/* vertical line  start*/}
                <div className="vertical_line_Menupkg"></div>
                {/* vertical line  end */}

                <div className="col-lg-4 col-md-4 col-sm-12 btn_container_menupkg">
                  <button className="buy_sub_menupkg" onClick={handlePush}>
                    Buy Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          The drop will be conducted on a first come first serve basis, and
          handled through the decentralized SuperFarm protocol on SuperFarm.com.
          Each item will be minted by the user and available immediately in
          their wallet. For more information please refer to official SuperFarm
          telegram group. The drop will be conducted on a first come first serve
          basis, and handled through the decentralized SuperFarm protocol on
          SuperFarm.com. Each item will be minted by the user and available
          immediately in their wallet. For more information please refer to
          official SuperFarm telegram group. The drop will be conducted on a
          first come first serve basis, and handled through the decentralized
          SuperFarm protocol on SuperFarm.com. Each item will be minted by the
          user and available immediately in their wallet. For more information
          please refer to official SuperFarm telegram group.The drop will be
          conducted on a first come first serve basis, and handled through the
          decentralized SuperFarm protocol on SuperFarm.com. Each item will be
          minted by the user and available immediately in their wallet. For more
          information please refer to official SuperFarm telegram group.The drop
          will be conducted on a first come first serve basis, and handled
          through the decentralized SuperFarm protocol on SuperFarm.com. Each
          item will be minted by the user and available immediately in their
          wallet. For more information please refer to official SuperFarm
          telegram group.The drop will be conducted on a first come first serve
          basis, and handled through the decentralized SuperFarm protocol on
          SuperFarm.com. Each item will be minted by the user and available
          immediately in their wallet. For more information please refer to
          official SuperFarm telegram group.The drop will be conducted on a
          first come first serve basis, and handled through the decentralized
          SuperFarm protocol on SuperFarm.com. Each item will be minted by the
          user and available immediately in their wallet. For more information
          please refer to official SuperFarm telegram group.The drop will be
          conducted on a first come first serve basis, and handled through the
          decentralized SuperFarm protocol on SuperFarm.com. Each item will be
          minted by the user and available immediately in their wallet. For more
          information please refer to official SuperFarm telegram group.The drop
          will be conducted on a first come first serve basis, and handled
          through the decentralized SuperFarm protocol on SuperFarm.com. Each
          item will be minted by the user and available immediately in their
          wallet. For more information please refer to official SuperFarm
          telegram group.The drop will be conducted on a first come first serve
          basis, and handled through the decentralized SuperFarm protocol on
          SuperFarm.com. Each item will be minted by the user and available
          immediately in their wallet. For more information please refer to
          official SuperFarm telegram group.The drop will be conducted on a
          first come first serve basis, and handled through the decentralized
          SuperFarm protocol on SuperFarm.com. Each item will be minted by the
          user and available immediately in their wallet. For more information
          please refer to official SuperFarm telegram group.The drop will be
          conducted on a first come first serve basis, and handled through the
          decentralized SuperFarm protocol on SuperFarm.com. Each item will be
          minted by the user and available immediately in their wallet. For more
          information please refer to official SuperFarm telegram group.The drop
          will be conducted on a first come first serve basis, and handled
          through the decentralized SuperFarm protocol on SuperFarm.com. Each
          item will be minted by the user and available immediately in their
          wallet. For more information please refer to official SuperFarm
          telegram group.The drop will be conducted on a first come first serve
          basis, and handled through the decentralized SuperFarm protocol on
          SuperFarm.com. Each item will be minted by the user and available
          immediately in their wallet. For more information please refer to
          official SuperFarm telegram group.The drop will be conducted on a
          first come first serve basis, and handled through the decentralized
          SuperFarm protocol on SuperFarm.com. Each item will be minted by the
          user and available immediately in their wallet. For more information
          please refer to official SuperFarm telegram group.The drop will be
          conducted on a first come first serve basis, and handled through the
          decentralized SuperFarm protocol on SuperFarm.com. Each item will be
          minted by the user and available immediately in their wallet. For more
          information please refer to official SuperFarm telegram group.The drop
          will be conducted on a first come first serve basis, and handled
          through the decentralized SuperFarm protocol on SuperFarm.com. Each
          item will be minted by the user and available immediately in their
          wallet. For more information please refer to official SuperFarm
          telegram group.
        </div> */}

        {/* tabs start */}

        <DayTabsMenupkg categories={category} filterMenu={filteredMenu} />
        {/* <div style={{ margin: "30px 0" }}>
        <div>dsfsd</div>
      </div> */}
        <div className="container">
          <h4 className="d-flex justify-content-center breakfast_name_menupkg mt-4 mb-4 font-weight-bold">
            {categoryName}
          </h4>
          <div className="menuPckg-container">{renderCategory}</div>
          {/* <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row">{renderCategory}</div>
            </div>
            <div className="col-md-1"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
