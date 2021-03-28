import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

import { Snackbar } from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from "@material-ui/lab/Alert";

import { Main } from "./QuestionElements";
import QuestionFormModal from './QuestionFormModal';
import Modal from '../../reusable/Modal';
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import { QUESTION_TYPES } from '../Constants';

const questInitialValue = {
  id: '',
  question: '',
  type: '',
  order: '',
  options: [{ option: '' }],
}

const ListofQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('question');
  const [order, setOrder] = useState('asc');
  const [mode, setMode] = useState('Add');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isdelete, setIsDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentQuestion, setCurrentQuestion] = useState(questInitialValue);

  let current_date_Time = new Date();
  const csvReport = {
    data: questions,
    filename: `List_of_questions_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`questions?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setQuestions(res.data.data);
        setShow(true);
        setLoading(false);
        setTotalCount(res.data?.meta?.total || 0);
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
    const data = {
      question: values.question,
      type: values.type,
      order: values.order,
      additional_text: 0,
    }
    if (mode === 'Add') {
      axios.post(`questions`, data).then((res) => {
        setNotificationConf([true, 'success', 'Question Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`questions/${currentQuestion.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Question Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
    setShowForm(false);
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
              setIsDelete(false);
              axios
                .delete(`questions/${currentQuestion.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Question Deleted Successfully !'])
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
              setCurrentQuestion(questInitialValue)
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
            title="List of Question"
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
                  { id: 'question', label: 'Question', sort: true },
                  { id: 'type', label: 'Type', sort: true },
                  { id: 'order', label: 'Order', sort: true },
                  { id: 'actions', label: '', sort: false },
                ],
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
                          setShowForm(true);
                        }}
                        style={{ margin: '0 6px', cursor: 'pointer' }}
                      />
                      <Delete
                        onClick={() => {
                          setCurrentQuestion(q);
                          setIsDelete(true)
                        }}
                        style={{ margin: '0 6px', cursor: 'pointer' }}
                      />
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
      )}
    </>
  );
};

export default ListofQuestions;
