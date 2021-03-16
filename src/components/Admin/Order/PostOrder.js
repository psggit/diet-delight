// import React, { useState } from 'react'

// import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
// import { Button, Select, MenuItem, Snackbar } from '@material-ui/core'
// import MuiAlert from '@material-ui/lab/Alert'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import axios from '../../../axiosInstance'

// const PostOrder = () => {

//     const [Issuccess, setIsSuccess] = useState(false); 

//     function Alert(props) {
//         return <MuiAlert elevation={6} variant="filled" {...props} />;
//     }

//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') { 
//             return;
//         }

//         setIsSuccess(false);
//     };



//     return (
//         <>
//             <Main>
//                 <Formik
//                     initialValues={{
//                         id:'',
//                         user_id:'',
//                         menu_item_id:'',
//                         menu_category_id:'',
//                         meal_purchase_id:'',
//                         status:'',
//                         kcal:'',
//                         menu_item_date:'',
//                         menu_item_day:'',
//                         menu_item_name:'',
//                         first_name:'',
//                         last_name:'',
//                         mobile:'',
//                         delivery_address:'',
//                         notes:'',
                      
//                     }}
                 
//                     onSubmit={(values) => {
//                         axios.post(`menu-orders`, {
//                                user_id:values.user_id,
//                                 menu_item_id :values.menu_item_id,
//                                 menu_category_id:values.menu_category_id,
//                                 meal_purchase_id:values.meal_purchase_id,
//                                 status:values.status,
//                                 kcal:values.kcal,
//                                 menu_item_date:values.menu_item_date,
//                                 menu_item_day:values.menu_item_day,
//                                 menu_item_name:values.menu_item_name,
//                                 first_name:values.first_name,
//                                 last_name:values.last_name,
//                                 mobile:values.mobile,
//                                 delivery_address:values.delivery_address,
//                                 notes:values.notes,
//                         }).then(res => setIsSuccess(true)).catch(err => console.log(err))
//                     }}
//                 >
//                     {({ handleChange, handleSubmit, errors, touched, values }) => (
//                         < >
//                             <Container>
//                             <Mini>
//                                         <Title>
//                                             User ID
//                                             </Title>
//                                         <Input
//                                             value={values.user_id}
//                                             placeholder="User ID"
//                                             onChange={handleChange("user_id")}>
//                                         </Input>
//                                     </Mini>
//                                     {errors.user_id && touched && (
//                                         <Info error>{errors.user_id}</Info>
//                                     )}
                                   
