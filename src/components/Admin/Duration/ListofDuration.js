import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

import {
  makeStyles,
  Table,
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

import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";
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
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
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
    axios
      .get(
        `durations?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfDurations(res.data.data);
        setLoading(false);
        setShow(true);
      });
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `durations?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfDurations(res.data.data);
        setShow(true);
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
              title="List of All Durations"
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
                        <TableCell>Title</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Subtitle</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Picture</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfDurations.map((durationlist) => (
                        <TableRow key={durationlist.id}>
                          <TableCell component="th" scope="row">
                            {durationlist.id}
                          </TableCell>
                          <TableCell>{durationlist.title}</TableCell>
                          <TableCell>{durationlist.duration}</TableCell>
                          <TableCell>{durationlist.order}</TableCell>
                          <TableCell>{durationlist.subtitle}</TableCell>
                          <TableCell>{durationlist.details}</TableCell>
                          <TableCell>{durationlist.picture}</TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(durationlist)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(durationlist)}
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
};

export default ListofDuration;
