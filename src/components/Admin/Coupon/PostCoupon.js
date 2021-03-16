import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
import { Button,MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'
import "./addForm.css";

const PostCoupon = () => {

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
                     
                        name:'',
                        code:'',
                        flat_discount:'',
                        percentage_discount:'',
                        expiry_date:'',
                        times_usable:'',
                        times_used:'',
                      
                    }}
                 
                    onSubmit={(values) => {
                        axios.post(`coupons`, {
                                name :values.name,
                                code:values.code,
                                flat_discount:values.flat_discount,
                                percentage_discount:values.percentage_discount,
                                expiry_date:values.expiry_date,
                                times_usable:values.times_usable,
                                times_used:values.times_used,
                            
                               
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container className="addContainer">
                    
                                   
                                    <Mini className="addMini">
                                        <Title>
                                        Name
                                            </Title>
                                        <Input className="addInput"
                                            placeholder="Name"
                                            value={values.name}
                                            onChange={handleChange("name")}>
                                        </Input>
                                    </Mini>
                                    {errors.name && touched && (
                                        <Info error>{errors.name}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>
                                        Code
                                            </Title>
                                        <Input className="addInput"
                                            placeholder="Code"
                                            value={values.code}
                                            onChange={handleChange("code")}>
                                        </Input>
                                    </Mini>
                                    {errors.code && touched && (
                                        <Info error>{errors.code}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>Flat Discount</Title>
                                        <Input className="addInput"
                                            placeholder="Flat Discount"
                                            value={values.flat_discount}
                                            onChange={handleChange("flat_discount")} />
                                    </Mini>
                                    {errors.flat_discount && touched && (
                                        <Info error>{errors.flat_discount}</Info>
                                    )}
                                     <Mini className="addMini">
                                        <Title>Percentage Discount</Title>
                                        <Input className="addInput"
                                            placeholder="Dercentage Discount"
                                            value={values.percentage_discount}
                                            onChange={handleChange("percentage_discount")} />
                                    </Mini>
                                    {errors.percentage_discount && touched && (
                                        <Info error>{errors.percentage_discount}</Info>
                                    )}
                                      <Mini className="addMini">
                                        <Title>Expiry Date</Title>
                                        <Input className="addInput"
                                            placeholder="Expiry Date"
                                            value={values.expiry_date}
                                            onChange={handleChange("expiry_date")} />
                                    </Mini>
                                    {errors.expiry_date && touched && (
                                        <Info error>{errors.expiry_date}</Info>
                                    )}
                                       <Mini className="addMini">
                                        <Title>Times Usable</Title>
                                        <Input className="addInput"
                                            placeholder="Times Usable"
                                            value={values.times_usable}
                                            onChange={handleChange("times_usable")} />
                                    </Mini>
                                    {errors.times_usable && touched && (
                                        <Info error>{errors.times_usable}</Info>
                                    )}
                                        <Mini className="addMini">
                                        <Title>Times Used</Title>
                                        <Input className="addInput"
                                            placeholder="Times Used"
                                            value={values.times_used}
                                            onChange={handleChange("times_used")} />
                                    </Mini>
                                    {errors.times_used && touched && (
                                        <Info error>{errors.times_used}</Info>
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
                        Coupon Addded Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default PostCoupon
