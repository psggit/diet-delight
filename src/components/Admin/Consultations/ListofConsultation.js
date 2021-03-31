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
} from "./ConsultantElements";
import { useDispatch, useSelector } from "react-redux";
import {
  setConsultation,
  resetConsultation,
  selectConsultation,
} from "../../../features/adminSlice";
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import { Edit, Delete, DateRangeOutlined } from '@material-ui/icons';
import ConsultationFormModal from './ConsultationFormModal';


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

const consultationInitialValues = {
  id: '',
  customer: '',
  email: '',
  mobile: '',
  consultant: '',
  consultationPackage: '',
  status: '',
  mode: '',
  appointmentDate: '',
  appointmentTime: '',
}

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
  const [mode, setMode] = useState('Add');
  const [showForm, setShowForm] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(consultationInitialValues);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [consultationPackages, setConsultationPackages] = useState([]);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);

  let current_date_Time = new Date();
  const csvReport = {
    data: consultations,
    filename: `List_of_consultations_${current_date_Time}.csv`,
  };

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
    axios.get(`consultants`).then((res) => {
      setConsultants((res?.data?.data || []).map((user) => {
        return {
          id: user.id,
          name: user.name
        }
      }));
    });
    axios.get(`consultation-packages`).then((res) => {
      setConsultationPackages((res?.data?.data || []).map((user) => {
        return {
          id: user.id,
          name: user.name
        }
      }));
    });
  }, [])

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`consultations?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
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

  const handleFormSubmit = (values) => {
    const { appointmentTime, appointmentDate } = values;
    let date = '';
    if (appointmentTime && appointmentDate) {
      date = `${appointmentDate.getFullYear()}-${appointmentDate.getMonth()}-${appointmentDate.getDate()} ${appointmentTime.getHours()}:${appointmentTime.getMinutes()}:${appointmentTime.getSeconds()}`
    }

    const selectedConsultant = consultants.find(c => c.id === values.consultant);

    const data = {
      user_id: values.customer,
      consultation_purchase_id: values.consultationPackage,
      consultant_id: selectedConsultant.id,
      consultant_name: selectedConsultant.name,
      status: values.status,
      ...(date && { consultation_time: date }),
      consultation_mode: values.mode,
      notes: values.notes || '',
    };

    if (mode === 'Add') {
      axios.post(`consultations`, data).then((res) => {
        setNotificationConf([true, 'success', 'Consultation Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`consultations/${currentConsultation.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Consultation Updated Successfully !'])
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
          title="Delete Consultation"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`consultations/${currentConsultation.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Consultation Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <ConsultationFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentConsultation(consultationInitialValues)
            }
          }}
          mode={mode}
          values={currentConsultation}
          onSubmit={handleFormSubmit}
          customers={customers}
          consultants={consultants}
          consultationPackages={consultationPackages}
        />
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
                            setMode('Update')
                            setCurrentConsultation({
                              id: consultation.id,
                              customer: consultation.user_id,
                              email: consultation?.user?.email || '',
                              mobile: consultation?.user?.mobile || '',
                              consultant: consultation.consultant_id,
                              consultationPackage: consultation.consultation_purchase_id,
                              status: consultation.status,
                              mode: consultation.consultation_mode,
                              appointmentDate: new Date(consultation.consultation_time),
                              appointmentTime: new Date(consultation.consultation_time),
                              notes: consultation.notes,
                            });
                            setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete
                          onClick={() => {
                            setIsDelete(true);
                            setCurrentConsultation(consultation);
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

export default ListofConsultation;
