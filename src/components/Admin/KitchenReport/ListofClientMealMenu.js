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
  setQuestion,
  selectQuestion,
  resetQuestion,
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

const validationSchema = Yup.object().shape({
  question: Yup.string().required().label("Question"),
  type: Yup.number().required().max(3).label("Type"),
  order: Yup.number().required().label("Order"),
});

const ListofQuestions = () => {
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const question = useSelector(selectQuestion);
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
    data: questions,
    filename: `List_of_questions_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios
      .get(
        `questions?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setQuestions(res.data.data);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `questions?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setQuestions(res.data.data);
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

  const handleUpdate = async (user) => {
    await dispatch(
      setQuestion({
        id: user.id,
        question: user.question,
        type: user.type,
        order: user.order,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (user) => {
    await dispatch(resetQuestion());
    await dispatch(
      setQuestion({
        id: user.id,
      })
    );
    await setIsDelete(true);
  };

  const CloseDelete = () => setIsDelete(false);
  const CloseUpdate = () => setISUpdate(false);

  function handleType(type) {
    console.log(type);
    if (type == 0) {
      return "text";
    } else if (type == 1) {
      return "yes/No";
    } else if (type == 2) {
      return "dropdown";
    } else {
      return "number";
    }
  }

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
                      .delete(`questions/${question.id}`)
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
                  question: question.question,
                  type: question.type,
                  order: question.order,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`questions/${question.id}`, {
                      question: values.question,
                      type: values.type,
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
                {({ handleSubmit, handleChange, errors, touched, values }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>Question :</Title>
                        <Input
                          value={values.question}
                          placeholder="Question"
                          onChange={handleChange("question")}
                        />
                      </Mini>
                      {errors.question && touched && (
                        <Info error>{errors.question}</Info>
                      )}
                      <Mini>
                        <Title>Type :</Title>
                        <Select
                          defaultValue={values.type}
                          onChange={handleChange("type")}
                        >
                          <MenuItem value={0}>Text</MenuItem>
                          <MenuItem value={1}>Yes/No</MenuItem>
                          <MenuItem value={2}>Dropdown </MenuItem>
                          <MenuItem value={3}>Number </MenuItem>
                        </Select>
                      </Mini>
                      {errors.type && touched && (
                        <Info error>{errors.type}</Info>
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
                      <Mini style={{ marginTop: "10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px", background: "#800080" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px", background: "#800080" }}
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
              List All Question
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
                    setQuestions([]);
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
                        <TableCell>Question</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questions.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell component="th" scope="row">
                            {user.id}
                          </TableCell>
                          <TableCell>{user.question}</TableCell>
                          <TableCell>{handleType(user.type)}</TableCell>
                          <TableCell>{user.order}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(user)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(user)}
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

export default ListofQuestions;
