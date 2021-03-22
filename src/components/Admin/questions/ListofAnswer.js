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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from '../../reusable/Table';

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

const ListofAnswer = () => {
  const dispatch = useDispatch();
  const listOfAnswer = useSelector(selectListOfAnswer);

  const [listOfAnswers, setListOfAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('answer');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);


  const handleShow = () => {
    axios
      .get(`answers?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setListOfAnswers(res.data.data);
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
            <TableHeader
              title="List of All Answers"
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
                    { id: 'user_name', label: 'User Name', sort: false },
                    { id: 'question_question', label: 'Question', sort: true },
                    { id: 'answer', label: 'Answer', sort: true },
                    { id: 'answer_option_option', label: 'Answer Option', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: listOfAnswers.map((answer) => {
                    return [
                      `${answer?.user?.first_name || ''} ${answer?.user?.last_name || ''}`,
                      answer.question_question,
                      answer.answer,
                      answer.answer_option_option,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(answer);
                            // handleUpdate(answer);
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

export default ListofAnswer;
