import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';

import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Line as GraphLine,
} from 'recharts';
import { Card, CardContent, Typography, makeStyles, CardActions, Button } from "@material-ui/core";
import { Heading, Line, Subheading } from '../../MainComponents'
import { Set } from './HomeElements';


import axios from '../../../axiosInstance'
import people from '../../../assets/people.png'
import questionImage from '../../../assets/question.png'
import consultantImage from '../../../assets/consultant.png'
import PlanImage from '../../../assets/plans.png'
import { useHistory } from "react-router-dom";
import FeatureList from './FeatureList';

const Main = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100vh;
    background-color:white;
`

export const Title = styled.p`
    font-size:${props => props.size ? props.size : "1rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    width:${props => props.width ? props.width : "100%"};
    font-family:"Open Sans";
    text-align:center;
    padding:${props => props.pad ? props.pad : "5px"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin: auto;
`

const Conatiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 32px 0;
`
const ImageContainer = styled.div`
    flex: 1;
    min-width: 400px;
    max-width: 600px;
`

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        display: 'flex',
        maxHeight: 263,
        background: '#77838F',
        color: '#FFFFFF',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    },
    content: {
        flex: '1 0 auto',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
    },
    moreInfo: {
        background: '#303960',
        color: '#FFFFFF',
        '&:hover': {
            background: '#303960',
        }
    }
}));

const whyUsersJoinedDDData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const getDateRange = () => {
    let temp = moment();
    let dateRange = [];
    temp.subtract(1, 'year');
    temp.add(1, 'month');

    for (let index = 0; index < 12; index++) {
        dateRange.push({
            id: temp.format('MMM-YY'),
            start: temp.startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            end: temp.endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        })
        temp.add(1, 'month');
    }

    return (dateRange);
}

const getCustomerBaseData = async (dateRange) => {
    const customerBaseData = {};
    for (const range of dateRange) {
        const { data } = await axios.get(`users?role_id=1&fromDate=${range.start}&toDate=${range.end}`)
        customerBaseData[range.id] = data.data.length;
    }

    return customerBaseData;
}

const getConsultationBookedOverTime = async (dateRange) => {
    const consultationBookedOverTime = {};
    for (const range of dateRange) {
        const { data } = await axios.get(`consultations?fromDate=${range.start}&toDate=${range.end}`)
        consultationBookedOverTime[range.id] = data.data.length;
    }

    return consultationBookedOverTime;
}

