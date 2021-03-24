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
import AnswerFormModal from './AnswerFormModal';
import Modal from '../../reusable/Modal';

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

const answerInitialValue = {
  id: '',
  question: '',
  user: '',
  answer: '',
}

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
  const [mode, setMode] = useState('Add');
  const [isdelete, setIsDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUpdate, setISUpdate] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentAnswer, setCurrentAnswer] = useState(answerInitialValue);
  const [customers, setCustomers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`users?role_id=${1}`).then((res) => {
      setCustomers((res?.data?.data || []).map((user) => {
        return {
          id: user.id,
          name: `${user.first_name || ''} ${user.last_name || ''}`,
          email: user.email,
          mobile: user.mobile,
        }
      }));
    });
    axios.get(`questions`).then((res) => {
      setQuestions((res?.data?.data || []).map((question) => {
        return {
          id: question.id,
          name: question.question,
          type: question.type,
          additionalText: question.additional_text,
        }
      }));
    });
  }, [])

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);


  const handleShow = () => {
    axios
      .get(`answers?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
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
    setNotificationConf([false, 'success', '']);
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

  const handleFormSubmit = (values) => {
    const question = questions.find(q => q.id === values.question) || { id: '', name: '', type: 0, additionalText: '' }
    const data = {
      user_id: values.user,
      question_id: question.id,
      question_question: question.name,
      question_type: question.type,
      question_additional_text: question.additionalText,
      answer: values.answer,
    }

    if (mode === 'Add') {
      axios.post(`answers`, data).then((res) => {
        setNotificationConf([true, 'success', 'Answer Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`answers/${currentAnswer.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Answer Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }

    console.log(values)
    setShowForm(false);
  }

  const [showNotification, notificationType, notification] = notificationConf;

  return (
    <>
      {isdelete && (
        <Modal
          visible={isdelete}
          onClose={() => setIsDelete(false)}
          title="Delete Answer"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`answers/${currentAnswer.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Answer Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}

      {showForm && (
        <AnswerFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentAnswer(answerInitialValue)
            }
          }}
          mode={mode}
          values={currentAnswer}
          onSubmit={handleFormSubmit}
          users={customers}
          questions={questions}
        />
      )}

      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main>
            <TableHeader
              title="List of All Customer Response"
              csvReport={csvReport}
              addHandler={() => {
                setMode('Add');
                setShowForm(true);
              }}
              searchHandler={(value) => {
                setSearch(value);
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
                            setMode('Update')
                            setCurrentAnswer({
                              id: answer.id,
                              question: answer.question_id,
                              user: answer.user_id,
                              answer: answer.answer,
                            });
                            setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete onClick={() => {
                          setCurrentAnswer(answer);
                          setIsDelete(true)
                        }} style={{ margin: '0 6px', cursor: 'pointer' }} />
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
              open={showNotification}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={notificationType}>
                {notification}
              </Alert>
            </Snackbar>
          </Main>
        </>
      )}
    </>
  );
};

export default ListofAnswer;
