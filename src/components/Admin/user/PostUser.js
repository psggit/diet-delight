import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './UserElements'
import { Button, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'
import "./addForm.css";

const PostUser = () => {

    const [Issuccess, setIsSuccess] = useState(false);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccess(false);
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required().label("First Name"),
        last_name: Yup.string().required().label("Last Name"),
        mobile: Yup.string().required().matches(phoneRegExp, "Phone number is not valid").label("Phone"),
        password: Yup.string().required().min(6).label("Password"),
        email: Yup.string().required().email().label("Email"),
        address: Yup.string().required().min(10).label("Address"),
        address_secondary: Yup.string().label("Sec Address"),
        roles: Yup.number().required().label("Roles"),
    });

    return (
        <>
            <Main className="addMain">
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '', 
                        mobile: '',
                        password: '',
                        email: '',
                        address: '',
                        address_secondary: '',
                        roles: 1,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        axios.post(`users`, {
                            first_name: values.first_name,
                            last_name: values.last_name,
                            mobile: values.mobile,
                            password: values.password,
                            email: values.email,
                            address: values.address,
                            address_secondary: values.address_secondary,
                            roles: [values.roles],
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container className="addContainer">
                                <Mini className="addMini">
                                    <Title>
                                        First Name
                                            </Title>
                                    <Input className="addInput"
                                        value={values.first_name}
                                        onChange={handleChange("first_name")}>
                                    </Input>
                                </Mini>
                                {errors.first_name && touched && (
                                    <Info error>{errors.first_name}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Last Name
                                            </Title>
                                    <Input className="addInput"
                                        value={values.last_name}
                                        onChange={handleChange("last_name")}>
                                    </Input>
                                </Mini>
                                {errors.last_name && touched && (
                                    <Info error>{errors.last_name}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Email
                                            </Title>
                                    <Input className="addInput"
                                        value={values.email}
                                        onChange={handleChange("email")}>
                                    </Input>
                                </Mini>
                                {errors.email && touched && (
                                    <Info error>{errors.email}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Password
                                            </Title>
                                    <Input className="addInput"
                                        value={values.password}
                                        onChange={handleChange("password")}>
                                    </Input>
                                </Mini>
                                {errors.password && touched && (
                                    <Info error>{errors.password}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>Phone :</Title>
                                    <Input className="addInput" value={values.mobile}
                                        onChange={handleChange("mobile")} />
                                </Mini>
                                {errors.mobile && touched && (
                                    <Info error>{errors.mobile}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Address
                                            </Title>
                                    <Input className="addInput"
                                        value={values.address}
                                        onChange={handleChange("address")}>
                                    </Input>
                                </Mini>
                                {errors.address && touched && (
                                    <Info error>{errors.address}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Secondary Address
                                            </Title>
                                    <Input className="addInput"
                                        value={values.address_secondary}
                                        onChange={handleChange("address_secondary")}>
                                    </Input>
                                </Mini>
                                {errors.address_secondary && touched && (
                                    <Info error>{errors.address_secondary}</Info>
                                )}
                                <Mini className="addMini">
                                    <Title>
                                        Roles :
                                           </Title>
                                    <Select className="addInput"
                                        defaultValue={values.roles}
                                        onChange={handleChange("roles")}
                                    >
                                        <MenuItem value={1}>Customer</MenuItem>
                                        <MenuItem value={2}>Admin</MenuItem>
                                        <MenuItem value={3}>Consultant</MenuItem>
                                        <MenuItem value={4}>Accountant</MenuItem>
                                        <MenuItem value={5}>Kitchen</MenuItem>
                                    </Select>
                                </Mini>
                                {errors.roles && touched && (
                                    <Info error>{errors.roles}</Info>
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

export default PostUser
