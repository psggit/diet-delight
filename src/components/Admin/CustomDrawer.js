import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/logo.png";

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineMenu,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import axios from "../../axiosInstance";

import {
  useHistory,
  useRouteMatch,
  BrowserRouter as Router,
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
const Items = styled.h3`
  width: 100%;
  text-align: left;
  margin: 5px 0;
  margin-left: 15px;
  font-family: "Roboto Condensed Regular";
  cursor: pointer;
  letter-spacing: 1px;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const MiniItems = styled.h5`
  text-align: left;
  padding: 0 10px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 3px 0;
  margin-left: 15px;
`;

const Set = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.h3`
  text-align: center;
  font-family: "Roboto Condensed Regular";
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 300;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 20px;

  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`;

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#8BC53F",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
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

  const [user, setUser] = useState(false);
  const [question, setQuestions] = useState(false);
  const [consultant, setConsultant] = useState(false);
  const [consultationPackage, setConsultationPackage] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [menu, setMenu] = useState(false);
  const [meal, setMeal] = useState(false);
  const [listoforder, setListOfOrder] = useState(false);
  const [listOfCoupon, setListOfCoupon] = useState(false);
  const [listOfBlog, setListOfBlog] = useState(false);
  const [listOfDuration, setListOfDuration] = useState(false);
  const [report, setReport] = useState(false)
  
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

  let { path, url } = useRouteMatch();

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

  return (
    <>
      {Admin ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <AiOutlineMenu />
              </IconButton>
              <Info style={{ margin: "auto 0" }}>
                Diet Delight Admin Dashboard
              </Info>
              <Logout onClick={handleLogout}>
                <Items>LOGOUT</Items>
                <BiUserCircle
                  style={{ width: "30px", height: "30px", margin: "0 5px" }}
                />
              </Logout>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <img
                style={{
                  objectFit: "contain",
                  height: "55px",
                  alignSelf: "center",
                  margin: "auto",
                }}
                src={logo}
                alt="logo"
              />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <AiOutlineLeft />
                ) : (
                  <AiOutlineRight />
                )}
              </IconButton>
            </div>
            <Divider />
            <List color="primary">
              <ListItem button component={Link} to={"/admin"}>
                <ListItemText primary={"Dashboard"} />
              </ListItem>

              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={user}
                  onClick={() => {
                    setUser(!user);
                  }}
                >
                  USER
                </Items>
                {user ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {user && (
                <>
                  <Set>
                    {[
                      { label: "All User", link: "userlist" },
                      { label: "Add New User", link: "adduser" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={question}
                  onClick={() => {
                    setQuestions(!question);
                  }}
                >
                  QUESTIONS
                </Items>

                {question ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {question && (
                <>
                  <Set>
                    {[
                      { label: "All Questions", link: "questionlist" },
                      { label: "Add New Question", link: "addquestion" },
                      { label: "Answer List", link: "answerlist" },
                      { label: "Add Answer", link: "addanswer" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={consultant}
                  onClick={() => {
                    setConsultant(!consultant);
                  }}
                >
                  CONSULTANT
                </Items>
                {consultant ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {consultant && (
                <>
                  <Set>
                    {[
                      { label: "Consultant List", link: "consultantlist" },
                      { label: "Add Consultant", link: "addconsultant" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={consultationPackage}
                  onClick={() => {
                    setConsultationPackage(!consultationPackage);
                  }}
                >
                  CONSULTATION PACKAGE
                </Items>
                {consultationPackage ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {consultationPackage && (
                <>
                  <Set>
                    {[
                      {
                        label: "Consultation Package List",
                        link: "consultationPackageList",
                      },
                      {
                        label: "Add Consultation Package",
                        link: "addConsultationPackage",
                      },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={consultation}
                  onClick={() => {
                    setConsultation(!consultation);
                  }}
                >
                  CONSULTATION
                </Items>
                {consultation ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {consultation && (
                <>
                  <Set>
                    {[
                      { label: "Consultation List", link: "consultationlist" },
                      { label: "Add Consultation", link: "addconsultation" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={menu}
                  onClick={() => {
                    setMenu(!menu);
                  }}
                >
                  MENU
                </Items>
                {menu ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {menu && (
                <>
                  <Set>
                    {[
                      { label: "All Menu", link: "menulist" },
                      { label: "Add New Menu", link: "addmenu" },
                      { label: "All Categories", link: "categories" },
                      { label: "Add New Categories", link: "addcategories" },
                      { label: "All Menu Items", link: "menuitemslist" },
                      { label: "Add New Menu Items", link: "addnewmenuitems" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />

              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={meal}
                  onClick={() => {
                    setMeal(!meal);
                  }}
                >
                  MEALPLAN
                </Items>
                {meal ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {meal && (
                <>
                  <Set>
                    {[
                      { label: "All Meal Plan", link: "mealplanlist" },
                      { label: "Add New Meal Plan", link: "addnewmealplan" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={listoforder}
                  onClick={() => {
                    setListOfOrder(!listoforder);
                  }}
                >
                  ORDER
                </Items>
                {listoforder ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {listoforder && (
                <>
                  <Set>
                    {[
                      { label: "All Meal Purchase", link: "mealpurchaselist" },
                      {
                        label: "All Consultation Purchase",
                        link: "Consultationpurchaselist",
                      },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={listOfCoupon}
                  onClick={() => {
                    setListOfCoupon(!listOfCoupon);
                  }}
                >
                  COUPON / DISCOUNT
                </Items>
                {listOfCoupon ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {listOfCoupon && (
                <>
                  <Set>
                    {[
                      { label: "List of Coupon", link: "couponlist" },
                      { label: "Add Coupon", link: "addcoupon" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={listOfBlog}
                  onClick={() => {
                    setListOfBlog(!listOfBlog);
                  }}
                >
                  BLOGS
                </Items>
                {listOfBlog ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {listOfBlog && (
                <>
                  <Set>
                    {[
                      { label: "List of Blogs", link: "bloglist" },
                      { label: "Add Blog", link: "addblog" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={listOfDuration}
                  onClick={() => {
                    setListOfDuration(!listOfDuration);
                  }}
                >
                  Duration
                </Items>
                {listOfDuration ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {listOfDuration && (
                <>
                  <Set>
                    {[
                      { label: "List Duration", link: "durationlist" },
                      { label: "Add Duration", link: "addduration" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Items
                  value={report}
                  onClick={() => {
                    setReport(!report);
                  }}
                >
                  Report
                </Items>
                {report ? (
                  <AiOutlineUp style={{ marginRight: "10px" }} />
                ) : (
                  <AiOutlineDown style={{ marginRight: "10px" }} />
                )}
              </div>
              {report && (
                <>
                  <Set>
                    {[
                      { label: "List of Report", link: "reportlist" },
                      { label: "Add Report", link: "addreport" },
                    ].map((value, index) => (
                      <MiniItems key={index}>
                        <ListItem
                          button
                          component={Link}
                          to={"/admin/" + value.link}
                        >
                          <ListItemText primary={value.label} />
                        </ListItem>
                      </MiniItems>
                    ))}
                  </Set>
                </>
              )}
              <Divider />
            </List>
          </Drawer>
          <main
            onClick={handleDrawerClose}
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
            style={{ width: "100%" }}
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
              <Route exact path={`${path}/answerlist`}>
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
