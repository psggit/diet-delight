import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import logo from "../../assets/logo.png"

import { AiOutlineLeft, AiOutlineRight, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

import axios from '../../axiosInstance'

import { useHistory } from 'react-router-dom';
import { selectAdmin, SetFalse, SetTrue } from '../../features/userSlice'
import { resetMealPlan,resetConsultation, resetQuestion, resetTemp,resetConsultationPackage,resetMenu, resetCategory,resetMenuItem,resetListOfOrder,resetListOfAnswer,resetListOfDuration ,resetListOfBlog,resetListOfKitchenReport} from '../../features/adminSlice'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import Home from './home'

import ListofUser from './user/ListofUser';
import PostUser from './user/PostUser';

import ListofQuestions from './questions/ListofQuestions';
import AddQuestion from './questions/AddQuestion';

import ListConsultationPackage from './ConsultationPackage/ListConsultationPackage';
import AddConsultationPackage from './ConsultationPackage/AddConsultationPackage';

import ListofConsultation from './Consultations/ListofConsultation';
import PostConsultation from './Consultations/PostConsultation';

import ListofMenu from './Menu/ListofMenu';
import AddMenu from './Menu/AddMenu';
import ListofCategory from './Menu/ListofCategory';
import AddCategory from './Menu/AddCategory'
import ImportMenu from './Menu/ImportMenu'

import ListofMenuItem from './Menu/ListofMenuItem';
import AddMenuItem from './Menu/AddMenuItem';

 import ListOfCoupon from './Coupon/ListofCoupon';
 import PostCoupon from './Coupon/PostCoupon';

import ListofConsultants from './consultant/ListofConsultants';

import ListofMealPlan from './Mealplan/ListofMealPlan';
import AddMealPlan from './Mealplan/AddMealPlan';
import PostConsultant from './consultant/PostConsultant';

import ListofOrderList from './Order/ListofOrderList';
import PostOrder from './Order/PostOrder';

import ListofDuration from './Duration/ListofDuration';
import PostDuration from './Duration/PostDuration';

import ListofAnswer from './questions/ListofAnswer';
import PostAnswer from './questions/AddAnswer';

import ListofBlog from './Blogs/ListofBlog';
import PostBlog from './Blogs/PostBlog';
import ListofDeliverysticker from './KitchenReport/ListofDeliverysticker';
import ListofClientMealMenu from './KitchenReport/ListofClientMealMenu';
const Items = styled.h3`
    width:100%;
    text-align:left;  
    margin: 5px 0;
    margin-left: 15px;
    font-family:"Roboto Condensed Regular";
    cursor:pointer;
    letter-spacing: 1px;
    font-size:1.2rem;
    text-transform: uppercase;
`

const MiniItems = styled.h5`
    text-align:left;
    padding:0 10px;
    font-size:0.9rem;
    cursor:pointer;
    margin:3px 0;
    margin-left: 15px;
`

const Set = styled.div`
    display:flex;
    flex-direction:column;
`

const Info = styled.h3`
    text-align:center;  
    font-family:"Roboto Condensed Regular";
    cursor:pointer;
    font-size:1.2rem;
    font-weight:300;
`

const Logout = styled.div`
    display:flex;
    align-items:center;
    margin-left:auto;
    padding:0 20px;

    @media only screen and (max-width:500px){
        padding:0;
    }

`

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#8BC53F",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {

    let history = useHistory();
    const dispatch = useDispatch();
    const cookie = new Cookies()

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [home, setHome] = useState(true)


    const [user, setUser] = useState(false)
    const [user1, setUser1] = useState(false)
    const [user2, setUser2] = useState(false)

    const [question, setQuestions] = useState(false)
    const [question1, setQuestion1] = useState(false)
    const [question2, setQuestion2] = useState(false)

    const [consultant, setConsultant] = useState(false)
    const [consultant1, setConsultant1] = useState(false)
    const [consultant2, setConsultant2] = useState(false)


    const [meal, setMeal] = useState(false)
    const [meal1, setMeal1] = useState(false)
    const [meal2, setMeal2] = useState(false)




    const [consultationPackage, setConsultationPackage] = useState(false)
    const [consultationPackage1, setConsultationPackage1] = useState(false)
    const [consultationPackage2, setConsultationPackage2] = useState(false)

    const [consultation, setConsultation] = useState(false)
    const [consultation1, setConsultation1] = useState(false)
    const [consultation2, setConsultation2] = useState(false)

    const [menu, setMenu] = useState(false)
    const [menu2, setMenu2] = useState(false)
    const [importMenu,setImportMenu] = useState(false)

    const [category,setCategory] = useState(false) 
    const [category1,setCategory1] = useState(false)
    const [category2,setCategory2] = useState(false)


    const [menuitem,setMenuItem] = useState(false)
    const [menuitem2,setMenuItem2] = useState(false)

    const [listoforder, setListOfOrder] = useState(false)
    const [listoforder1,setListOfOrder1] = useState(false)
    const [listoforder2,setListOfOrder2] = useState(false)

    const [listOfCoupon, setListOfCoupon] = useState(false)
    const [listOfCoupon1,setListOfCoupon1] = useState(false)
    const [listOfCoupon2,setListOfCoupon2] = useState(false)

    const [listofanswer, setListOfAnswer] = useState(false)
    const [listofanswer1, setListOfAnswer1] = useState(false)
    const [listofanswer2, setListOfAnswer2] = useState(false)

    const [listOfDuration, setListOfDuration] = useState(false)
    const [listOfDuration1, setListOfDuration1] = useState(false)
    const [listOfDuration2, setListOfDuration2] = useState(false)

    const [listOfBlog, setListOfBlog] = useState(false)
    const [listOfBlog1, setListOfBlog1] = useState(false)
    const [listOfBlog2, setListOfBlog2] = useState(false)

    const [listOfKitchenReport, setListOfKitchenReport] = useState(false)
    const [listOfKitchenReport1, setListOfKitchenReport1] = useState(false)
    const [listOfKitchenReport2, setListOfKitchenReport2] = useState(false)

    useEffect(() => {
        dispatch(resetTemp())
        dispatch(resetQuestion())
        dispatch(resetMealPlan())
        dispatch(resetConsultationPackage())
        dispatch(resetConsultation())
        dispatch(resetMenu())
        dispatch(resetCategory()) 
        dispatch(resetMenuItem())
        dispatch(resetListOfOrder())
        dispatch(resetListOfAnswer())
        dispatch(resetListOfDuration())
        dispatch(resetListOfBlog())
        dispatch(resetListOfKitchenReport())
    }, [dispatch])

    const Admin = useSelector(selectAdmin)

    if (localStorage.getItem('isAdmin')) {
        dispatch(SetTrue());
    }

    const handleLogout = (e) => {
        e.preventDefault();

        axios.get('logout').then(res => console.log(res)).catch(err => console.log(err))
        dispatch(SetFalse())
        cookie.remove("access_token")
        localStorage.clear();
        history.push("/");
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {   Admin ?
                (<div className={classes.root}>
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
                                <Items>
                                    LOGOUT
                        </Items>
                                <BiUserCircle style={{ width: "30px", height: "30px", margin: "0 5px" }} />
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
                        <img style={{ objectFit: "contain", height: "55px", alignSelf: "center", margin: "auto" }} src={logo} alt="logo" />
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <AiOutlineLeft /> : <AiOutlineRight />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List color="primary">
                            <Items value={home}
                                onClick={() => {
                                    setHome(true)
                                    setUser1(false)
                                    setUser2(false)
                                    setQuestion1(false)
                                    setQuestion2(false)
                                    setConsultant1(false)
                                    setConsultant2(false)
                                    setMeal1(false)
                                    setMeal2(false)
                                    setConsultationPackage1(false)
                                    setConsultationPackage2(false)
                                    setConsultation1(false)
                                    setConsultation2(false)
                                    setMenu(false)
                                    setMenu2(false)
                                    setCategory1(false)
                                    setCategory2(false)
                                    setMenuItem(false)
                                    setMenuItem2(false)
                                    setImportMenu(false)
                                    setListOfOrder1(false)
                                    setListOfOrder2(false)
                                    setListOfCoupon1(false)
                                    setListOfCoupon2(false)
                                }}
                            >
                                Dashboard
                        </Items>
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={user}
                                    onClick={() => {
                                        setUser(!user)
                                    }}
                                >
                                    USER
                                </Items>
                                {user ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {user &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={user1} onClick={() => {
                                          
                                            setHome(false)
                                            setUser1(true)
                                            setUser2(false)
                                            setQuestion1(false)
                                            setQuestion2(false)
                                            setConsultant1(false)
                                            setConsultant2(false)
                                            setMeal1(false)
                                            setMeal2(false)
                                            setConsultationPackage1(false)
                                            setConsultationPackage2(false)
                                            setConsultation1(false)
                                            setConsultation2(false)
                                            setMenu(false)
                                            setMenu2(false)
                                            setCategory1(false)
                                            setCategory2(false)
                                            setMenuItem(false)
                                            setMenuItem2(false)
                                            setListOfOrder1(false)
                                            setListOfOrder2(false)
                                            setListOfCoupon1(false)
                                            setListOfCoupon2(false)
                                            setImportMenu(false)
                                        }}>All User</MiniItems>
                                        <Divider />
                                        <MiniItems value={user2} onClick={() => {
                                            setHome(false)
                                            setUser1(false)
                                            setUser2(true)
                                            setQuestion1(false)
                                            setQuestion2(false)
                                            setConsultant1(false)
                                            setConsultant2(false)
                                            setMeal1(false)
                                            setMeal2(false)
                                            setConsultationPackage1(false)
                                            setConsultationPackage2(false)
                                            setConsultation1(false)
                                            setConsultation2(false)
                                            setMenu(false)
                                            setMenu2(false)
                                            setCategory1(false)
                                            setCategory2(false)
                                            setMenuItem(false)
                                            setMenuItem2(false)
                                            setListOfOrder1(false)
                                            setListOfOrder2(false)
                                            setListOfCoupon1(false)
                                            setListOfCoupon2(false)
                                            setImportMenu(false)
                                        }}>Add New User</MiniItems>
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={question}
                                    onClick={() => {
                                        setQuestions(!question)
                                    }}
                                >
                                    QUESTIONS
                                </Items>

                                {question ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}

                            </div>
                            {question &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={question1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(true)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All Questions</MiniItems>
                                        <Divider />
                                        <MiniItems value={question2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(true)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >Add New Question</MiniItems>
                                          <Divider />
                                         <MiniItems value={listofanswer1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfAnswer1(true)
                                                setListOfAnswer2(false)
                                                setImportMenu(false)
                                              
                                            }}
                                        >All Answer</MiniItems>
                                          <Divider />
                                         <MiniItems value={listofanswer2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfAnswer1(false)
                                                setListOfAnswer2(true)                                            
                                                setImportMenu(false)
                                            }}
                                        >Add Answer</MiniItems>
                                       
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={consultant}
                                    onClick={() => {
                                        setConsultant(!consultant)
                                    }}
                                >
                                    CONSULTANT
                            </Items>
                                {consultant ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {consultant &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={consultant1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(true)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All Consultants</MiniItems>
                                        <Divider />
                                        <MiniItems value={setQuestion2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(true)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >Add New Consultant</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={consultationPackage}
                                    onClick={() => {
                                        setConsultationPackage(!consultationPackage)
                                    }}
                                >
                                CONSULTATION PACKAGE
                                </Items>
                                {consultationPackage ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {consultationPackage &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={consultationPackage}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(true)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All Consultation package</MiniItems>
                                        <Divider />
                                        <MiniItems value={consultationPackage2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(true)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>Add new Consultation package</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={consultation}
                                    onClick={() => {
                                        setConsultation(!consultation)
                                    }} 
                                >
                                CONSULTATION
                                </Items>
                                {consultation ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {consultation &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={consultation1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(true)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >New Consultation</MiniItems>
                                        <Divider />
                                        <MiniItems value={consultation2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(true)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>All Consultation</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={menu}
                                    onClick={() => {
                                        setMenu(!menu)
                                    }}
                                >
                                MENU
                                </Items>
                                {menu ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {menu &&
                                (<>
                                    <Set> 
                                        <Divider />
                                        <MiniItems value={menu}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false) 
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(true)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All Menu</MiniItems>
                                        <Divider />
                                        <MiniItems value={menu2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(true)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>Add New Menu</MiniItems>
                                             <Divider />
                                        <MiniItems value={category1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false) 
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(true)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>All categories</MiniItems>
                                             <Divider />
                                        <MiniItems value={category2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(true)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>Add New category</MiniItems>
                                             <Divider />
                                        <MiniItems value={menuitem}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(true)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>All Menu Items</MiniItems>
                                             <Divider />
                                        <MiniItems value={menuitem2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(true)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>Add New Menu Items</MiniItems>
                                        <Divider />
                                        <MiniItems value={menuitem2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(true)
                                            }}>Import Menu Items</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />

                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={meal}
                                    onClick={() => {
                                        setMeal(!meal)
                                    }}
                                >
                                    MEALPLAN
                                </Items>
                                {meal ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {meal &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={meal1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(true)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All MealPlan</MiniItems>
                                        <Divider />
                                        <MiniItems value={meal2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(true)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>Add New MealPlan</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listoforder}
                                    onClick={() => {
                                        setListOfOrder(!listoforder)
                                    }}
                                >
                               ORDER
                                </Items>
                                {listoforder ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listoforder &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={listoforder1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(true)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >All Meal Purchase</MiniItems>
                                        <Divider />
                                        <MiniItems value={listoforder2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(true)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}>All Consultation Purchase</MiniItems>
                                    </Set>
                                </>)}
                                <Divider />
                                <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listOfCoupon}
                                    onClick={() => {
                                        setListOfCoupon(!listOfCoupon)
                                    }}
                                >
                               COUPON / DISCOUNT
                                </Items>
                                {listOfCoupon ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listOfCoupon &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={listOfCoupon1}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(true)
                                                setListOfCoupon2(false)
                                                setImportMenu(false)
                                            }}
                                        >List of Coupon</MiniItems>
                                        <Divider />
                                        <MiniItems value={listOfCoupon2}
                                            onClick={() => {
                                                setHome(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setMeal2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setConsultation1(false)
                                                setConsultation2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(true)
                                                setImportMenu(false)
                                            }}>Add Coupon</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listOfBlog}
                                    onClick={() => {
                                        setListOfBlog(!listOfBlog)
                                    }}
                                >
                               BLOGS
                                </Items>
                                {listOfBlog ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listOfBlog &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={listOfBlog1}
                                            onClick={() => {
                                                setMeal1(false)
                                                setMeal2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfBlog1(true)
                                                setListOfBlog2(false)
                                                setImportMenu(false)
                                            }}
                                        >List of Blogs</MiniItems>
                                        <Divider />
                                        <MiniItems value={listOfCoupon2}
                                            onClick={() => {
                                                setMeal2(false)
                                                setMeal1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                 setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfBlog1(false)
                                                setListOfBlog2(true)
                                                setImportMenu(false)
                                            }}>Add Blogs</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listOfDuration}
                                    onClick={() => {
                                        setListOfDuration(!listOfDuration)
                                    }}
                                >
                               Duration
                                </Items>
                                {listOfDuration ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listOfDuration &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={listOfDuration1}
                                            onClick={() => {
                                                setMeal1(false)
                                                setMeal2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfDuration1(true)
                                                setListOfDuration2(false)
                                                setImportMenu(false)
                                            }}
                                        >List of Duration</MiniItems>
                                        <Divider />
                                        <MiniItems value={listOfDuration2}
                                            onClick={() => {
                                                setMeal2(false)
                                                 setMeal1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfDuration1(false)
                                                setListOfDuration2(true)
                                                setImportMenu(false)
                                            }}>Add Duration</MiniItems>
                                    </Set>
                                </>)}
                           <Divider/>
                           <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listOfDuration}
                                    onClick={() => {
                                        setListOfDuration(!listOfDuration)
                                    }}
                                >
                               Report
                                </Items>
                                {listOfDuration ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listOfDuration &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems
                               
                                            
                                        >List of Report</MiniItems>
                                        <Divider />
                                        <MiniItems
                                           
                                            >Add Report</MiniItems>
                                    </Set>
                                </>)}
                           <Divider/>
                           <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={listOfKitchenReport}
                                    onClick={() => {
                                        setListOfKitchenReport(!listOfKitchenReport)
                                    }}
                                >
                               KITCHEN REPORT
                                </Items>
                                {listOfKitchenReport ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {listOfKitchenReport &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={listOfKitchenReport1}
                                            onClick={() => {
                                                setMeal1(false)
                                                setMeal2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfOrder1(false)
                                                setListOfOrder2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfDuration1(false)
                                                setListOfDuration2(false)
                                                setImportMenu(false)
                                                setListOfKitchenReport1(true)
                                                setListOfKitchenReport2(false)
                                            }}
                                        >Delivery sticker</MiniItems>
                                        <Divider />
                                        <MiniItems value={listOfKitchenReport2}
                                            onClick={() => {
                                                setMeal2(false)
                                                 setMeal1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                                setConsultationPackage1(false)
                                                setConsultationPackage2(false)
                                                setMenu(false)
                                                setMenu2(false)
                                                setCategory1(false)
                                                setCategory2(false)
                                                setMenuItem(false)
                                                setMenuItem2(false)
                                                setListOfCoupon1(false)
                                                setListOfCoupon2(false)
                                                setListOfDuration1(false)
                                                setListOfDuration2(false)
                                                setImportMenu(false)
                                                setListOfKitchenReport2(true)
                                                setListOfKitchenReport1(false)
                                            }}>Client Meal Menu</MiniItems>
                                    </Set>
                                </>)}
                           <Divider/>
                           
                        </List>
                    </Drawer> 
                    <main
                        onClick={handleDrawerClose}
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />

                        {home && (<Home />)}

                        {user1 && (<ListofUser />)}
                        {user2 && (<PostUser />)}


                        {question1 && (<ListofQuestions />)} 
                        {question2 && (<AddQuestion />)}

                        {consultationPackage1 && (<AddConsultationPackage />)}
                        {consultationPackage2 && (<ListConsultationPackage />)}

                        {consultation1 && (<PostConsultation />)}
                        {consultation2 && (<ListofConsultation />)}

                        {menu && (<AddMenu />)}
                        {menu2 && (<ListofMenu />)}

                        {category1 && (<ListofCategory />)}
                        {category2 && (<AddCategory />)}

                        {menuitem && (<ListofMenuItem />)}
                        {menuitem2 && (<AddMenuItem />)}

                        {importMenu && <ImportMenu/>}

                        {consultant1 && (<ListofConsultants />)}
                        {consultant2 && (<PostConsultant />)}

                        {meal1 && (<ListofMealPlan />)}
                        {meal2 && (<AddMealPlan />)}
 
                        {listoforder1 && (<ListofOrderList />)}
                        {listoforder2 && (<PostOrder />)}

                        {listOfCoupon1 && (<ListOfCoupon />)}
                        {listOfCoupon2 && (<PostCoupon />)}

                        {listofanswer1 && (<ListofAnswer />)}
                        {listofanswer2 && (<PostAnswer />)}

                        {listOfDuration1 && (<ListofDuration />)}
                        {listOfDuration2 && (<PostDuration />)}

                        {listOfBlog1 && (<ListofBlog />)}
                        {listOfBlog2 && (<PostBlog />)}

                        {listOfKitchenReport1 && (<ListofDeliverysticker />)}
                        {listOfKitchenReport2 && (<ListofClientMealMenu />)}

                    </main>
                </div>
                ) :
                (<div>
                    YOU ARE NOT AUTHORIZE
                </div>)}
        </>
    );
}
