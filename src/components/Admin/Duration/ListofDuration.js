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
import MuiAlert from "@material-ui/lab/Alert";
import { Edit, Delete } from '@material-ui/icons';

import { Formik } from "formik";
import * as Yup from "yup";
import Table from '../../reusable/Table';
import TableHeader from '../../reusable/TableHeader';

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
  selectListOfDuration,
  resetListOfDuration,
  setListOfDuration,
} from "../../../features/adminSlice";

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

const ListofDuration = () => {
  const dispatch = useDispatch();
  const listOfDuration = useSelector(selectListOfDuration);

  const [listOfDurations, setListOfDurations] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfDurations,
    filename: `list_Of_Durations_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`durations?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setListOfDurations(res.data.data);
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

  const handleUpdate = async (durationlist) => {
    console.log(durationlist);
    await dispatch(
      setListOfDuration({
        id: durationlist.id,
        title: durationlist.title,
        duration: durationlist.duration,
        order: durationlist.order,
        subtitle: durationlist.subtitle,
        details: durationlist.details,
        picture: durationlist.picture,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (durationlist) => {
    await dispatch(resetListOfDuration());
    await dispatch(
      setListOfDuration({
        id: durationlist.id,
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
                      .delete(`durations/${listOfDuration.id}`)
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
                  title: listOfDuration.title,
                  duration: listOfDuration.duration,
                  order: listOfDuration.order,
                  subtitle: listOfDuration.subtitle,
                  details: listOfDuration.details,
                  picture: listOfDuration.picture,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`durations/${listOfDuration.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      title: values.title,
                      duration: values.duration,
                      order: values.order,
                      subtitle: values.subtitle,
                      details: values.details,
                      picture: values.picture,
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
                        <Title>Title</Title>
                        <Input
                          placeholder="Title"
                          value={values.title}
                          onChange={handleChange("title")}
                        ></Input>
                      </Mini>
                      {errors.title && touched && (
                        <Info error>{errors.title}</Info>
                      )}
                      <Mini>
                        <Title>Duration</Title>
                        <Input
                          placeholder="Duration"
                          value={values.duration}
                          onChange={handleChange("duration")}
                        ></Input>
                      </Mini>
                      {errors.duration && touched && (
                        <Info error>{errors.duration}</Info>
                      )}
                      <Mini>
                        <Title>Order</Title>
                        <Input
                          placeholder="Order"
                          value={values.order}
                          onChange={handleChange("order")}
                        />
                      </Mini>
                      {errors.order && touched && (
                        <Info error>{errors.order}</Info>
                      )}
                      <Mini>
                        <Title>Subtitle</Title>
                        <Input
                          placeholder="Subtitle"
                          value={values.subtitle}
                          onChange={handleChange("subtitle")}
                        />
                      </Mini>
                      {errors.subtitle && touched && (
                        <Info error>{errors.subtitle}</Info>
                      )}
                      <Mini>
                        <Title>Details</Title>
                        <Input
                          placeholder="Details"
                          value={values.details}
                          onChange={handleChange("details")}
                        />
                      </Mini>
                      {errors.details && touched && (
                        <Info error>{errors.details}</Info>
                      )}
                      <Mini>
                        <Title>Picture</Title>
                        <Input
                          placeholder="Picture"
                          value={values.picture}
                          onChange={handleChange("picture")}
                        />
                      </Mini>
                      {errors.picture && touched && (
                        <Info error>{errors.picture}</Info>
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
              title="List of Durations"
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
                    { id: 'title', label: 'Title', sort: true },
                    { id: 'duration', label: 'Duration', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'subtitle', label: 'Subtitle', sort: true },
                    { id: 'details', label: 'Details', sort: false },
                    { id: 'picture', label: 'Picture', sort: false },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: listOfDurations.map((duration) => {
                    return [
                      duration.title,
                      duration.duration,
                      duration.order,
                      duration.subtitle,
                      duration.details,
                      <a href={duration.picture} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(duration);
                            // handleUpdate(duration);
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

export default ListofDuration;
