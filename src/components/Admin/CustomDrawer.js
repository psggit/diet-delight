import React, { useState, useEffect } from "react";
import { elastic as Menu } from 'react-burger-menu'

import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import logo from "../../assets/logo.png";
import './CustomDrawer.css';
import { ExitToApp } from '@material-ui/icons';

import CustomNavList from "./components/CustomNavList";
import { USER_TYPE } from './Constants';
import axios from "../../axiosInstance";

import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { selectAdmin, SetFalse, SetTrue } from "../../features/userSlice";
import {
  resetMealPlan,
  resetConsultation,
  resetQuestion,
  resetTemp,
  resetConsultationPackage,
  resetMenu,
  resetCategory,
  resetMenuItem,
  resetListOfOrder,
  resetListOfAnswer,
  resetListOfDuration,
  resetListOfBlog,
} from "../../features/adminSlice";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Cookies } from "react-cookie";
import Home from "./home";

import ListofUser from "./user/ListofUser";
import PostUser from "./user/PostUser";

import ListofQuestions from "./questions/ListofQuestions";
import AddQuestion from "./questions/AddQuestion";

import ListConsultationPackage from "./ConsultationPackage/ListConsultationPackage";
import AddConsultationPackage from "./ConsultationPackage/AddConsultationPackage";

import ListofConsultation from "./Consultations/ListofConsultation";
import PostConsultation from "./Consultations/PostConsultation";

import ListofMenu from "./Menu/ListofMenu";
import AddMenu from "./Menu/AddMenu";
import ListofCategory from "./Menu/ListofCategory";
import AddCategory from "./Menu/AddCategory";

import ListofMenuItem from "./Menu/ListofMenuItem";
import AddMenuItem from "./Menu/AddMenuItem";

import ListOfCoupon from "./Coupon/ListofCoupon";
import PostCoupon from "./Coupon/PostCoupon";

import ListofConsultants from "./consultant/ListofConsultants";

import ListofMealPlan from "./Mealplan/ListofMealPlan";
import AddMealPlan from "./Mealplan/AddMealPlan";
import PostConsultant from "./consultant/PostConsultant";

import ListofOrderList from "./Order/ListofOrderList";
import PostOrder from "./Order/PostOrder";

import ListofDuration from "./Duration/ListofDuration";
import PostDuration from "./Duration/PostDuration";

import ListofAnswer from "./questions/ListofAnswer";
import PostAnswer from "./questions/AddAnswer";

import ListofBlog from "./Blogs/ListofBlog";
import PostBlog from "./Blogs/PostBlog";

const HeaderLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  &:focus {
    outline: none;
  }
`;

const LogoutContainer = styled.div`
  position: absolute;
  bottom: 16px;
  cursor: pointer;
