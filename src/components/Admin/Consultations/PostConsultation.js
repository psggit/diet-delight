import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
import { Button, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'
import "./addForm.css";

const PostConsultation = () => {

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

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required().label("Name"),
    //     status: Yup.string().required().label("Status"),
    //     qualification: Yup.string().required().label("Qualification"),
    //     bio: Yup.string().required().label("Bio"),
    //     order: Yup.number().required().label("Order"),
    // });

    return (
        <>
            <Main className="addMain">
                <Formik
                    initialValues={{
                        user_id: '',
                        consultation_purchase_id: '',
                        consultant_id: '',
                        status: '',
                        consultation_link: '',
                        consultation_time: '',
                        consultant_name: '',
                        notes: '',
                      
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        axios.post(`consultations`, {
                                 user_id: values.user_id,
                                consultation_purchase_id: values.consultation_purchase_id,
                                consultant_id: values.consultant_id,
                                status: values.status,
                                consultation_link: values.consultation_link,
                                consultation_time: values.consultation_time,
                                consultant_name: values.consultant_name,
                                notes: values.notes,
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container className="addContainer">
                            <Mini className="addMini">
                                        <Title>
                                            User ID
                                            </Title>
                                        <Input className="addInput"
                                            value={values.user_id}
                                            placeholder="User Id"
                                            onChange={handleChange("user_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.user_id && touched && (
                                        <Info error>{errors.user_id}</Info>
                                    )}
                                   
                                    <Mini className="addMini">
                                        <Title>
                                        Consultation Purchase ID
                                            </Title>
                                        <Input className="addInput"
                                            placeholder="Consultation Purchase ID"
                                            value={values.consultation_purchase_id}
                                            onChange={handleChange("consultation_purchase_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.consultation_purchase_id && touched && (
                                        <Info error>{errors.consultation_purchase_id}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>
                                        Consultant ID
                                            </Title>
                                        <Input className="addInput"
                                            placeholder="Consultant ID"
                                            value={values.consultant_id}
                                            onChange={handleChange("consultant_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.consultant_id && touched && (
                                        <Info error>{errors.consultant_id}</Info>
                                    )}
                                    <Mini className="addMini">
                                        <Title>Status</Title>
                                        <Input className="addInput"
                                            placeholder="Status"
                                            value={values.status}
                                            onChange={handleChange("status")} />
                                    </Mini>
                                    {errors.status && touched && (
                                        <Info error>{errors.status}</Info>
                                    )}
                                      <Mini className="addMini">
                                        <Title>Consultation Link</Title>
                                        <Input className="addInput"
                                            placeholder="Consultation Link"
                                            value={values.consultation_link}
                                            onChange={handleChange("consultation_link")} />
                                    </Mini>
                                    {errors.consultation_link && touched && (
                                        <Info error>{errors.consultation_link}</Info>
                                    )}
                                      <Mini className="addMini">
                                        <Title>Consultation Time</Title>
                                        <Input className="addInput"
                                            placeholder="Consultation Time"
                                            value={values.consultation_time}
                                            onChange={handleChange("consultation_time")} />
                                    </Mini>
                                    {errors.consultation_time && touched && (
                                        <Info error>{errors.consultation_time}</Info>
                                    )}
                                     <Mini className="addMini">
                                        <Title>Consultant Name</Title>
                                        <Input className="addInput"
                                            placeholder="Consultant Name"
                                            value={values.consultant_name}
                                            onChange={handleChange("consultant_name")} />
                                    </Mini>
                                    {errors.consultant_name && touched && (
                                        <Info error>{errors.consultant_name}</Info>
                                    )}
                                     <Mini className="addMini">
                                        <Title>Notes</Title>
                                        <Input className="addInput"
                                            placeholder="Notes"
                                            value={values.notes}
                                            onChange={handleChange("notes")} />
                                    </Mini>
                                    {errors.notes && touched && (
                                        <Info error>{errors.notes}</Info>
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
                        User Created Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default PostConsultation
