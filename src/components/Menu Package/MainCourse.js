import React, { useState, useEffect } from "react";
import veg_icon from "../../assets/vegicon.png";
import "./TabMenuPkg.css";
import "./../Favourite/FavouriteComponent.css";

import axios from "../../axiosInstance";
import VegComponent from "../veg non veg component/VegComponent.js";
import NonvegComponent from "../veg non veg component/NonvegComponent.js";

export default function MainCourse(props) {
  console.log(props);
  const [likeColor, setLikeColor] = useState("fa fa-heart-o heart_menu_pkg");
  const [isMarking, setIsMarking] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  function colorHandle(menu_item_id) {
    if(!localStorage.getItem('access_token')){
      if(props.setOpenConfirmDialog)
        props.setOpenConfirmDialog(true);
      return
    }

    likeColor === "fa fa-heart-o heart_menu_pkg"
      ? setLikeColor("fa fa-heart heart_menu_pkg_fill")
      : setLikeColor("fa fa-heart-o heart_menu_pkg");
    handleLike(menu_item_id);
  }

  useEffect(() => {
    if (props.favouriteItem) {
      setLikeColor("fa fa-heart heart_menu_pkg_fill");
    } else {
      setLikeColor("fa fa-heart-o heart_menu_pkg");
    }
  }, [props.favouriteItem]);

  function handleLike(id) {
    setIsMarking(true);
    if (likeColor === "fa fa-heart-o heart_menu_pkg") {
      axios
        .post(`favourites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },

          menu_item_id: id,
        })
        .then((res) => {
          setIsMarking(false);
          console.log(res);
          // props.notifyAddedFavourite(props.menuItem.id)
          console.log("meet");
        })
        .catch((err) => {
          setIsMarking(false);
          console.log(err);
        });
    } else {
      axios
        .get(`favourites?menu_item_id=` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsMarking(false);
          setIsLoadingFav(true);
          let favouritesList = res.data.data;
          favouritesList.forEach((favourite) => {
            axios
              .delete(`favourites/` + favourite.id, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              })
              .then((res) => {
                setIsLoadingFav(false);
                // props.notifyAddedFavourite(props.menuItem.id)
                console.log(res);
              })
              .catch((err) => {
                setIsLoadingFav(false);
                console.log(err);
              });
          });
        })
        .catch((err) => {
          setIsMarking(false);
          console.log(err);
        });
    }
  }

  return (
    <>
      <div id="FavWrapper">
        <div className="imageContainer">
          <img
            src={
              props.menuItem.picture ? props.menuItem.picture : props.defaultPic
            }
            alt="food"
          />
        </div>
        <div className="note">
          <p>{props.menuItem.name}</p>
          <div className="icon">
            <div className="action-icon">
              {isMarking && (
                <i
                  className="fa fa-spinner fa-spin loader"
                  aria-hidden="true"
                ></i>
              )}
              {!isMarking && !props.isLoadingFav && (
                <i
                  className={likeColor}
                  aria-hidden="true"
                  onClick={() => colorHandle(props.menuItem.id)}
                ></i>
              )}
            </div>
            {props.menuItem.veg === 0 ? <VegComponent /> : <NonvegComponent />}
          </div>
        </div>
      </div>
    </>
    //     <div className="col-md-6 col-xs-12">

    //     <div className="card text-center card_border_menupkg">

    //     <div className="row">
    //     <div className="col-md-3 col-sm-12">
    //     <img  src={props.menuItem.picture} alt="food" className="rounded-circle tabmenu_roundedimg"></img>

    //     </div>
    //     <div className="col-md-7 col-sm-12">

    //     <div className="media-body content_media">
    //     <h5 className="something_text">{props.menuItem.name}</h5>
    // {/* <h5 className="something_about_text">About dish like crunch with something chrunchy and salad</h5> */}
    // </div>

    // </div>

    // <div className="col-lg-2 col-md-2 col-xs-12">

    //      {/*<VegComponent/> */}

    //      {props.menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}

    //     <i className={likeColor} aria-hidden="true" onClick={() => colorHandle(props.menuItem.id)}></i>

    //     <i className="" aria-hidden="true"></i>

    //     {/* <button style ={{height:50,width:100,backgroundColor:"green"}} onClick={handleLike}>
    //     <img src={unlike} alt="unlike" className="unlike_icon_menupkg"></img>
    // </button> */}
    // </div>

    // </div>

    // </div>

    // </div>
  );
}
