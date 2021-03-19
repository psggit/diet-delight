import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

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
  DialogTitle,
  DialogContent,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import {
  setConsultationPackage,
  selectConsultationPackage,
  resetConsultationPackage,
} from "../../../features/adminSlice";

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
} from "./QuestionElements";
import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

// const validationSchema = Yup.object().shape({
//     question: Yup.string().required().label("Question"),
//     type: Yup.number().required().max(3).label("Type"),
//     order: Yup.number().required().label("Order")
// });

const ListConsultationPackage = () => {
  const dispatch = useDispatch();

  const [consultantPackages, setConsultationPackages] = useState([]);
  const consultationPackage = useSelector(selectConsultationPackage);
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  let current_date_Time = new Date();
  const csvReport = {
    data: consultantPackages,
    filename: `List_of_consultantPackages_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios
      .get(
        `consultation-packages?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setConsultationPackages(res.data.data);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `consultation-packages?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setConsultationPackages(res.data.data);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccess(false);
  };

  const handleUpdate = async (consultationPack) => {
    await dispatch(
      setConsultationPackage({
        id: consultationPack.id,
        name: consultationPack.name,
        status: consultationPack.status,
        duration: consultationPack.duration,
        order: consultationPack.order,
        subtitle: consultationPack.subtitle,
        details: consultationPack.details,
        picture: consultationPack.picture,
        price: consultationPack.price,
        sale_price: consultationPack.sale_price,
      })
    );
    await setISUpdate(true);
  };

  const handleDelete = async (consultationPack) => {
    await dispatch(resetConsultationPackage());
    await dispatch(
      setConsultationPackage({
        id: consultationPack.id,
      })
    );
    await setIsDelete(true);
  };

  const CloseDelete = () => setIsDelete(false);
  const CloseUpdate = () => setISUpdate(false);

  const classes = useStyles();

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
                      .delete(`consultation-packages/${consultationPackage.id}`)
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
            <DialogTitle id="form-dialog-title">
              Update Consultation Packages
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  name: consultationPackage.name,
                  status: consultationPackage.status,
                  duration: consultationPackage.duration,
                  order: consultationPackage.order,
                  subtitle: consultationPackage.subtitle,
                  details: consultationPackage.details,
                  picture: consultationPackage.picture,
                  price: consultationPackage.price,
                  sale_price: consultationPackage.sale_price,
                }}
                // validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`consultation-packages/${consultationPackage.id}`, {
                      headers: { 
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      name: values.name,
                      status: values.status,
                      duration: values.duration,
                      order: values.order,
                      subtitle: values.subtitle,
                      details: values.details,
                      picture: values.picture,
                      price: values.price,
                      sale_price: values.sale_price,
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      setISUpdate(false);
                      handleShow();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {({ handleSubmit, handleChange, errors, touched, values }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>ID :</Title>
                        <Input
                          value={values.id}
                          placeholder="ID"
                          onChange={handleChange("id")}
                        />
                      </Mini>
                      {errors.id && touched && <Info error>{errors.id}</Info>}
                      <Mini>
                        <Title>Name :</Title>
                        <Input
                          value={values.name}
                          placeholder="Name"
                          onChange={handleChange("name")}
                        />
                      </Mini>
                      {errors.name && touched && (
                        <Info error>{errors.name}</Info>
                      )}

                      <Mini>
                        <Title>Status :</Title>
                        <Input
                          value={values.status}
                          placeholder="Status"
                          onChange={handleChange("status")}
                        />
                      </Mini>
                      {errors.status && touched && (
                        <Info error>{errors.status}</Info>
                      )}

                      <Mini>
                        <Title>Duration :</Title>
                        <Input
                          value={values.duration}
                          placeholder="Duration"
                          onChange={handleChange("duration")}
                        />
                      </Mini>
                      {errors.duration && touched && (
                        <Info error>{errors.duration}</Info>
                      )}

                      <Mini>
                        <Title>Order :</Title>
                        <Input
                          value={values.order}
                          placeholder="Order"
                          onChange={handleChange("order")}
                        />
                      </Mini>
                      {errors.order && touched && (
                        <Info error>{errors.order}</Info>
                      )}

                      <Mini>
                        <Title>Subtitle :</Title>
                        <Input
                          value={values.subtitle}
                          placeholder="Subtitle"
                          onChange={handleChange("subtitle")}
                        />
                      </Mini>
                      {errors.subtitle && touched && (
                        <Info error>{errors.subtitle}</Info>
                      )}

                      <Mini>
                        <Title>Details :</Title>
                        <Input
                          value={values.details}
                          placeholder="Details"
                          onChange={handleChange("details")}
                        />
                      </Mini>
                      {errors.details && touched && (
                        <Info error>{errors.details}</Info>
                      )}

                      <Mini>
                        <Title>Picture :</Title>
                        <Input
                          type="text"
                          value={values.picture}
                          placeholder="Picture"
                          onChange={handleChange("picture")}
                        />
                      </Mini>
                      {errors.picture && touched && (
                        <Info error>{errors.picture}</Info>
                      )}

                      <Mini>
                        <Title>Price :</Title>
                        <Input
                          value={values.price}
                          placeholder="Price"
                          onChange={handleChange("price")}
                        />
                      </Mini>
                      {errors.price && touched && (
                        <Info error>{errors.price}</Info>
                      )}

                      <Mini>
                        <Title>Sale Price :</Title>
                        <Input
                          value={values.sale_price}
                          placeholder="Sale Price"
                          onChange={handleChange("sale_price")}
                        />
                      </Mini>
                      {errors.sale_price && touched && (
                        <Info error>{errors.sale_price}</Info>
                      )}

                      <Mini style={{ marginTop: "10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="contained"
                          style={{ margin: "10px", background: "#800080" }}
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
            <h3
              style={{
                textAlign: "left",
                marginLeft: "50px",
                marginBottom: "20px",
              }}
            >
              List Of Consulations Package
            </h3>
            <HContainer>
              <Con>
                <Title>Data per Page</Title>
                <Input
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  placeholder="Page Size"
                ></Input>
              </Con>
              <Con>
                <Title>Search All</Title>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search all"
                ></Input>
              </Con>
              <Con>
                <Title>Sort By</Title>
                <Input
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  placeholder="Sort by"
                ></Input>
              </Con>
              <Con>
                <Title>Sort Order</Title>
                <Input
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="asc or desc"
                ></Input>
              </Con>
              <Set>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  onClick={handleShow}
                  color="primary"
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  onClick={() => {
                    setConsultationPackages([]);
                    setShow(false);
                    setPage("");
                    setSearch("");
                    setSort("");
                    setOrder("");
                  }}
                  color="primary"
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                >
                  <CSVLink {...csvReport} style={{ color: "white" }}>
                    Export CSV
                  </CSVLink>
                </Button>
              </Set>
            </HContainer>
            {show && (
              <>
                <TableContainer style={{ margin: "10px 0" }} component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Subtitle</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Picture</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Sale_price</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {consultantPackages.map((consultationPack) => (
                        <TableRow key={consultationPack.id}>
                          <TableCell component="th" scope="row">
                            {consultationPack.id}
                          </TableCell>
                          <TableCell>{consultationPack.name}</TableCell>
                          <TableCell>{consultationPack.status}</TableCell>
                          <TableCell>{consultationPack.duration}</TableCell>
                          <TableCell>{consultationPack.order}</TableCell>
                          <TableCell>{consultationPack.subtitle}</TableCell>
                          <TableCell>{consultationPack.details}</TableCell>
                          <TableCell>{consultationPack.picture}</TableCell>
                          <TableCell>{consultationPack.price}</TableCell>
                          <TableCell>{consultationPack.sale_price}</TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(consultationPack)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(consultationPack)}
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
export default ListConsultationPackage;
