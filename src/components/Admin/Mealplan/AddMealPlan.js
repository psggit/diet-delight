import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Title, Main, Mini, Container, Info } from './MealPlanElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';

import "./addForm.css";

const LongInput = styled.textarea`
    border-radius:5px; 
    padding:5px;
    border: 1px solid black;
`

const AddMealPlan = () => {

    const [Issuccess, setIsSuccess] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccess(false);
    };
    const validateSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        status: Yup.number().required().max(1).label("Status"),
        type: Yup.number().required().max(1).label("Type"),
        menu_id: Yup.number().required().max(1).label("Menu ID"),
        duration_id: Yup.number().required().max(31).label("Duration"),
        order: Yup.number().required().max(1).label("Order"),
        subtitle: Yup.string().required().label("Subtitle"),
        details: Yup.string().required().max(256).label("Details"),
        price: Yup.number().required().label("Price"),
        sale_price: Yup.number().required().label("Sales Price"),
    })

    return (
        <>
            <Main className="addMain">
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add MealPlan</h3>

                <Formik
                    initialValues={{
                        name: '',
                        status: 0,
                        type: 0,
                        menu_id:'',
                        duration_id: '',
                        order: '',
                        subtitle: '',
                        price: '',
                        sale_price: '',
                        details: '',
                    }} 

                    validationSchema={validateSchema}

                    onSubmit={(values) => {
                        console.log(values)
                        axios.post(`meal-plans`, {   
                        name: values.name,
                        status: values.status,
                        type: values.type,
                        menu_id: values.menu_id,
                        duration_id: values.duration_id,
                        order: values.order,
                        subtitle: values.subtitle,
                        details: values.details,
                        price: values.price,
                        sale_price: values.sale_price,
                       }
                        ).then((res) => {
                            console.log(res)
                            setIsSuccess(true)
                        }).catch(err => console.log(err))
                    }}
                >

                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        
                        <>
                       
                            <Container className="addContainer">
                                <Mini className="addMini">
                                    <Title>Name :</Title>
                                    <Input className="addInput" placeholder="Enter Name"
                                    value={values.name}
                                        onChange={handleChange("name")}
                                    />
                                </Mini>
                                {errors.name && touched && (<Info error>{errors.name}</Info>)}
                                <Mini className="addMini">
                                    <Title>Status : </Title>
                                    <Select className="addInput"
                                        defaultValue={values.status}
                                        onChange={handleChange("status")}
                                    >
                                        <MenuItem value={0}>Available</MenuItem>
                                        <MenuItem value={1}>Unavailable</MenuItem>
                                    </Select>
                                </Mini>
                                {errors.status && touched && (<Info error>{errors.status}</Info>)}
                                <Mini className="addMini">
                                    <Title>Type :</Title>
                                    <Select className="addInput"
                                        defaultValue={values.type}
                                        onChange={handleChange("type")}
                                    >
                                        <MenuItem value={0}>With Weekend</MenuItem>
                                        <MenuItem value={1}>Without Weekend</MenuItem>
                                    </Select>
                                </Mini>
                                {errors.type && touched && (<Info error>{errors.type}</Info>)}
                                <Mini className="addMini">
                                    <Title>Menu ID :</Title>
                                    <Input className="addInput" placeholder="Menu ID"
                                     value={values.menu_id}
                                        onChange={handleChange("menu_id")}
                                    />
                                </Mini>
                                {errors.menu_id && touched && (<Info error>{errors.menu_id}</Info>)}
                                <Mini className="addMini">
                                    <Title>Duration :</Title>
                                    <Input className="addInput" placeholder="Duration"
                                     value={values.duration_id}
                                        onChange={handleChange("duration_id")}
                                    />
                                </Mini>
                                {errors.duration_id && touched && (<Info error>{errors.duration_id}</Info>)}
                                <Mini className="addMini">
                                    <Title>Order :</Title>
                                    <Input className="addInput" placeholder="Order"
                                     value={values.order}
                                        onChange={handleChange("order")}
                                    />
                                </Mini>
                                {errors.order && touched && (<Info error>{errors.order}</Info>)}
                                <Mini className="addMini">
                                    <Title>Subtitle :</Title>
                                    <Input className="addInput" placeholder="Subtitle"
                                     value={values.subtitle}
                                        onChange={handleChange("subtitle")}
                                    />
                                </Mini>
                                {errors.subtitle && touched && (<Info error>{errors.subtitle}</Info>)}
                                <Mini className="addMini">
                                    <Title>Details :</Title>
                                    <Input className="addInput" placeholder="Details"
                                     value={values.details}
                                        onChange={handleChange("details")}
                                    />
                                </Mini>
                                {errors.details && touched && (<Info error>{errors.details}</Info>)}
                                <Mini className="addMini">
                                    <Title>Price :</Title>
                                    <Input className="addInput" placeholder="Price"
                                     value={values.price}
                                        onChange={handleChange("price")}
                                    />
                                </Mini>
                                {errors.price && touched && (<Info error>{errors.price}</Info>)}
                                <Mini className="addMini">
                                    <Title>Sale Price :</Title>
                                    <Input className="addInput" placeholder="Sale Price"
                                     value={values.sale_price}
                                        onChange={handleChange("sale_price")}
                                    />
                                </Mini>
                                {errors.sale_price && touched && (<Info error>{errors.sale_price}</Info>)}
                                <Button onClick={handleSubmit} style={{ margin: "25px 5px", padding: "5px 25px", background: "#800080" }} variant="contained" color="primary">Submit</Button>
                                
                            </Container>
                            
                        </>
                        )} 
                </Formik>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                    message="Success"
                    open={Issuccess}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        MealPlan Added Successfully !
                        </Alert>
                </Snackbar>

            </Main>
        </>
    ) 
}

export default AddMealPlan
