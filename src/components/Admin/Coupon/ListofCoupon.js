import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

import {
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from "@material-ui/lab/Alert";

import { Formik } from "formik";
import * as Yup from "yup";
import Table from '../../reusable/Table';

import {
  Main,
  HContainer,
  Con,
  Input,
  Title,
  Set,
  Mini,
  Info,
  Container,
} from "./ConsultantElements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListOfCoupon,
  resetListOfCoupon,
  setListOfCoupon,
} from "../../../features/adminSlice";
import TableHeader from '../../reusable/TableHeader';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

// const validationSchema = Yup.object().shape({
//     user_id: Yup.string().required().label("User ID"),
//     menu_item_id: Yup.string().required().label("Menu Item ID"),
//     menu_category_id: Yup.string().required().label("Menu Category ID"),
//     meal_purchase_id: Yup.string().required().label("Meal Purchase ID"),
//     status: Yup.string().required().label("Status"),
//     kcal: Yup.string().required().label("Kcal"),
//     menu_item_date: Yup.string().required().label("Menu Item Date"),
//     menu_item_day: Yup.number().required().label("Menu Item Day"),
//     menu_item_name: Yup.string().required().label("Menu Item Name"),
//     first_name: Yup.number().required().label("First Name"),
//     last_name: Yup.string().required().label("Last Name"),
//     mobile: Yup.number().required().label("Mobile"),
//     delivery_address: Yup.string().required().label("Delivery Address"),
//     notes: Yup.number().required().label("Notes"),
// });

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  code: Yup.string().required().label("Code"),
  flat_discount: Yup.string().required().label("Flat Discount"),
  percentage_discount: Yup.string().required().label("Percentage Discount"),
  expiry_date: Yup.string().required().label("Expiry Date"),
  times_usable: Yup.string().required().label("Times Usable"),
  times_used: Yup.string().required().label("Times Used"),
});