//                                     <Mini>
//                                         <Title>
//                                         Menu Item ID
//                                             </Title>
//                                         <Input
//                                             placeholder=" Menu Item ID"
//                                             value={values.menu_item_id}
//                                             onChange={handleChange("menu_item_id")}>
//                                         </Input>
//                                     </Mini>
//                                     {errors.menu_item_id && touched && (
//                                         <Info error>{errors.menu_item_id}</Info>
//                                     )}
//                                     <Mini>
//                                         <Title>
//                                         Menu Category ID
//                                             </Title>
//                                         <Input
//                                             placeholder="Menu Category ID"
//                                             value={values.menu_category_id}
//                                             onChange={handleChange("menu_category_id")}>
//                                         </Input>
//                                     </Mini>
//                                     {errors.menu_category_id && touched && (
//                                         <Info error>{errors.menu_category_id}</Info>
//                                     )}
//                                     <Mini>
//                                         <Title>Meal Purchase ID</Title>
//                                         <Input
//                                             placeholder="Meal Purchase ID"
//                                             value={values.meal_purchase_id}
//                                             onChange={handleChange("meal_purchase_id")} />
//                                     </Mini>
//                                     {errors.meal_purchase_id && touched && (
//                                         <Info error>{errors.meal_purchase_id}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Status</Title>
//                                         <Input
//                                             placeholder="Status"
//                                             value={values.status}
//                                             onChange={handleChange("status")} />
//                                     </Mini>
//                                     {errors.status && touched && (
//                                         <Info error>{errors.status}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Kcal</Title>
//                                         <Input
//                                             placeholder="Kcal"
//                                             value={values.kcal}
//                                             onChange={handleChange("kcal")} />
//                                     </Mini>
//                                     {errors.kcal && touched && (
//                                         <Info error>{errors.kcal}</Info>
//                                     )}
//                                       <Mini>
//                                         <Title>Menu Item Date</Title>
//                                         <Input
//                                             placeholder="Menu Item Date"
//                                             value={values.menu_item_date}
//                                             onChange={handleChange("menu_item_date")} />
//                                     </Mini>
//                                     {errors.menu_item_date && touched && (
//                                         <Info error>{errors.menu_item_date}</Info>
//                                     )}
//                                        <Mini>
//                                         <Title>Menu Item Day</Title>
//                                         <Input
//                                             placeholder="Menu Item Day"
//                                             value={values.menu_item_day}
//                                             onChange={handleChange("menu_item_day")} />
//                                     </Mini>
//                                     {errors.menu_item_day && touched && (
//                                         <Info error>{errors.menu_item_day}</Info>
//                                     )}
//                                         <Mini>
//                                         <Title>Menu Item Name</Title>
//                                         <Input
//                                             placeholder="Menu Item Name"
//                                             value={values.menu_item_name}
//                                             onChange={handleChange("menu_item_name")} />
//                                     </Mini>
//                                     {errors.menu_item_name && touched && (
//                                         <Info error>{errors.menu_item_name}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>First Name</Title>
//                                         <Input
//                                             placeholder="First Name"
//                                             value={values.first_name}
//                                             onChange={handleChange("first_name")} />
//                                     </Mini>
//                                     {errors.first_name && touched && (
//                                         <Info error>{errors.first_name}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Last Name</Title>
//                                         <Input
//                                             placeholder="Last Name"
//                                             value={values.last_name}
//                                             onChange={handleChange("last_name")} />
//                                     </Mini>
//                                     {errors.last_name && touched && (
//                                         <Info error>{errors.last_name}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Mobile</Title>
//                                         <Input
//                                             placeholder="Mobile"
//                                             value={values.mobile}
//                                             onChange={handleChange("mobile")} />
//                                     </Mini>
//                                     {errors.mobile && touched && (
//                                         <Info error>{errors.mobile}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Delivery Address</Title>
//                                         <Input
//                                             placeholder="Delivery Address"
//                                             value={values.delivery_address}
//                                             onChange={handleChange("delivery_address")} />
//                                     </Mini>
//                                     {errors.delivery_address && touched && (
//                                         <Info error>{errors.delivery_address}</Info>
//                                     )}
//                                      <Mini>
//                                         <Title>Notes</Title>
//                                         <Input
//                                             placeholder="Notes"
//                                             value={values.notes}
//                                             onChange={handleChange("notes")} />
//                                     </Mini>
//                                     {errors.notes && touched && (
//                                         <Info error>{errors.notes}</Info>
//                                     )}

//                                 <Button
//                                     variant="contained"
//                                     style={{ margin: "20px", padding: "5px", background: "#800080" }}
//                                     color="primary"
//                                     onClick={handleSubmit}
//                                 >submit</Button>
//                             </Container>
//                         </> 
//                     )}

//                 </Formik>
//                 <Snackbar
//                     autoHideDuration={3000}
//                     anchorOrigin={{ vertical: 'top', horizontal: "center" }}
//                     message="Success"
//                     open={Issuccess}
//                     onClose={handleClose}
//                 >
//                     <Alert onClose={handleClose} severity="success">
//                         Order Addded Successfully !
//                         </Alert>
//                 </Snackbar>
//             </Main>
//         </>
//     )
// }

// export default PostOrder


