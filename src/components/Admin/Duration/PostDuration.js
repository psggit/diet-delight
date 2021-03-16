import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
import { Button,MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'

import "./addForm.css";

const PostDuration = () => {

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
                <Formik
                    initialValues={{
                     
                        title:'',
                        duration:'',
                        order:'',
                        subtitle:'',
                        details:'',
                        picture:'',
                      
                      
                    }}
                 
                    onSubmit={(values) => {
                        axios.post(`durations`, {
                            title:values.title,
                            duration:values.duration,
                            order:values.order,
                            subtitle:values.subtitle,
                            details:values.details,
                            picture:values.picture,
                            
                               
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container className="addContainer">
                    
                                   
                            <Mini className="addMini">
                                        <Title>
                                        Title
                                            </Title>
                                        <Input className="addInput"
                                            value={values.title}
                                            onChange={handleChange("title")}>
                                        </Input>
                                    </Mini>
                                    {errors.title && touched && (
                                        <Info error>{errors.title}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>
                                        Duration
                                            </Title>
                                        <Input className="addInput"
                                            value={values.duration}
                                            onChange={handleChange("duration")}>
                                        </Input>
                                    </Mini>
                                    {errors.duration && touched && (
                                        <Info error>{errors.duration}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>Order</Title>
                                        <Input className="addInput"
                                            value={values.order}
                                            onChange={handleChange("order")} />
                                    </Mini>
                                    {errors.order && touched && (
                                        <Info error>{errors.order}</Info>
                                    )}
                                     <Mini className="addMini">
                                        <Title>Subtitle</Title>
                                        <Input className="addInput"
                                            value={values.subtitle}
                                            onChange={handleChange("subtitle")} />
                                    </Mini>
                                    {errors.subtitle && touched && (
                                        <Info error>{errors.subtitle}</Info>
                                    )}
                                      <Mini className="addMini">
                                        <Title>Details</Title>
                                        <Input className="addInput"
                                            value={values.details}
                                            onChange={handleChange("details")} />
                                    </Mini>
                                    {errors.details && touched && (
                                        <Info error>{errors.details}</Info>
                                    )}
                                       <Mini className="addMini">
                                        <Title>Picture</Title>
                                        <Input className="addInput"
                                            value={values.picture}
                                            onChange={handleChange("picture")} />
                                    </Mini>
                                    {errors.picture && touched && (
                                        <Info error>{errors.picture}</Info>
                                    )}


                                <Button
                                    variant="contained"
                                    style={{ margin: "25px 5px", padding: "5px 25px", background: "#800080" }}
                                    color="primary"
                                    onClick={handleSubmit}
                                >submit</Button>
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
                        Duration Addded Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default PostDuration
