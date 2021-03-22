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

import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";

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
  setConsultation,
  resetConsultation,
  selectConsultation,
} from "../../../features/adminSlice";
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import { Edit, Delete } from '@material-ui/icons';

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

const ListofConsultation = () => {
  const dispatch = useDispatch();
  const consultation = useSelector(selectConsultation);

  const [consultations, setConsultations] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('user_id');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  let current_date_Time = new Date();
  const csvReport = {
    data: consultations,
    filename: `List_of_consultations_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`consultations?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setConsultations(res.data.data);
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

  const handleUpdate = async (consul) => {
    await dispatch(
      setConsultation({
        id: consul.id,
        user_id: consul.user_id,
        consultation_purchase_id: consul.consultation_purchase_id,
        consultant_id: consul.consultant_id,
        status: consul.status,
        consultation_link: consul.consultation_link,
        consultation_time: consul.consultation_time,
        consultation_mode: consul.consultation_mode,
        consultant_name: consul.consultant_name,
        notes: consul.notes,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (consul) => {
    await dispatch(resetConsultation());
    await dispatch(
      setConsultation({
        id: consul.id,
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
                      .delete(`consultations/${consultation.id}`)
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
                  user_id: consultation.user_id,
                  consultation_purchase_id:
                    consultation.consultation_purchase_id,
                  consultant_id: consultation.consultant_id,
                  status: consultation.status,
                  consultation_link: consultation.consultation_link,
                  consultation_time: consultation.consultation_time,
                  consultation_mode: consultation.consultation_mode,
                  consultant_name: consultation.consultant_name,
                  notes: consultation.notes,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`consultations/${consultation.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      user_id: values.user_id,
                      consultation_purchase_id: values.consultation_purchase_id,
                      consultant_id: values.consultant_id,
                      status: values.status,
                      consultation_link: values.consultation_link,
                      consultation_time: values.consultation_time,
                      consultation_mode: values.consultation_mode,
                      consultant_name: values.consultant_name,
                      notes: values.notes,
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
                        <Title>User ID</Title>
                        <Input
                          value={values.user_id}
                          placeholder="User Id"
                          onChange={handleChange("user_id")}
                        ></Input>
                      </Mini>
                      {errors.user_id && touched && (
                        <Info error>{errors.user_id}</Info>
                      )}

                      <Mini>
                        <Title>Consultation Purchase ID</Title>
                        <Input
                          placeholder="Consultation Purchase ID"
                          value={values.consultation_purchase_id}
                          onChange={handleChange("consultation_purchase_id")}
                        ></Input>
                      </Mini>
                      {errors.consultation_purchase_id && touched && (
                        <Info error>{errors.consultation_purchase_id}</Info>
                      )}
                      <Mini>
                        <Title>Consultant ID</Title>
                        <Input
                          placeholder="Consultant ID"
                          value={values.consultant_id}
                          onChange={handleChange("consultant_id")}
                        ></Input>
                      </Mini>
                      {errors.consultant_id && touched && (
                        <Info error>{errors.consultant_id}</Info>
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
                        <Title>Consultation Link</Title>
                        <Input
                          placeholder="Consultation Link"
                          value={values.consultation_link}
                          onChange={handleChange("consultation_link")}
                        />
                      </Mini>
                      {errors.consultation_link && touched && (
                        <Info error>{errors.consultation_link}</Info>
                      )}
                      <Mini>
                        <Title>Consultation Time</Title>
                        <Input
                          placeholder="Consultation Time"
                          value={values.consultation_time}
                          onChange={handleChange("consultation_time")}
                        />
                      </Mini>
                      {errors.consultation_time && touched && (
                        <Info error>{errors.consultation_time}</Info>
                      )}
                      <Mini>
                        <Title>Consultation Mode</Title>
                        <Input
                          placeholder="Consultation Mode"
                          value={values.consultation_mode}
                          onChange={handleChange("consultation_mode")}
                        />
                      </Mini>
                      {errors.consultation_mode && touched && (
                        <Info error>{errors.consultation_mode}</Info>
                      )}
                      <Mini>
                        <Title>Consultant Name</Title>
                        <Input
                          placeholder="Consultant Name"
                          value={values.consultant_name}
                          onChange={handleChange("consultant_name")}
                        />
                      </Mini>
                      {errors.consultant_name && touched && (
                        <Info error>{errors.consultant_name}</Info>
                      )}
                      <Mini>
                        <Title>Notes</Title>
                        <Input
                          placeholder="Notes"
                          value={values.notes}
                          onChange={handleChange("notes")}
                        />
                      </Mini>
                      {errors.notes && touched && (
                        <Info error>{errors.notes}</Info>
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
              title="List of All Consultations"
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
                    { id: 'user_id', label: 'User', sort: false },
                    { id: 'consultation_purchase_id', label: 'Consultation Purchase ID', sort: true },
                    { id: 'consultant_id', label: 'Consultant ID', sort: true },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'consultation_link', label: 'Consultation Link', sort: false },
                    { id: 'consultation_time', label: 'Consultation Time', sort: false },
                    { id: 'consultation_mode', label: 'Consultation Mode', sort: true },
                    { id: 'consultant_name', label: 'Consultant Name', sort: true },
                    { id: 'notes', label: 'Notes', sort: false },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: consultations.map((consultation) => {
                    return [
                      `${consultation?.user?.first_name || ''} ${consultation?.user?.last_name || ''}`,
                      consultation.consultation_purchase_id,
                      consultation.consultant_id,
                      consultation.status,
                      <a href={consultation.consultation_link} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      consultation.consultation_time,
                      consultation.consultation_mode,
                      consultation.consultant_name,
                      consultation.notes,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(consultation);
                            // handleUpdate(consultation);
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

export default ListofConsultation;
