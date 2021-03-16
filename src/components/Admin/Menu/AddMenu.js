import React, { useState } from 'react'
import { Input, Title, Main, Mini, Info, Container } from './QuestionElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import axios from '../../../axiosInstance';
import "./addForm.css";


const AddMenu = () => {
    
    const [imgSelectedPreview,setImgSelectedPreview] = useState("")
    const [Issuccess, setIsSuccess] = useState(false);
    const [baseImage ,setBaseImage] =useState("")

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // const uploadImage = async (e) =>{
    //     console.log(e.target.files);
    //     const file = e.target.files[0];
    //     const base64 = await convertBased64(file);
    //     setBaseImage(baseImage);
    //     console.log(base64)
    // }

    // const convertBased64 = (file) =>{
    //     return new Promise((resolve,reject) =>{

    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = (() => {
    //             resolve(fileReader.result);
    //         })

    //         fileReader.onerror = ((error) => {
    //             reject(error);
    //         })

    //     })
    // }

//    function selectedImageProcessing(e){
//         console.log(e);
//         console.log(e.target.files[0]);
//         const reader = new FileReader();
//         reader.onload = function(){
//           const img = new Image()
//           console.log(img)
//          setImgSelectedPreview(img)
//           console.log(imgSelectedPreview)
//         }.bind(this)
//         reader.readAsDataURL(e.target.files[0]);
//         console.log(reader)
//         console.log(reader.result);
//         console.log(imgSelectedPreview)
//       }

// harshiv latest
      function selectedImageProcessing(e){
        console.log(e);
        console.log(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = function(){
          const img = new Image();
         img.src = reader.result;
         console.log(img)
         setImgSelectedPreview(img)
          console.log(imgSelectedPreview)
          console.log("meet")
        }
        console.log("meet patel")
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
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add Menu</h3>
                <Formik
                    initialValues={{
                        name: '',
                        details: '',
                        picture: imgSelectedPreview,
                        status: '',
                        order: '',
                    }}
                   
                    onSubmit={(values) => {
                        axios.post(`menus`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            },
                                name: values.name,
                                details: values.details,
                                picture:imgSelectedPreview,
                                status: values.status,
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
                                            // onChange={(e) => {
                                            //     uploadImage(e)
                                            // }}
                                    
                                        />
                                      
                                    </Mini>
                                  
                                    {errors.picture && touched && (
                                        <Info error>{errors.picture}</Info>
                                    )}
                                      <img src={baseImage}/>
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
 
export default AddMenu
 