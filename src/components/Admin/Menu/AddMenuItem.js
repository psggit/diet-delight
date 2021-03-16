import React, { useState } from 'react'
import { Input, Title, Main, Mini, Info, Container } from './QuestionElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';
import "./addForm.css";

const validationSchema = Yup.object().shape({
    question: Yup.string().required().label("Question"),
    type: Yup.number().required().max(3).label("Type"),
    order: Yup.number().required().label("Order")
});

const AddMenuItem = () => {

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

    return (
        <>
            <Main className="addMain">
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add Menu Item</h3>
                <Formik
                    initialValues={{
                        menu_id: '', 
                        menu_category_id: '',
                        name: '',
                        picture: '',
                        date: '',
                        day: '',
                        featured: '',
                        veg: '',
                        order:'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        axios.post(`menu-items`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            },
                           
                            menu_id: values.menu_id,
                            menu_category_id: values.menu_category_id,
                            name: values.name,
                            picture: values.picture,
                            date: values.date,
                            day: values.day,
                            featured: values.featured,
                            veg: values.veg,
                            order: values.order, 
                        }).then((res) => {
                            console.log(res)
                            setIsSuccess(true)
                        }).catch(err => console.log(err))
                    }}
                >
                    {({ handleSubmit, handleChange, errors, touched, values }) => (
                        <>
                            <Container className="addContainer">
                            <Mini className="addMini">
                                <Title>Menu ID :</Title>
                                <Input className="addInput"
                                    value={values.menu_id}
                                    placeholder="Menu ID"
                                    onChange={handleChange("menu_id")}
                                />
                                </Mini>
                                {errors.menu_id && touched && (
                                <Info error>{errors.menu_id}</Info>
                                )}
                                 <Mini className="addMini">

                                    <Title>Menu Category ID :</Title>
                                    <Input className="addInput"
                                        value={values.menu_category_id}
                                        placeholder="Menu Category ID"
                                        onChange={handleChange("menu_category_id")}
                                    />
                                    </Mini>
                                    {errors.menu_category_id && touched && (
                                    <Info error>{errors.menu_category_id}</Info>
                                    )}

                                    <Mini className="addMini">
                                         <Title>Name :</Title>
                                        <Input className="addInput"
                                           
                                            placeholder="Name"
                                            onChange={handleChange("name")}
                                        />
                                    </Mini>
                                    {errors.name && touched && (
                                        <Info error>{errors.name}</Info>
                                    )}
                                     <Mini className="addMini">
                                         <Title>Picture :</Title>
                                        <Input className="addInput"
                                          
                                            placeholder="Picture"
                                            onChange={handleChange("picture")}
                                        />
                                    </Mini>
                                    {errors.picture && touched && (
                                        <Info error>{errors.picture}</Info>
                                    )}
                                     <Mini className="addMini">
                                         <Title>Date :</Title>
                                        <Input className="addInput"
                                           
                                            placeholder="Date"
                                            onChange={handleChange("date")}
                                        />
                                    </Mini>
                                    {errors.date && touched && (
                                        <Info error>{errors.date}</Info>
                                    )}
                                     <Mini className="addMini">
                                         <Title>Day :</Title>
                                        <Input className="addInput"
                                        
                                            placeholder="Day"
                                            onChange={handleChange("day")}
                                        />
                                    </Mini>
                                    {errors.day && touched && (
                                        <Info error>{errors.day}</Info>
                                    )}
                                     <Mini className="addMini">
                                         <Title>Featured :</Title>
                                        <Input className="addInput"
                                           
                                            placeholder="Featured"
                                            onChange={handleChange("featured")}
                                        />
                                    </Mini>
                                    {errors.featured && touched && (
                                        <Info error>{errors.featured}</Info>
                                    )}
                                       <Mini className="addMini">
                                         <Title>Veg :</Title>
                                        <Input className="addInput"
                                            
                                            placeholder="Veg"
                                            onChange={handleChange("veg")}
                                        />
                                    </Mini>
                                    {errors.veg && touched && (
                                        <Info error>{errors.veg}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>Order :</Title>
                                        <Input className="addInput"
                                           
                                            placeholder="Order"
                                            onChange={handleChange("order")}
                                        />
                                    </Mini>
                                    {errors.order && touched && (
                                        <Info error>{errors.order}</Info>
                                    )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "25px 5px", padding: "5px 25px", background: "#800080" }}
                                    onClick={handleSubmit}>
                                    Submit
                            </Button>
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
                        Question Added Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default AddMenuItem
