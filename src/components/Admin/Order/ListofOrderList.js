import React, { useState, useEffect } from 'react'

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { Formik } from 'formik'
import { CSVLink } from "react-csv";

// import * as Yup from 'yup'

import { Main, HContainer, Con, Input, Title, Set, Mini, Info, Container } from './ConsultantElements'
import { useDispatch, useSelector } from 'react-redux'
import { selectListOfOrder, resetListOfOrder, setListOfOrder } from '../../../features/adminSlice'
import TableHeader from '../../reusable/TableHeader';

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


const ListofOrder = () => {

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

  let current_date_Time = new Date();
  const csvReport = {
    data: listoforders,
    filename: `List_of_listoforders_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios.get(`meal-purchases?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
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
    axios.get(`meal-purchases?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
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
      id: orderlist.id,
      user_id: orderlist.user_id,
      meal_plan_id: orderlist.meal_plan_id,
      payment_id: orderlist.payment_id,
      status: orderlist.status,
      billing_address_line1: orderlist.billing_address_line1,
      billing_address_line2: orderlist.billing_address_line2,
      shipping_address_line1: orderlist.shipping_address_line1,
      shipping_address_line2: orderlist.shipping_address_line2,
      meal_plan_name: orderlist.meal_plan_name,
      meal_plan_duration: orderlist.meal_plan_duration,
      amount_paid: orderlist.amount_paid,
      start_date: orderlist.start_date,
      end_date: orderlist.end_date,
      weekdays: orderlist.weekdays,
      kcal: orderlist.kcal,
      portions: orderlist.portions,

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
      {isdelete && (
        <>
          {" "}
          <Dialog
            open={isdelete}
            onClose={CloseDelete}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
            <DialogContent>
              <Mini>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    axios
                      .delete(`meal-purchases/${listoforder.id}`)
                      .then((res) => {
                        setIsSuccess(true);
                        setIsDelete(false);
                        handleShow();
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Delete
                  </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  color="primary"
                  onClick={CloseDelete}
                >
                  Close
                  </Button>
              </Mini>
            </DialogContent>
          </Dialog>
        </>
      )}

      {isupdate && (
        <>
          {" "}
          <Dialog
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
                  user_id: listoforder.user_id,
                  meal_plan_id: listoforder.meal_plan_id,
                  payment_id: listoforder.payment_id,
                  status: listoforder.status,
                  billing_address_line1: listoforder.billing_address_line1,
                  billing_address_line2: listoforder.billing_address_line2,
                  shipping_address_line1: listoforder.shipping_address_line1,
                  shipping_address_line2: listoforder.shipping_address_line2,
                  meal_plan_name: listoforder.meal_plan_name,
                  meal_plan_duration: listoforder.meal_plan_duration,
                  amount_paid: listoforder.amount_paid,
                  start_date: listoforder.start_date,
                  end_date: listoforder.end_date,
                  weekdays: listoforder.weekdays,
                  kcal: listoforder.kcal,
                  portions: listoforder.portions,
                }}
                onSubmit={(values) => {
                  axios
                    .put(`meal-purchases/${listoforder.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      user_id: values.user_id,
                      meal_plan_id: values.meal_plan_id,
                      payment_id: values.payment_id,
                      status: values.status,
                      billing_address_line1: values.billing_address_line1,
                      billing_address_line2: values.billing_address_line2,
                      shipping_address_line1: values.shipping_address_line1,
                      shipping_address_line2: values.shipping_address_line2,
                      meal_plan_name: values.meal_plan_name,
                      meal_plan_duration: values.meal_plan_duration,
                      amount_paid: values.amount_paid,
                      start_date: values.start_date,
                      end_date: values.end_date,
                      weekdays: values.weekdays,
                      kcal: values.kcal,
                      portions: values.portions,
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      setISUpdate(false);
                      handleShow();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                  values,
                }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>User ID</Title>
                        <Input
                          value={values.user_id}
                          placeholder="User ID"
                          onChange={handleChange("user_id")}
                        ></Input>
                      </Mini>
                      {errors.user_id && touched && (
                        <Info error>{errors.user_id}</Info>
                      )}

                      <Mini>
                        <Title>Meal Plan ID</Title>
                        <Input
                          placeholder=" Meal Plan ID"
                          value={values.meal_plan_id}
                          onChange={handleChange("meal_plan_id")}
                        ></Input>
                      </Mini>
                      {errors.meal_plan_id && touched && (
                        <Info error>{errors.meal_plan_id}</Info>
                      )}
                      <Mini>
                        <Title>Payment ID</Title>
                        <Input
                          placeholder="Payment ID"
                          value={values.payment_id}
                          onChange={handleChange("payment_id")}
                        ></Input>
                      </Mini>
                      {errors.payment_id && touched && (
                        <Info error>{errors.payment_id}</Info>
                      )}
                      <Mini>
                        <Title>Status</Title>
                        <Input
                          placeholder="Status"
                          value={values.status}
                          onChange={handleChange("status")}
                        />
                      </Mini>
                      {errors.status && touched && (
                        <Info error>{errors.status}</Info>
                      )}
                      <Mini>
                        <Title>Billing Address Line1</Title>
                        <Input
                          placeholder="Billing Address Line1"
                          value={values.billing_address_line1}
                          onChange={handleChange("billing_address_line1")}
                        />
                      </Mini>
                      {errors.billing_address_line1 && touched && (
                        <Info error>{errors.billing_address_line1}</Info>
                      )}
                      <Mini>
                        <Title>Billing Address Line2</Title>
                        <Input
                          placeholder="Billing Address Line2"
                          value={values.billing_address_line2}
                          onChange={handleChange("billing_address_line2")}
                        />
                      </Mini>
                      {errors.billing_address_line2 && touched && (
                        <Info error>{errors.billing_address_line2}</Info>
                      )}
                      <Mini>
                        <Title>Shipping_address_line1</Title>
                        <Input
                          placeholder="Shipping_address_line1"
                          value={values.shipping_address_line1}
                          onChange={handleChange("shipping_address_line1")}
                        />
                      </Mini>
                      {errors.shipping_address_line1 && touched && (
                        <Info error>{errors.shipping_address_line1}</Info>
                      )}
                      <Mini>
                        <Title>Shipping_address_line2</Title>
                        <Input
                          placeholder="Shipping_address_line2"
                          value={values.shipping_address_line2}
                          onChange={handleChange("shipping_address_line2")}
                        />
                      </Mini>
                      {errors.shipping_address_line2 && touched && (
                        <Info error>{errors.shipping_address_line2}</Info>
                      )}
                      <Mini>
                        <Title>Meal Plan Name</Title>
                        <Input
                          placeholder="Meal Plan Name"
                          value={values.meal_plan_name}
                          onChange={handleChange("meal_plan_name")}
                        />
                      </Mini>
                      {errors.meal_plan_name && touched && (
                        <Info error>{errors.meal_plan_name}</Info>
                      )}
                      <Mini>
                        <Title>Meal Plan Duration</Title>
                        <Input
                          placeholder="Meal Plan Duration"
                          value={values.meal_plan_duration}
                          onChange={handleChange("meal_plan_duration")}
                        />
                      </Mini>
                      {errors.meal_plan_duration && touched && (
                        <Info error>{errors.meal_plan_duration}</Info>
                      )}
                      <Mini>
                        <Title>Amount Paid</Title>
                        <Input
                          placeholder="Amount Paid"
                          value={values.amount_paid}
                          onChange={handleChange("amount_paid")}
                        />
                      </Mini>
                      {errors.amount_paid && touched && (
                        <Info error>{errors.amount_paid}</Info>
                      )}
                      <Mini>
                        <Title>Start Date</Title>
                        <Input
                          placeholder="Start Date"
                          value={values.start_date}
                          onChange={handleChange("start_date")}
                        />
                      </Mini>
                      {errors.start_date && touched && (
                        <Info error>{errors.start_date}</Info>
                      )}
                      <Mini>
                        <Title>End Date</Title>
                        <Input
                          placeholder="End Date"
                          value={values.end_date}
                          onChange={handleChange("end_date")}
                        />
                      </Mini>
                      {errors.end_date && touched && (
                        <Info error>{errors.end_date}</Info>
                      )}
                      <Mini>
                        <Title>Weekdays</Title>
                        <Input
                          placeholder="Weekdays"
                          value={values.weekdays}
                          onChange={handleChange("weekdays")}
                        />
                      </Mini>
                      {errors.weekdays && touched && (
                        <Info error>{errors.weekdays}</Info>
                      )}
                      <Mini>
                        <Title>Kcal</Title>
                        <Input
                          placeholder="Kcal"
                          value={values.kcal}
                          onChange={handleChange("kcal")}
                        />
                      </Mini>
                      {errors.kcal && touched && (
                        <Info error>{errors.kcal}</Info>
                      )}
                      <Mini>
                        <Title>Portions</Title>
                        <Input
                          placeholder="Portions"
                          value={values.portions}
                          onChange={handleChange("portions")}
                        />
                      </Mini>
                      {errors.portions && touched && (
                        <Info error>{errors.portions}</Info>
                      )}

                      <Mini>
                        <Button
                          variant="contained"
                          style={{
                            margin: "20px",
                            padding: "5px",
                            background: "#800080",
                          }}
                          color="primary"
                          onClick={handleSubmit}
                        >
                          submit
                          </Button>
                        <Button
                          variant="contained"
                          style={{
                            margin: "20px",
                            padding: "5px",
                            background: "#800080",
                          }}
                          color="primary"
                          onClick={CloseUpdate}
                        >
                          Close
                          </Button>
                      </Mini>
                    </Container>
                  </>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      )}

      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main>
            <TableHeader
              title="List of All Meal Purchase"
              csvReport={csvReport}
              addHandler={() => {
                // TODO: Handle add
              }}
              searchHandler={(value) => {
                // TODO: Handle search
              }}
            />
            {show && (
              <>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Meal Plan ID</TableCell>
                        <TableCell>Payment ID</TableCell>
                        <TableCell>Satus</TableCell>
                        <TableCell>Billing Address Line1</TableCell>
                        <TableCell>Billing Address Line2</TableCell>
                        <TableCell>Shipping Address Line1</TableCell>
                        <TableCell>Shipping Address Line2</TableCell>
                        <TableCell>Meal Plan Name</TableCell>
                        <TableCell>Meal Plan Duration</TableCell>
                        <TableCell>Amount Paid</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Weekdays</TableCell>
                        <TableCell>Kcal</TableCell>
                        <TableCell>Portions</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listoforders.map((orderlist) => (
                        <TableRow key={orderlist.id}>
                          <TableCell component="th" scope="row">
                            {orderlist.id}
                          </TableCell>
                          <TableCell>{orderlist.user_id}</TableCell>
                          <TableCell>{orderlist.meal_plan_id}</TableCell>
                          <TableCell>{orderlist.payment_id}</TableCell>
                          <TableCell>{orderlist.status}</TableCell>
                          <TableCell>
                            {orderlist.billing_address_line1}
                          </TableCell>
                          <TableCell>
                            {orderlist.billing_address_line2}
                          </TableCell>
                          <TableCell>
                            {orderlist.shipping_address_line1}
                          </TableCell>
                          <TableCell>
                            {orderlist.shipping_address_line2}
                          </TableCell>
                          <TableCell>{orderlist.meal_plan_name}</TableCell>
                          <TableCell>
                            {orderlist.meal_plan_duration}
                          </TableCell>
                          <TableCell>{orderlist.amount_paid}</TableCell>
                          <TableCell>{orderlist.start_date}</TableCell>
                          <TableCell>{orderlist.end_date}</TableCell>
                          <TableCell>{orderlist.weekdays}</TableCell>
                          <TableCell>{orderlist.kcal}</TableCell>
                          <TableCell>{orderlist.portions}</TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(orderlist)}
                            >
                              Update
                              </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(orderlist)}
                            >
                              Delete
                              </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              message="Success"
              open={Issuccess}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                Success Message !
                </Alert>
            </Snackbar>
          </Main>
        </>
      )}
    </>
  );
}

export default ListofOrder