const Home = () => {

    const [user, setUser] = useState([]);
    const [consultant, setConsultant] = useState([]);
    const [mealPlan, setMealplan] = useState([]);
    const [consultationPackages, setConsultationPackages] = useState([]);
    const [menuPackages, setMenuPackages] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1)
    const [featuredMenu, setFeaturedMenu] = useState([]);
    const [customerBaseData, setCustomerBaseData] = useState({});
    const [consultationBookedOverTime, setConsultationBookedOverTime] = useState({});

    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        const dateRange = getDateRange();

        axios.get(`users?role_id=1`).then((res) => {
            setUser(res.data.data)
        })

        axios.get(`consultants?`).then((res) => {
            setConsultant(res.data.data)
        })

        axios.get(`meal-plans?`).then((res) => {
            setMealplan(res.data.data)
        })

        axios.get(`consultation-packages`).then((res) => {
            setConsultationPackages(res.data.data);
        })

        axios.get(`menus`).then((res) => {
            setMenuPackages(res.data.data);
        })

        axios.get(`menu-items?featured=` + 1).then((res) => {
            setFeaturedMenu(res.data.data);
        })

        getCustomerBaseData(dateRange).then(result => setCustomerBaseData(result));
        getConsultationBookedOverTime(dateRange).then(result => setConsultationBookedOverTime(result));
    }, [])

    const ImageCard = (props) => {
        const { count, header, navigationLink, image } = props;

        return (
            <ImageContainer>
                <Card className={classes.cardRoot}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography style={{ fontSize: 16 }}>
                                {header}
                            </Typography>
                            <Typography align="center" component="h1" variant="h1" style={{ margin: 12 }}>
                                {count}
                            </Typography>
                        </CardContent>
                        <CardActions style={{ padding: 0 }}>
                            <Button onClick={() => history.push(navigationLink)} size="medium" className={classes.moreInfo}>More Info</Button>
                        </CardActions>
                    </div>
                    <div style={{ flex: '2' }}>
                        <img src={image} style={{ height: '100%', width: '100%' }} />
                    </div>
                </Card>
            </ImageContainer>
        )
    }

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${(percent * 100).toFixed(2)}%`}</text>
            </g>
        );
    };

    return (
        <Main>
            <Heading color="rgb(119, 131, 143, 1)" length="1px" >
                DIET DELIGHT - DASHBOARD
            </Heading>
            <Line back="rgb(119, 131, 143, 1)" />
            <Conatiner>
                <ImageCard header="Total Customers" count={user.length} image={people} navigationLink="/admin/userlist?type=customer" />
                <div>
                    <ResponsiveContainer width={600} height={400}>
                        <PieChart>
                            <Pie
                                activeShape={renderActiveShape}
                                activeIndex={hoverIndex}
                                data={whyUsersJoinedDDData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={130}
                                dataKey="value"
                                onMouseEnter={(_, index) => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(-1)}
                            >
                                {whyUsersJoinedDDData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === hoverIndex ? "rgb(119, 131, 143, 1)" : "rgb(119, 131, 143, 0.5)"} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Why Users joined Diet Delight</Subheading>
                </div>
                <ImageCard header="Total Consultants" count={consultant.length} image={consultantImage} navigationLink="/admin/consultantlist" />
            </Conatiner>
            <Conatiner>
                <ResponsiveContainer width="100%" height={600}>
                    <LineChart
                        width={500}
                        height={300}
                        data={Object.keys(customerBaseData).map(i => ({ name: i, users: customerBaseData[i] }))}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Tooltip />
                        <GraphLine type="monotone" dataKey="users" stroke="#A3A3A3" label={<CustomizedLabel />} />
                    </LineChart>
                </ResponsiveContainer>
                <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Customer Base</Subheading>
            </Conatiner>
            <Conatiner>
                <ImageCard header="Total Menu Packages" count={menuPackages.length} image={PlanImage} navigationLink="/admin/menulist" />
                <div>
                    <ResponsiveContainer width={600} height={400}>
                        <PieChart>
                            <Pie
                                activeShape={renderActiveShape}
                                activeIndex={hoverIndex}
                                data={whyUsersJoinedDDData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={130}
                                dataKey="value"
                                onMouseEnter={(_, index) => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(-1)}
                            >
                                {whyUsersJoinedDDData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === hoverIndex ? "rgb(119, 131, 143, 1)" : "rgb(119, 131, 143, 0.5)"} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Popular Menu Packages</Subheading>
                </div>
                <ImageCard header="Total Menu Plans" count={mealPlan.length} image={PlanImage} navigationLink="/admin/mealplanlist" />
            </Conatiner>
            <Conatiner>
                <Set>
                    {
                        featuredMenu.map((meal) => (
                            <FeatureList
                                key={Math.random() * 100}
                                picture={meal.picture}
                                name={meal.name}
                            />
                        ))
                    }
                </Set>
            </Conatiner>
            <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Featured Menu Of the Week</Subheading>
            <Conatiner>
                <ImageCard header="Total Consultation Packages" count={consultationPackages.length} image={questionImage} navigationLink="/admin/consultationPackageList" />
                <div>
                    <ResponsiveContainer width={600} height={400}>
                        <PieChart>
                            <Pie
                                activeShape={renderActiveShape}
                                activeIndex={hoverIndex}
                                data={whyUsersJoinedDDData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={130}
                                dataKey="value"
                                onMouseEnter={(_, index) => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(-1)}
                            >
                                {whyUsersJoinedDDData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === hoverIndex ? "rgb(119, 131, 143, 1)" : "rgb(119, 131, 143, 0.5)"} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Popular Consultation Packages</Subheading>
                </div>
            </Conatiner>
            <Conatiner>
                <ResponsiveContainer width="100%" height={600}>
                    <LineChart
                        width={500}
                        height={300}
                        data={Object.keys(consultationBookedOverTime).map(i => ({ name: i, consultations: consultationBookedOverTime[i] }))}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Tooltip />
                        <GraphLine type="monotone" dataKey="consultations" stroke="#A3A3A3" label={<CustomizedLabel />} />
                    </LineChart>
                </ResponsiveContainer>
                <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">Consultations Booked over time</Subheading>
            </Conatiner>
        </Main >
    )
}

const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
            >
                {payload.value}
            </text>
        </g>
    );
};

const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;

    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};

export default Home
