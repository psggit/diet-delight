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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
} from "./QuestionElements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListOfAnswer,
  resetListOfAnswer,
  setListOfAnswer,
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

const ListofAnswer = () => {
  const dispatch = useDispatch();
  const listOfAnswer = useSelector(selectListOfAnswer);

  const [listOfAnswers, setListOfAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(
        `answers?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfAnswers(res.data.data);
        console.log(res.data.data);
        setLoading(false);
        setShow(true);
      });
      axios
      .get(
        `menu-orders?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
      });
  }, [page, search, sort, order]);

  // hitting user modedel for user name

  useEffect(() => {
    axios
      .get(
        `users?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.data);

        setShow(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [order, page, search, sort]);

  const handleShow = () => {
    axios
      .get(
        `answers?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfAnswers(res.data.data);
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

  const handleUpdate = async (answerlist) => {
    console.log(answerlist);
    await dispatch(
      setListOfAnswer({
        id: answerlist.id,
        user_id: answerlist.user_id,
        question_id: answerlist.question_id,
        answer_option_id: answerlist.answer_option_id,
        answer: answerlist.answer,
        question_question: answerlist.question_question,
        question_type: answerlist.question_type,
        question_additional_text: answerlist.question_additional_text,
        answer_option_option: answerlist.answer_option_option,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (answerlist) => {
    await dispatch(resetListOfAnswer());
    await dispatch(
      setListOfAnswer({
        id: answerlist.id,
      })
    );
    await setIsDelete(true);
  };

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfAnswers,
    filename: `List_of_listOfAnswers_${current_date_Time}.csv`,
  };

  // getting unique ids from all answer model
  console.log(listOfAnswers);

  useEffect(() => {
    var ids = [];
    var unique_ids = [];
    listOfAnswers.map((record) => {
      // console.log(record.user_id);
      ids = [...ids, record.user_id];
      // var ids = ids + record.user_id;
    });
    unique_ids = ids.filter((v, i, a) => a.indexOf(v) === i);
    setUniqueIds(unique_ids);
  }, [listOfAnswers]);

  // extracting name and id in a single array based on the unique ids from answers modal
  useEffect(() => {
    var filtr_users = [];

    uniqueIds.map((id) =>
      users
        .filter((user) => user.id === id)
        .map(
          (filteredUserId) =>
            (filtr_users = [
              ...filtr_users,
              [
                (filtr_users.id = filteredUserId.id),
                (filtr_users.name =
                  filteredUserId.first_name + " " + filteredUserId.last_name),
              ],
            ])
        )
    );

    // users.map((user) => console.log(user.id));
    setFilteredUser(filtr_users);
    // console.log("filtered users", filtr_users);
    // console.log("uniqueIds users", uniqueIds);
  }, [uniqueIds, users]);

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
                      .delete(`answers/${listOfAnswer.id}`)
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
                  user_id: listOfAnswer.user_id,
                  question_id: listOfAnswer.question_id,
                  answer_option_id: listOfAnswer.answer_option_id,
                  answer: listOfAnswer.answer,
                  question_question: listOfAnswer.question_question,
                  question_type: listOfAnswer.question_type,
                  question_additional_text:
                    listOfAnswer.question_additional_text,
                  answer_option_option: listOfAnswer.answer_option_option,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  axios
                    .put(`answers/${listOfAnswer.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      user_id: values.user_id,
                      question_id: values.question_id,
                      answer_option_id: values.answer_option_id,
                      answer: values.answer,
                      question_question: values.question_question,
                      question_type: values.question_type,
                      question_additional_text: values.question_additional_text,
                      answer_option_option: values.answer_option_option,
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
                        <Title>User ID :</Title>
                        <Input
                          value={values.user_id}
                          placeholder="User ID"
                          onChange={handleChange("user_id")}
                        />
                      </Mini>
                      {errors.user_id && touched && (
                        <Info error>{errors.user_id}</Info>
                      )}

                      <Mini>
                        <Title>Question ID :</Title>
                        <Input
                          value={values.question_id}
                          placeholder="Question ID"
                          onChange={handleChange("question_id")}
                        />
                      </Mini>
                      {errors.question_id && touched && (
                        <Info error>{errors.question_id}</Info>
                      )}

                      <Mini>
                        <Title>Answer Option ID :</Title>
                        <Input
                          value={values.answer_option_id}
                          placeholder="Answer Option ID"
                          onChange={handleChange("answer_option_id")}
                        />
                      </Mini>
                      {errors.answer_option_id && touched && (
                        <Info error>{errors.answer_option_id}</Info>
                      )}

                      <Mini>
                        <Title>Answer :</Title>
                        <Input
                          value={values.answer}
                          placeholder="Answer"
                          onChange={handleChange("answer")}
                        />
                      </Mini>
                      {errors.answer && touched && (
                        <Info error>{errors.answer}</Info>
                      )}

                      <Mini>
                        <Title>Question Question :</Title>
                        <Input
                          value={values.question_question}
                          placeholder="Question Question"
                          onChange={handleChange("question_question")}
                        />
                      </Mini>
                      {errors.question_question && touched && (
                        <Info error>{errors.question_question}</Info>
                      )}

                      <Mini>
                        <Title>Question Type :</Title>
                        <Input
                          value={values.question_type}
                          placeholder="Question Type"
                          onChange={handleChange("question_type")}
                        />
                      </Mini>
                      {errors.question_type && touched && (
                        <Info error>{errors.question_type}</Info>
                      )}
                      <Mini>
                        <Title>Question Additional Text :</Title>
                        <Input
                          value={values.question_additional_text}
                          placeholder="question_additional_text"
                          onChange={handleChange("question_additional_text")}
                        />
                      </Mini>
                      {errors.question_additional_text && touched && (
                        <Info error>{errors.question_additional_text}</Info>
                      )}
                      <Mini>
                        <Title>Answer Option Option :</Title>
                        <Input
                          value={values.answer_option_option}
                          placeholder="Answer Option Option"
                          onChange={handleChange("answer_option_option")}
                        />
                      </Mini>
                      {errors.answer_option_option && touched && (
                        <Info error>{errors.answer_option_option}</Info>
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
            <h3
              style={{
                textAlign: "left",
                marginLeft: "50px",
                marginBottom: "20px",
              }}
            >
              List of Answer
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
                    setListOfAnswers([]);
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
            {filteredUsers.map((id) => (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ marginRight: "50px" }}>
                    <b style={{ marginRight: "5px" }}>User ID:</b> {id[0]}
                  </span>{" "}
                  <span>
                    <b style={{ marginRight: "5px" }}>Name:</b> {id[1]}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {/* {listOfAnswers
                      .filter((answerlist) => answerlist.user_id === id)
                      .map((filteredUserId) => (
                        <li>{filteredUserId}</li>
                      ))} */}

                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Question Additional_ ext</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer Option </TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listOfAnswers
                            .filter(
                              (answerlist) => answerlist.user_id === id[0]
                            )
                            .map((filteredUserId) => (
                              <TableRow key={filteredUserId.id}>
                                <TableCell component="th" scope="row">
                                  {filteredUserId.user.first_name +
                                    " " +
                                    filteredUserId.user.last_name}
                                </TableCell>
                                <TableCell>
                                  {filteredUserId.question_additional_text}
                                </TableCell>
                                <TableCell>
                                  {filteredUserId.question_question}
                                </TableCell>
                                <TableCell>
                                  {filteredUserId.answer_option_option}
                                </TableCell>
                                <TableCell>{filteredUserId.answer}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleUpdate(filteredUserId)}
                                  >
                                    Update
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDelete(filteredUserId)}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            {/* {show && (
              <>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell> User ID</TableCell>
                        <TableCell>Question ID</TableCell>
                        <TableCell>Answer Option ID</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Question Question</TableCell>
                        <TableCell>Question Type</TableCell>
                        <TableCell>Question Additional_ ext</TableCell>
                        <TableCell>Answer Option Option</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfAnswers.map((answerlist) => (
                        <TableRow key={answerlist.id}>
                          <TableCell component="th" scope="row">
                            {answerlist.id}
                          </TableCell>
                          <TableCell>{answerlist.user_id}</TableCell>
                          <TableCell>{answerlist.question_id}</TableCell>
                          <TableCell>{answerlist.answer_option_id}</TableCell>
                          <TableCell>{answerlist.answer}</TableCell>
                          <TableCell>{answerlist.question_question}</TableCell>
                          <TableCell>{answerlist.question_type}</TableCell>
                          <TableCell>
                            {answerlist.question_additional_text}
                          </TableCell>
                          <TableCell>
                            {answerlist.answer_option_option}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(answerlist)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(answerlist)}
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
            )} */}
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

export default ListofAnswer;
