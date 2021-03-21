import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

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
import Table from '../../reusable/Table';
import { Edit, Delete } from '@material-ui/icons';
import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";
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
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
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
            <TableHeader
              title="List of All Consultation Packages"
              csvReport={csvReport}
              addHandler={() => {
                // TODO: Handle add
              }}
              searchHandler={(value) => {
                // TODO: Handle search
              }}
            />
            {show && (
              <Table
                dataSource={{
                  columns: [
                    { id: 'name', label: 'Name', sort: true },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'duration', label: 'Duration', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'subtitle', label: 'Sub Title', sort: true },
                    { id: 'details', label: 'Details', sort: false },
                    { id: 'picture', label: 'Picture', sort: false },
                    { id: 'price', label: 'Price', sort: true },
                    { id: 'sale_price', label: 'Sale Price', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: consultantPackages.map((cPackage) => {
                    return [
                      cPackage.name,
                      cPackage.status,
                      cPackage.duration,
                      cPackage.order,
                      cPackage.subtitle,
                      cPackage.details,
                      <a href={cPackage.picture} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      cPackage.price,
                      cPackage.sale_price,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(cPackage);
                            // handleUpdate(cPackage);
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
export default ListConsultationPackage;