`;

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#800080'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#800080'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  let history = useHistory();
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [listKey, setListKey] = useState('');

  useEffect(() => {
    dispatch(resetTemp());
    dispatch(resetQuestion());
    dispatch(resetMealPlan());
    dispatch(resetConsultationPackage());
    dispatch(resetConsultation());
    dispatch(resetMenu());
    dispatch(resetCategory());
    dispatch(resetMenuItem());
    dispatch(resetListOfOrder());
    dispatch(resetListOfAnswer());
    dispatch(resetListOfDuration());
    dispatch(resetListOfBlog());
  }, [dispatch]);

  let { path } = useRouteMatch();

  const Admin = useSelector(selectAdmin);

  if (localStorage.getItem("isAdmin")) {
    dispatch(SetTrue());
  }

  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .get("logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(SetFalse());
    cookie.remove("access_token");
    localStorage.clear();
    history.push("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (key) => {
    setListKey(key === listKey ? '' : key)
  }

  return (
    <>
      {Admin ? (
        <div id="outer-container">
          <Menu
            className="app-drawer"
            styles={styles}
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          >
            <div>
              <List color="primary">
                <ListItem button component={Link} to={"/admin"} style={{ marginBottom: "32px" }}>
                  <HeaderLogo style={{ display: 'flex' }}>
                    <img
                      style={{
                        objectFit: "contain",
                        height: "75px",
                        alignSelf: "center",
                        margin: "auto",
                      }}
                      src={logo}
                      alt="logo"
                    />
                  </HeaderLogo>
                </ListItem>
                <CustomNavList
                  name="user"
                  open={listKey === 'user'}
                  handleClick={handleMenuOpen}
                  primaryLabel="USER"
                  navList={[
                    { label: "Accountant", link: `userlist?type=${USER_TYPE.ACCOUNTANT}` },
                    { label: "Admin", link: `userlist?type=${USER_TYPE.ADMIN}` },
                    { label: "Consultants", link: "consultantlist" },
                    { label: "Customer", link: `userlist?type=${USER_TYPE.CUSTOMER}` },
                    { label: "Kitchen", link: `userlist?type=${USER_TYPE.KITCHEN}` },
                  ]}
                />
                <CustomNavList
                  name="question"
                  open={listKey === 'question'}
                  handleClick={handleMenuOpen}
                  primaryLabel="QUESTIONNAIRE"
                  navList={[
                    { label: "All Questions", link: "questionlist" },
                    { label: "Customer Responses", link: "customer-response" },
                  ]}
                />
                <CustomNavList
                  name="consultationPackage"
                  open={listKey === 'consultationPackage'}
                  handleClick={handleMenuOpen}
                  primaryLabel="CONSULTATION PACKAGE"
                  navList={[
                    {
                      label: "Consultation Package List",
                      link: "consultationPackageList",
                    },
                  ]}
                />

                <CustomNavList
                  name="consultation"
                  open={listKey === 'consultation'}
                  handleClick={handleMenuOpen}
                  primaryLabel="CONSULTATION"
                  navList={[
                    { label: "Consultations", link: "consultationlist" },
                    { label: "Past Consultations", link: "consultationlist?type=past" },
                  ]}
                />

                <CustomNavList
                  name="menu"
                  open={listKey === 'menu'}
                  handleClick={handleMenuOpen}
                  primaryLabel="MENU"
                  navList={[
                    { label: "All Menu", link: "menulist" },
                    { label: "Add New Menu", link: "addmenu" },
                    { label: "All Categories", link: "categories" },
                    { label: "Add New Categories", link: "addcategories" },
                    { label: "All Menu Items", link: "menuitemslist" },
                    { label: "Add New Menu Items", link: "addnewmenuitems" },
                  ]}
                />
                <CustomNavList
                  name="mealPlan"
                  open={listKey === 'mealPlan'}
                  handleClick={handleMenuOpen}
                  primaryLabel="MEAL PLAN"
                  navList={[
                    { label: "All Meal Plan", link: "mealplanlist" },
                    { label: "Add New Meal Plan", link: "addnewmealplan" },
                  ]}
                />

                <CustomNavList
                  name="order"
                  open={listKey === 'order'}
                  handleClick={handleMenuOpen}
                  primaryLabel="ORDER"
                  navList={[
                    { label: "All Meal Purchase", link: "mealpurchaselist" },
                    {
                      label: "All Consultation Purchase",
                      link: "Consultationpurchaselist",
                    },
                  ]}
                />
                <CustomNavList
                  name="coupon"
                  open={listKey === 'coupon'}
                  handleClick={handleMenuOpen}
                  primaryLabel="COUPON / DISCOUNT"
                  navList={[
                    { label: "List of Coupon", link: "couponlist" },
                    { label: "Add Coupon", link: "addcoupon" },
                  ]}
                />
                <CustomNavList
                  name="blog"
                  open={listKey === 'blog'}
                  handleClick={handleMenuOpen}
                  primaryLabel="BLOGS"
                  navList={[
                    { label: "List of Blogs", link: "bloglist" },
                    { label: "Add Blog", link: "addblog" },
                  ]}
                />

                <CustomNavList
                  name="duration"
                  open={listKey === 'duration'}
                  handleClick={handleMenuOpen}
                  primaryLabel="DURATION"
                  navList={[
                    { label: "List Duration", link: "durationlist" },
                    { label: "Add Duration", link: "addduration" },
                  ]}
                />
              </List>
              <LogoutContainer onClick={handleLogout}><ExitToApp style={{ fontSize: "56px", margin: "0 12px", width: '50px' }} /><span>LOGOUT</span></LogoutContainer>
            </div>
          </Menu>
          <main
            id="page-wrap"
            style={{ width: "100%", padding: "16px 32px 0 32px" }}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path={`${path}`}>
                <Home />
              </Route>
              <Route exact path={`${path}/userlist`}>
                <ListofUser />
              </Route>
              <Route exact path={`${path}/adduser`}>
                <PostUser />
              </Route>
              <Route exact path={`${path}/questionlist`}>
                <ListofQuestions />
              </Route>
              <Route exact path={`${path}/addquestion`}>
                <AddQuestion />
              </Route>
              <Route exact path={`${path}/customer-response`}>
                <ListofAnswer />
              </Route>
              <Route exact path={`${path}/addanswer`}>
                <PostAnswer />
              </Route>
              <Route exact path={`${path}/consultantlist`}>
                <ListofConsultants />
              </Route>
              <Route exact path={`${path}/addconsultant`}>
                <PostConsultant />
              </Route>
              <Route exact path={`${path}/consultationPackageList`}>
                <ListConsultationPackage />
              </Route>
              <Route exact path={`${path}/addConsultationPackage`}>
                <AddConsultationPackage />
              </Route>
              <Route exact path={`${path}/consultationlist`}>
                <ListofConsultation />
              </Route>
              <Route exact path={`${path}/addconsultation`}>
                <PostConsultation />
              </Route>
              <Route exact path={`${path}/menulist`}>
                <ListofMenu />
              </Route>
              <Route exact path={`${path}/addmenu`}>
                <AddMenu />
              </Route>
              <Route exact path={`${path}/categories`}>
                <ListofCategory />
              </Route>
              <Route exact path={`${path}/addcategories`}>
                <AddCategory />
              </Route>
              <Route exact path={`${path}/menuitemslist`}>
                <ListofMenuItem />
              </Route>
              <Route exact path={`${path}/addnewmenuitems`}>
                <AddMenuItem />
              </Route>
              <Route exact path={`${path}/mealplanlist`}>
                <ListofMealPlan />
              </Route>
              <Route exact path={`${path}/addnewmealplan`}>
                <AddMealPlan />
              </Route>
              <Route exact path={`${path}/mealpurchaselist`}>
                <ListofOrderList />
              </Route>
              <Route exact path={`${path}/Consultationpurchaselist`}>
                <PostOrder />
              </Route>
              <Route exact path={`${path}/couponlist`}>
                <ListOfCoupon />
              </Route>
              <Route exact path={`${path}/addcoupon`}>
                <PostCoupon />
              </Route>

              <Route exact path={`${path}/durationlist`}>
                <ListofDuration />
              </Route>
              <Route exact path={`${path}/addduration`}>
                <PostDuration />
              </Route>

              <Route exact path={`${path}/bloglist`}>
                <ListofBlog />
              </Route>
              <Route exact path={`${path}/addblog`}>
                <PostBlog />
              </Route>
            </Switch>
          </main>
        </div>
      ) : (
        <div>YOU ARE NOT AUTHORIZE</div>
      )}
    </>
  );
}
