import React from "react";
import "./css/bootstrap.min.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/custom.css";
// import './css/nice-select.css'
import about_img from "./images/about-img.png";
import img_1 from "./images/img-1.jpg";
import img_2 from "./images/img-2.jpg";
import img_3 from "./images/img-3.jpg";
import img_pro_01 from "./images/img-pro-01.jpg";
import img_pro_02 from "./images/img-pro-02.jpg";
import img_pro_03 from "./images/img-pro-03.jpg";
import img_pro_04 from "./images/img-pro-04.jpg";
import ins_bg from "./images/ins-bg.jpg";
import instagram_img_01 from "./images/instagram-img-01.jpg";
import instagram_img_02 from "./images/instagram-img-02.jpg";
import instagram_img_03 from "./images/instagram-img-03.jpg";
import instagram_img_04 from "./images/instagram-img-04.jpg";
import instagram_img_05 from "./images/instagram-img-05.jpg";
import instagram_img_06 from "./images/instagram-img-06.jpg";
import instagram_img_07 from "./images/instagram-img-07.jpg";
import instagram_img_08 from "./images/instagram-img-08.jpg";
import instagram_img_09 from "./images/instagram-img-09.jpg";

import Footer from "../Landing_Page/Footer/index";
import Navbar from "../Navbar/index";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>ABOUT US</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="about-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-frame">
                {" "}
                <img className="img-fluid" src={about_img} alt=""></img>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="noo-sh-title-top">
                We are <span>Freshshop</span>
              </h2>
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Trusted</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Professional</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Expert</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="instagram-box">
        <div className="main-instagram owl-carousel owl-theme">
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_01} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_02} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_03} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_04} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_05} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_06} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_07} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_08} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_09} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src={instagram_img_05} alt=""></img>
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
