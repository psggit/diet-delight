import React, { useState } from 'react'
import { Input, Title, Main, Mini, Info, Container } from './QuestionElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';
import "./addForm.css";

// const validationSchema = Yup.object().shape({
//     question: Yup.string().required().label("Question"),
//     type: Yup.number().required().max(3).label("Type"), 
//     order: Yup.number().required().label("Order")
// });

const AddConsultationPackage  = () => {  

    const [imgSelectedPreview,setImgSelectedPreview] = useState("")
    const [Issuccess, setIsSuccess] = useState(false);
    const [baseImage ,setBaseImage] =useState("")


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function selectedImageProcessing(e){
        console.log(e);
        console.log(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = function(){
          const img = new Image() 
          console.log(img)
         setImgSelectedPreview(img)
          console.log(imgSelectedPreview)
        }.bind(this)
        reader.readAsDataURL(e.target.files[0]);
        console.log(reader)
        console.log(reader.result);
        console.log(imgSelectedPreview)
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
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add Consulations Packages</h3>
                <Formik
                    initialValues={{
                        name: '',
                        status: '',
                        duration:'',
                        order: '',
                        subtitle:'',
                        details:'',
                        picture:'',
                        price:'',
                        sale_price:'',
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post(`consultation-packages`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            },
                            name: values.name,
                            status: values.status,
                            duration: values.duration,
                            order: values.order,
                            subtitle: values.subtitle,
                            details: values.details,
                            picture: imgSelectedPreview,
                            price: values.price,
                            sale_price: values.sale_price,
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
                                    <Title>Name</Title>
                                    <Input className="addInput"
                                        placeholder="Name"
                                        onChange={handleChange("name")}
                                    />
                                </Mini>
                                {errors.name && touched && (
                                    <Info error>{errors.name}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>Status :</Title>
                                    <Input className="addInput"
                                        placeholder="Status"
                                        onChange={handleChange("status")}
                                    />
                                </Mini>
                                {errors.status && touched && (
                                    <Info error>{errors.status}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>Duration :</Title>
                                    <Input className="addInput"
                                        placeholder="Duration"
                                        onChange={handleChange("duration")}
                                    />
                                </Mini>

                                {errors.duration && touched && (
                                    <Info error>{errors.duration}</Info>
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
                                 <Mini className="addMini">
                                    <Title>Subtitle :</Title>
                                    <Input className="addInput"
                                        placeholder="Subtitle"
                                        onChange={handleChange("subtitle")}
                                    />
                                </Mini>

                                {errors.subtitle && touched && (
                                    <Info error>{errors.subtitle}</Info>
                                )}
                                 <Mini className="addMini">
                                    <Title>Details :</Title>
                                    <Input className="addInput"
                                        placeholder="Details"
                                        onChange={handleChange("details")}
                                    />
                                </Mini>

                                {errors.details && touched && (
                                    <Info error>{errors.details}</Info>
                                )}
                                   <Mini className="addMini">
                                   <Title>Picture :</Title>
                                        <Input className="addInput" type="file"
                                            placeholder="Picture"
                                            onChange={selectedImageProcessing}
                                        />
                                      
                                </Mini>

                                {errors.picture && touched && (
                                    <Info error>{errors.picture}</Info>
                                )}
                                    <img src={baseImage}/>
                                   <Mini className="addMini">
                                    <Title>Price :</Title>
                                    <Input className="addInput"
                                        placeholder="Price"
                                        onChange={handleChange("price")}
                                    />
                                </Mini>

                                {errors.price && touched && (
                                    <Info error>{errors.price}</Info>
                                )}
                                   <Mini className="addMini">
                                    <Title>Sale Price :</Title>
                                    <Input className="addInput"
                                        placeholder="Sale Price"
                                        onChange={handleChange("sale_price")}
                                    />
                                </Mini>

                                {errors.sale_price && touched && (
                                    <Info error>{errors.sale_price}</Info>
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
                         Added Consultations Packages Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default AddConsultationPackage 