const ListofCoupon = () => {
  const dispatch = useDispatch();
  const listOfCoupon = useSelector(selectListOfCoupon);

  const [listOfCoupons, setListOfCoupons] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfCoupons,
    filename: `List_of_listOfCoupons_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`coupons?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setListOfCoupons(res.data.data);
        setLoading(false);
        setShow(true);
        setTotalCount(res.data?.meta?.total || 0);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSuccess(false);
  };

  const handleUpdate = async (couponlist) => {
    console.log(couponlist);
    await dispatch(
      setListOfCoupon({
        id: couponlist.id,
        name: couponlist.name,
        code: couponlist.code,
        flat_discount: couponlist.flat_discount,
        percentage_discount: couponlist.percentage_discount,
        expiry_date: couponlist.expiry_date,
        times_usable: couponlist.times_usable,
        times_used: couponlist.times_used,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (couponlist) => {
    await dispatch(resetListOfCoupon());
    await dispatch(
      setListOfCoupon({
        id: couponlist.id,
      })
    );
    await setIsDelete(true);
  };

  const CloseDelete = () => setIsDelete(false);
  const CloseUpdate = () => setISUpdate(false);

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
                      .delete(`coupons/${listOfCoupon.id}`)
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
            <DialogTitle id="form-dialog-title">Update Coupon</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  name: listOfCoupon.name,
                  code: listOfCoupon.code,
                  flat_discount: listOfCoupon.flat_discount,
                  percentage_discount: listOfCoupon.percentage_discount,
                  expiry_date: listOfCoupon.expiry_date,
                  times_usable: listOfCoupon.times_usable,
                  times_used: listOfCoupon.times_used,
                  menu_item_day: listOfCoupon.menu_item_day,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`coupons/${listOfCoupon.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      name: values.name,
                      code: values.code,
                      flat_discount: values.flat_discount,
                      percentage_discount: values.percentage_discount,
                      expiry_date: values.expiry_date,
                      times_usable: values.times_usable,
                      times_used: values.times_used,
                      menu_item_day: values.menu_item_day,
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      setISUpdate(false);
                      handleShow();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>ID</Title>
                        <Input
                          placeholder="ID"
                          value={values.id}
                          onChange={handleChange("id")}
                        ></Input>
                      </Mini>
                      {errors.id && touched && <Info error>{errors.id}</Info>}
                      <Mini>
                        <Title>Name</Title>
                        <Input
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange("name")}
                        ></Input>
                      </Mini>
                      {errors.name && touched && (
                        <Info error>{errors.name}</Info>
                      )}
                      <Mini>
                        <Title>Code</Title>
                        <Input
                          placeholder="Code"
                          value={values.code}
                          onChange={handleChange("code")}
                        ></Input>
                      </Mini>
                      {errors.code && touched && (
                        <Info error>{errors.code}</Info>
                      )}
                      <Mini>
                        <Title>Flat Discount</Title>
                        <Input
                          placeholder="Flat Discount"
                          value={values.flat_discount}
                          onChange={handleChange("flat_discount")}
                        />
                      </Mini>
                      {errors.flat_discount && touched && (
                        <Info error>{errors.flat_discount}</Info>
                      )}
                      <Mini>
                        <Title>Percentage Discount</Title>
                        <Input
                          placeholder="Dercentage Discount"
                          value={values.percentage_discount}
                          onChange={handleChange("percentage_discount")}
                        />
                      </Mini>
                      {errors.percentage_discount && touched && (
                        <Info error>{errors.percentage_discount}</Info>
                      )}
                      <Mini>
                        <Title>Expiry Date</Title>
                        <Input
                          placeholder="Expiry Date"
                          value={values.expiry_date}
                          onChange={handleChange("expiry_date")}
                        />
                      </Mini>
                      {errors.expiry_date && touched && (
                        <Info error>{errors.expiry_date}</Info>
                      )}
                      <Mini>
                        <Title>Times Usable</Title>
                        <Input
                          placeholder="Times Usable"
                          value={values.times_usable}
                          onChange={handleChange("times_usable")}
                        />
                      </Mini>
                      {errors.times_usable && touched && (
                        <Info error>{errors.times_usable}</Info>
                      )}
                      <Mini>
                        <Title>Times Used</Title>
                        <Input
                          placeholder="Times Used"
                          value={values.times_used}
                          onChange={handleChange("times_used")}
                        />
                      </Mini>
                      {errors.times_used && touched && (
                        <Info error>{errors.times_used}</Info>
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
              title="List of Coupons"
              csvReport={csvReport}
              addHandler={() => {
                // TODO: Handle add
              }}
              searchHandler={(value) => {
                setSearch(value);
              }}
            />
            {show && (
              <Table
                dataSource={{
                  columns: [
                    { id: 'name', label: 'Name', sort: true },
                    { id: 'code', label: 'Code', sort: true },
                    { id: 'flat_discount', label: 'Flat Discount', sort: true },
                    { id: 'percentage_discount', label: 'Percentage Discount', sort: true },
                    { id: 'expiry_date', label: 'Expiry Date', sort: true },
                    { id: 'times_usable', label: 'Times Usable', sort: true },
                    { id: 'times_used', label: 'Times Used', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: listOfCoupons.map((coupon) => {
                    return [
                      coupon.name,
                      coupon.code,
                      coupon.flat_discount,
                      coupon.percentage_discount,
                      coupon.expiry_date,
                      coupon.times_usable,
                      coupon.times_used,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(coupon);
                            // handleUpdate(coupon);
                            // setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete onClick={() => setIsDelete(true)} style={{ margin: '0 6px', cursor: 'pointer' }} />
                      </>
                    ]
                  })
                }}
                order={order}
                orderBy={sort}
                onSortClick={(key) => {
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                  setSort(key);
                }}
                pagination
                page={page}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                onChangePage={(_, newPage) => {
                  setPage(newPage);
                }}
                onChangeRowsPerPage={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
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
};

export default ListofCoupon;
