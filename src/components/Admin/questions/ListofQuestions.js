import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

import { Snackbar } from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  selectQuestion,
  resetQuestion,
} from "../../../features/adminSlice";

import {
  Main,
} from "./QuestionElements";
import QuestionFormModal from './QuestionFormModal';
import Modal from '../../reusable/Modal';
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import { QUESTION_TYPES } from '../Constants';

const ListofQuestions = () => {
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const question = useSelector(selectQuestion);
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [mode, setMode] = useState('Add');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isdelete, setIsDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: '',
    order: '',
  });

  let current_date_Time = new Date();
  const csvReport = {
    data: questions,
    filename: `List_of_questions_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
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
        setLoading(false);
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
    setNotificationConf([false, 'success', '']);
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

    setShowForm(true);
  };

  function handleType(type) {
    switch (type) {
      case 0:
        return QUESTION_TYPES[0].name;
      case 1:
        return QUESTION_TYPES[1].name;
      case 2:
        return QUESTION_TYPES[2].name;
      case 3:
        return QUESTION_TYPES[3].name;
    }
  }

  const handleFormSubmit = (values) => {
    if (mode === 'Add') {
      console.log(values)

      axios.post(`questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        question: values.question,
        type: values.type,
        order: values.order,
      }).then((res) => {
        setNotificationConf([true, 'success', 'Question Added Successfully !'])
        setShowForm(false);
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`questions/${question.id}`, {
          question: values.question,
          type: values.type,
          order: values.order,
        })
        .then((res) => {
          setNotificationConf([true, 'success', 'Question Updated Successfully !'])
          setShowForm(false);
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
  }

  const [showNotification, notificationType, notification] = notificationConf;

  return (
    <>
      {isdelete && (
        <Modal
          visible={isdelete}
          onClose={() => setIsDelete(false)}
          title="Delete Question"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              axios
                .delete(`questions/${question.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Question Deleted Successfully !'])
                  setIsDelete(false);
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <QuestionFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentQuestion({
                question: '',
                type: '',
                order: '',
              })
            }
          }}
          mode={mode}
          values={currentQuestion}
          onSubmit={handleFormSubmit}
        />
      )}

      {loading ? (
        <CustomSkeleton />
      ) : (
        <Main>
          <TableHeader
            title="List All Question"
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
                columns: ['Question', 'Type', 'Order', ''],
                rows: questions.map((q) => {
                  return [
                    q.question,
                    handleType(q.type),
                    q.order,
                    <>
                      <Edit
                        onClick={() => {
                          setMode('Update')
                          setCurrentQuestion(q);
                          handleUpdate(q);
                          setShowForm(true);
                        }}
                        style={{ margin: '0 6px', cursor: 'pointer' }}
                      />
                      <Delete onClick={() => setIsDelete(true)} style={{ margin: '0 6px', cursor: 'pointer' }} />
                    </>
                  ]
                })
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
      )}
    </>
  );
};

export default ListofQuestions;
