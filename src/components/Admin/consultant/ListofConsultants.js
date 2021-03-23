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
import ConsultantFormModal from './ConsultantFormModal';
import Modal from '../../reusable/Modal';

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

const consultantInitialValue = {
  id: '',
  name: '',
  status: '',
  qualification: '',
  bio: '',
  order: '',
}

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
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('Add');
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentConsultant, setCurrentConsultant] = useState(consultantInitialValue);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('roles').then(res => {
      const role = (res?.data?.data || []).find(r => r.name === 'Consultant')

      if (role) {
        axios.get(`users?role_id=${role.id}`).then((res) => {
          setUsers((res?.data?.data || []).map((user) => {
            return {
              id: user.id,
              name: `${user.first_name || ''} ${user.last_name || ''}`,
            }
          }));
        });
      }
    });
  }, []);

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
      .get(`consultants?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
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
    setNotificationConf([false, 'success', '']);
  };

  const handleFormSubmit = (values) => {
    const data = {
      user_id: values.name,
      name: (users.find(u => u.id === values.name) || { name: '' }).name,
      status: values.status,
      qualification: values.qualification,
      bio: values.bio,
      order: parseInt(values.order, 10),
    }
    if (mode === 'Add') {

      axios.post(`consultants`, data).then((res) => {
        setNotificationConf([true, 'success', 'Consultant Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`consultants/${currentConsultant.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Consultant Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
    console.log(data);
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
                .delete(`consultants/${currentConsultant.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Consultant Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <ConsultantFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentConsultant(consultantInitialValue)
            }
          }}
          mode={mode}
          values={currentConsultant}
          onSubmit={handleFormSubmit}
          users={users}
        />
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
                            setMode('Update')
                            setCurrentConsultant({
                              id: consultant.id,
                              name: consultant.user_id,
                              status: consultant.status,
                              qualification: consultant.qualification,
                              bio: consultant.bio,
                              order: consultant.order,
                            });
                            setShowForm(true);
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

export default ListofConsultants;
