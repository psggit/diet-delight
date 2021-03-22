import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

import {
  makeStyles,
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
  setConsultant,
  resetConsultant,
  selectConsultant,
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  status: Yup.string().required().label("Status"),
  qualification: Yup.string().required().label("Qualification"),
  bio: Yup.string().required().label("Bio"),
  order: Yup.number().required().label("Order"),
});

const ListofConsultants = () => {
  const dispatch = useDispatch();
  const consultant = useSelector(selectConsultant);

  const [consultants, setConsultants] = useState([]);
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
    data: consultants,
    filename: `List_of_consultants_${current_date_Time}.csv`,
  };
  
    useEffect(() => {
      handleShow();
    }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`consultants?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setConsultants(res.data.data);
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

  const handleUpdate = async (user) => {
    await dispatch(
      setConsultant({
        id: user.id,
        name: user.name,
        status: user.status,
        order: user.order,
        qualification: user.qualification,
        bio: user.bio,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (user) => {
    await dispatch(resetConsultant());
    await dispatch(
      setConsultant({
        id: user.id,
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
                      .delete(`consultants/${consultant.id}`)
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
                  name: consultant.name,
                  status: consultant.status,
                  qualification: consultant.qualification,
                  bio: consultant.bio,
                  order: consultant.order,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`consultants/${consultant.id}`, {
                      name: values.name,
                      status: values.status,
                      qualification: values.qualification,
                      bio: values.bio,
                      order: values.order,
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
                        <Title>Name</Title>
                        <Input
                          value={values.name}
                          placeholder="Name"
                          onChange={handleChange("name")}
                        ></Input>
                      </Mini>
                      {errors.name && touched && (
                        <Info error>{errors.name}</Info>
                      )}
                      <Mini>
                        <Title>Status</Title>
                        <Select
                          defaultValue={values.status}
                          onChange={handleChange("status")}
                        >
                          <MenuItem value={0}>Available</MenuItem>
                          <MenuItem value={1}>Leave</MenuItem>
                          <MenuItem value={2}>Left</MenuItem>
                        </Select>
                      </Mini>
                      {errors.status && touched && (
                        <Info error>{errors.status}</Info>
                      )}
                      <Mini>
                        <Title>Qualifaication</Title>
                        <Input
                          placeholder="Qualification"
                          value={values.qualification}
                          onChange={handleChange("qualification")}
                        ></Input>
                      </Mini>
                      {errors.qualification && touched && (
                        <Info error>{errors.qualification}</Info>
                      )}
                      <Mini>
                        <Title>Bio</Title>
                        <Input
                          placeholder="Bio"
                          value={values.bio}
                          onChange={handleChange("bio")}
                        ></Input>
                      </Mini>
                      {errors.bio && touched && <Info error>{errors.bio}</Info>}
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
              title="List of All Consultants"
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
                    { id: 'qualification', label: 'Qualification', sort: true },
                    { id: 'bio', label: 'Bio', sort: true },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: consultants.map((consultant) => {
                    return [
                      consultant.name,
                      consultant.qualification,
                      consultant.bio,
                      consultant.status,
                      consultant.order,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(consultant);
                            // handleUpdate(consultant);
                            // setShowForm(true);
                            // TODO: Handle edit
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

export default ListofConsultants;
