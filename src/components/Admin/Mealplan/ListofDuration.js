import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Edit, Delete } from '@material-ui/icons';

import Table from '../../reusable/Table';
import TableHeader from '../../reusable/TableHeader';
import Modal from '../../reusable/Modal';

import { Main } from "./MealPlanElements";
import DurationFormModal from './DurationFormModal';

const durationInitialValue = {
  id: '',
  title: '',
  subtitle: '',
  duration: '',
  order: '',
  details: '',
}

const ListofDuration = () => {
  const [listOfDurations, setListOfDurations] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');
  const [mode, setMode] = useState('Add');
  const [show, setShow] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentDuration, setCurrentDuration] = useState(durationInitialValue);

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfDurations,
    filename: `list_Of_Durations_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`durations?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setListOfDurations(res.data.data);
        setLoading(false);
        setShow(true);
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

  const handleFormSubmit = (values) => {
    const data = {
      title: values.title,
      subtitle: values.subtitle || '',
      order: parseInt(values.order, 10),
      duration: parseInt(values.duration, 10),
      details: values.details || '',
    }
    if (mode === 'Add') {
      axios.post(`durations`, data).then((res) => {
        setNotificationConf([true, 'success', 'Duration Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`durations/${currentDuration.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Duration Updated Successfully !'])
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
          title="Delete Duration"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`durations/${currentDuration.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Duration Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <DurationFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentDuration(durationInitialValue)
            }
          }}
          mode={mode}
          values={currentDuration}
          onSubmit={handleFormSubmit}
        />
      )}

      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main>
            <TableHeader
              title="List of Durations"
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
                    { id: 'title', label: 'Title', sort: true },
                    { id: 'subtitle', label: 'Subtitle', sort: true },
                    { id: 'duration', label: 'Duration', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'details', label: 'Description', sort: false },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: listOfDurations.map((duration) => {
                    return [
                      duration.title,
                      duration.subtitle,
                      duration.duration,
                      duration.order,
                      duration.details,
                      <>
                        <Edit
                          onClick={() => {
                            setMode('Update')
                            setCurrentDuration({
                              id: duration.id,
                              title: duration.title,
                              subtitle: duration.subtitle || '',
                              duration: duration.duration,
                              order: duration.order,
                              details: duration.details || '',
                            });
                            setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete onClick={() => {
                          setCurrentDuration(duration);
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

export default ListofDuration;