import React, { useState, useEffect } from 'react'

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { Formik } from 'formik'
// import * as Yup from 'yup'

import { Main, HContainer, Con, Input, Title, Set, Mini, Info, Container } from './ConsultantElements'
import { useDispatch, useSelector } from 'react-redux'
import {  selectListOfOrder, resetListOfOrder, setListOfOrder } from '../../../features/adminSlice'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },

    table: {
        minWidth: 650,  
    },
});

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required().label("Name"),
//     status: Yup.string().required().label("Status"),
//     qualification: Yup.string().required().label("Qualification"),
//     bio: Yup.string().required().label("Bio"),
//     order: Yup.number().required().label("Order"),
// });


const PostOrder = () => {

    const dispatch = useDispatch();
    const listoforder = useSelector(selectListOfOrder);

    const [listoforders, setListOfOrders] = useState([]);
    const [page, setPage] = useState('')
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const [show, setShow] = useState(false)
    const [Issuccess, setIsSuccess] = useState(false);
    const [isdelete, setIsDelete] = useState(false);
    const [isupdate, setISUpdate] = useState(false);

    useEffect(() => {
        axios.get(`consultation-purchases?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setListOfOrders(res.data.data)
            setLoading(false)
            setShow(true)
        })
    }, [page, search, sort, order])

    const handleShow = () => {
        axios.get(`consultation-purchases?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setListOfOrders(res.data.data)
            setShow(true)
        }).catch(err => console.log(err));
    }

    const classes = useStyles();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccess(false);
    };


    const handleUpdate = async (orderlist) => {
        console.log(orderlist)
        await dispatch(setListOfOrder({
            id:orderlist.id,
            user_id:orderlist.user_id,
            consultation_package_id:orderlist.consultation_package_id,
            payment_id:orderlist.payment_id,
            status:orderlist.status,
            billing_address_line1:orderlist.billing_address_line1,
            billing_address_line2 :orderlist.billing_address_line2 ,
            consultation_package_name:orderlist.consultation_package_name,
            consultation_package_duration:orderlist.consultation_package_duration,
            amount_paid:orderlist.amount_paid,
            
        }))

        await setISUpdate(true);
    }

    const handleDelete = async (orderlist) => {
        await dispatch(resetListOfOrder())
        await dispatch(setListOfOrder({
            id: orderlist.id
        }))
        await setIsDelete(true)
    }

    const CloseDelete = () => setIsDelete(false)
    const CloseUpdate = () => setISUpdate(false)

    return (
        <>

            {isdelete && (<>  <Dialog
                open={isdelete}
                onClose={CloseDelete}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
                <DialogContent>
                    <Mini>
                        <Button variant="contained" color="secondary"
                            onClick={() => {
                                axios.delete(`consultation-purchases/${listoforder.id}`).then(
                                    (res) => {
                                        setIsSuccess(true)
                                        setIsDelete(false)
                                        handleShow()
                                    }
                                ).catch(err => console.log(err))
                            }}
                        >Delete</Button>
                        <Button variant="contained" style={{ margin: "10px", background: "#800080" }} color="primary" onClick={CloseDelete}>Close</Button>
                    </Mini>
                </DialogContent>
            </Dialog>
            </>)}

            {isupdate && (<>  <Dialog
                open={isupdate}
                onClose={CloseUpdate}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="form-dialog-title">Update Question</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            user_id:listoforder.user_id,
                            consultation_package_id:listoforder.consultation_package_id,
                            payment_id:listoforder.payment_id,
                            status:listoforder.status,
                            billing_address_line1:listoforder.billing_address_line1,
                            billing_address_line2 :listoforder.billing_address_line2 ,
                            consultation_package_name:listoforder.consultation_package_name,
                            consultation_package_duration:listoforder.consultation_package_duration,
                            amount_paid:listoforder.amount_paid,
                        }}
                      
                        onSubmit={(values) => {
                            axios.put(`meal-purchases/${listoforder.id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                },
                                user_id:values.user_id,
                            consultation_package_id:values.consultation_package_id,
                            payment_id:values.payment_id,
                            status:values.status,
                            billing_address_line1:values.billing_address_line1,
                            billing_address_line2 :values.billing_address_line2 ,
                            consultation_package_name:values.consultation_package_name,
                            consultation_package_duration:values.consultation_package_duration,
                            amount_paid:values.amount_paid,
                            }).then((res) => {
                                setIsSuccess(true)
                                setISUpdate(false)
                                handleShow()
                            }).catch(err => console.log(err))
                        }}
                    >
                        {({ handleChange, handleSubmit, errors, touched, values }) => (
                            < >
                                <Container>
                                    <Mini>
                                        <Title>
                                            User ID
                                            </Title>
                                        <Input
                                            value={values.user_id}
                                            placeholder="User ID"
                                            onChange={handleChange("user_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.user_id && touched && (
                                        <Info error>{errors.user_id}</Info>
                                    )}
                                   
                                    <Mini>
                                        <Title>
                                        Consultation Package ID
                                            </Title>
                                        <Input
                                            placeholder=" Consultation Package ID"
                                            value={values.consultation_package_id}
                                            onChange={handleChange("consultation_package_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.consultation_package_id && touched && (
                                        <Info error>{errors.consultation_package_id}</Info>
                                    )}
                                    <Mini>
                                        <Title>
                                        Payment ID
                                            </Title>
                                        <Input
                                            placeholder="Payment ID"
                                            value={values.payment_id}
                                            onChange={handleChange("payment_id")}>
                                        </Input>
                                    </Mini>
                                    {errors.payment_id && touched && (
                                        <Info error>{errors.payment_id}</Info>
                                    )}
                                     <Mini>
                                        <Title>Status</Title>
                                        <Input
                                            placeholder="Status"
                                            value={values.status}
                                            onChange={handleChange("status")} />
                                    </Mini>
                                    {errors.status && touched && (
                                        <Info error>{errors.status}</Info>
                                    )}
                                     <Mini>
                                        <Title>Billing Address Line1</Title>
                                        <Input
                                            placeholder="Billing Address Line1"
                                            value={values.billing_address_line1}
                                            onChange={handleChange("billing_address_line1")} />
                                    </Mini>
                                    {errors.billing_address_line1 && touched && (
                                        <Info error>{errors.billing_address_line1}</Info>
                                    )}
                                    <Mini>
                                        <Title>Billing Address Line2</Title>
                                        <Input
                                            placeholder="Billing Address Line2"
                                            value={values.billing_address_line2}
                                            onChange={handleChange("billing_address_line2")} />
                                    </Mini>
                                    {errors.billing_address_line2 && touched && (
                                        <Info error>{errors.billing_address_line2}</Info>
                                    )}
                                      <Mini>
                                        <Title>Consultation Package Name</Title>
                                        <Input
                                            placeholder="Consultation Package Name"
                                            value={values.consultation_package_name}
                                            onChange={handleChange("consultation_package_name")} />
                                    </Mini>
                                    {errors.consultation_package_name && touched && (
                                        <Info error>{errors.consultation_package_name}</Info>
                                    )}
                                       <Mini>
                                        <Title>Consultation Package Duration</Title>
                                        <Input
                                            placeholder="Consultation Package Duration"
                                            value={values.consultation_package_duration}
                                            onChange={handleChange("consultation_package_duration")} />
                                    </Mini>
                                    {errors.consultation_package_duration && touched && (
                                        <Info error>{errors.consultation_package_duration}</Info>
                                    )}
                                        <Mini>
                                        <Title>Amount Paid</Title>
                                        <Input
                                            placeholder="Amount Paid"
                                            value={values.amount_paid}
                                            onChange={handleChange("amount_paid")} />
                                    </Mini>
                                    {errors.amount_paid && touched && (
                                        <Info error>{errors.amount_paid}</Info>
                                    )}

                                    <Mini>
                                        <Button
                                            variant="contained"
                                            style={{ margin: "20px", padding: "5px", background: "#800080" }}
                                            color="primary"
                                            onClick={handleSubmit}
                                        >submit</Button>
                                        <Button
                                            variant="contained"
                                            style={{ margin: "20px", padding: "5px", background: "#800080" }}
                                            color="primary"
                                            onClick={CloseUpdate}
                                        >Close</Button>
                                    </Mini>
                                </Container>
                            </>
                        )}

                    </Formik>
                </DialogContent>
            </Dialog>
            </>)}


            {loading ? (<CustomSkeleton />) : (<>
                <Main>
                    <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>All Consultation Purchase</h3>
                    <HContainer>
                        <Con>
                            <Title>Data per Page</Title>
                            <Input value={page}
                                onChange={(e) => setPage(e.target.value)}
                                placeholder="Page Size"></Input>
                        </Con>
                        <Con>
                            <Title>Search All</Title>
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search all"></Input>
                        </Con>
                        <Con>
                            <Title>Sort By</Title>
                            <Input
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                placeholder="Sort by"></Input>
                        </Con>
                        <Con>
                            <Title>Sort Order</Title>
                            <Input
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                placeholder="asc or desc"></Input>
                        </Con>
                        <Set>
                            <Button
                                variant="contained"
                                style={{ margin: "10px", background: "#800080" }}
                                onClick={handleShow}
                                color="primary">Search</Button>
                            <Button
                                variant="contained"
                                style={{ margin: "10px", background: "#800080" }}
                                onClick={() => {
                                    setListOfOrders([])
                                    setShow(false)
                                    setPage('')
                                    setSearch('')
                                    setSort('')
                                    setOrder('')
                                }}
                                color="primary">Reset</Button>
                        </Set>
                    </HContainer>
                    {show && (<>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell >User ID</TableCell>
                                        <TableCell >Consultation Package ID</TableCell>
                                        <TableCell >Payment ID</TableCell>
                                        <TableCell >Satus</TableCell>
                                        <TableCell >Billing Address Line1</TableCell>
                                        <TableCell>Billing Address Line2</TableCell>
                                        <TableCell >Consultation Package Name</TableCell>
                                        <TableCell >Consultation Package Duration</TableCell>
                                        <TableCell >Amount Paid</TableCell>
                                        <TableCell >Update</TableCell>
                                        <TableCell >Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listoforders.map((orderlist) => (
                                        <TableRow
                                            key={orderlist.id}>
                                            <TableCell component="th" scope="row">
                                                {orderlist.id}
                                            </TableCell>
                                            <TableCell>{orderlist.user_id}</TableCell>
                                            <TableCell>{orderlist.consultation_package_id}</TableCell>
                                            <TableCell>{orderlist.payment_id}</TableCell>
                                            <TableCell>{orderlist.status}</TableCell>
                                            <TableCell>{orderlist.billing_address_line1}</TableCell>
                                            <TableCell>{orderlist.billing_address_line2}</TableCell> 
                                            <TableCell>{orderlist.consultation_package_name}</TableCell>
                                            <TableCell>{orderlist.consultation_package_duration}</TableCell>
                                            <TableCell>{orderlist.amount_paid}</TableCell>
                                            
                                            <TableCell>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => handleUpdate(orderlist)}>
                                                    Update
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outlined" color="secondary"
                                                    onClick={() => handleDelete(orderlist)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>)}
                    <Snackbar
                        autoHideDuration={3000}
                        anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                        message="Success"
                        open={Issuccess}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success">
                            Success Message !
                        </Alert>
                    </Snackbar>
                </Main>
            </>)}
        </>
    )
}

export default PostOrder
