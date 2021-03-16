import React, { useState } from 'react'
import { Input, Title, Main, Mini, Info, Container } from './QuestionElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';

import "./addForm.css";

const AddCategory = () => {


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
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add New Category</h3>
                <Formik
                    initialValues={{
                        menu_id:'',
                        name: '',
                        parent: '',
                        max_buy: '', 
                        order: '',
                    }}
                  
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post(`menu-categories`, {
                            menu_id: values.menu_id,
                            name: values.name,
                            parent:values.parent,
                            max_buy: values.max_buy,
                            order: values.order,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            },
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
                                        placeholder="Menu ID"
                                        value={values.menu_id}
                                        onChange={handleChange("menu_id")}
                                    />
                                </Mini>
                                {errors.menu_id && touched && (
                                    <Info error>{errors.menu_id}</Info>
                                )}
                                <Mini className="addMini">
                                 <Title>Name :</Title>
                                        <Input className="addInput"
                                            placeholder="Name" 
                                            value={values.name}
                                            onChange={handleChange("name")}
                                        />
                                    </Mini>
                                    {errors.name && touched && (
                                        <Info error>{errors.name}</Info>
                                    )}
                                
                                <Mini className="addMini">
                                        <Title>Parent :</Title>
                                        <Input className="addInput" 
                                          
                                            placeholder="Parent"
                                            value={values.parent}
                                            onChange={handleChange("parent")}
                                        />
                                    </Mini>
                                    {errors.parent && touched && (
                                        <Info error>{errors.parent}</Info>
                                    )}
                                     <Mini className="addMini">
                                         <Title>Max Buy :</Title>
                                        <Input className="addInput"
                                         
                                            placeholder="Max Buy"
                                            value={values.max_buy}
                                            onChange={handleChange("max_buy")}
                                        />
                                    </Mini>
                                    {errors.max_buy && touched && (
                                        <Info error>{errors.max_buy}</Info>
                                    )}
                                     <Mini className="addMini">
                                        <Title>Order :</Title>
                                        <Input className="addInput"
                                          
                                            placeholder="Order"
                                            value={values.order}
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
                        Category Added Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default AddCategory
