import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";
import { Snackbar, Tooltip } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";
import Modal from '../../reusable/Modal';
import { Main } from "./ConsultantElements";
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import { Edit, Delete, CheckCircleOutline } from '@material-ui/icons';
import ConsultationFormModal from './ConsultationFormModal';
import { CONSULTATION_MODE, CONSULTATION_STATUS_TYPE } from '../Constants';

const consultationInitialValues = {
  id: '',
  customer: '',
  name: '',
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
  const [isdelete, setIsDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [consultationPackages, setConsultationPackages] = useState([]);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [consultationStatus, setConsultationStatus] = useState(-1);

  let history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const status = searchParams.get('type') || CONSULTATION_STATUS_TYPE.BOOKED;

  let current_date_Time = new Date()
  const csvReport = {
    data: consultations,
    filename: `List_of_consultations_${current_date_Time}.csv`,
  }

  useEffect(() => {
    axios.get(`users`).then((res) => {
      setCustomers((res?.data?.data || []).map((user) => {
        return {
          id: user.id,
          name: user.id,
          displayName: `${user.first_name || ''} ${user.last_name || ''}`,
          email: user.email,
          mobile: user.mobile,
        }
      }));
    });
    axios.get(`consultants`).then((res) => {
      setConsultants(
        (res?.data?.data || []).map((user) => {
          return {
            id: user.id,
            name: user.name,
          }
        }),
      )
    })
    axios.get(`consultation-packages`).then((res) => {
      setConsultationPackages(
        (res?.data?.data || []).map((user) => {
          return {
            id: user.id,
            name: user.name,
          }
        }),
      )
    })
  }, [])

  useEffect(() => {
    switch (status) {
      case CONSULTATION_STATUS_TYPE.BOOKED:
        setConsultationStatus(0);
        break;
      case CONSULTATION_STATUS_TYPE.CANCELLED:
        setConsultationStatus(1);
        break;
      case CONSULTATION_STATUS_TYPE.COMPLETED:
        setConsultationStatus(2);
        break;
    }
  }, [status]);

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order, consultationStatus]);

  const handleShow = () => {
    if (consultationStatus >= 0) {
      axios
        .get(`consultations?pageSize=${rowsPerPage}&status=${consultationStatus}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
        .then((res) => {
          setConsultations(res.data.data);
          setLoading(false);
          setShow(true);
          setTotalCount(res.data?.meta?.total || 0);
        })
        .catch((err) => console.log(err));
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotificationConf([false, 'success', '']);
  };

  const getConsultationMode = (mode) => {
    switch (mode) {
      case 0:
        return CONSULTATION_MODE[0].name;
      case 1:
        return CONSULTATION_MODE[1].name;
    }
  }

  const handleFormSubmit = (values) => {
    const { appointmentTime, appointmentDate } = values
    let date = ''
    if (appointmentTime && appointmentDate) {
      date = `${appointmentDate.getFullYear()}-${appointmentDate.getMonth() + 1}-${appointmentDate.getDate()} ${appointmentTime.getHours()}:${appointmentTime.getMinutes()}:${appointmentTime.getSeconds()}`
    }

    const selectedConsultant = consultants.find(
      (c) => c.id === values.consultant,
    )

    const data = {
      user_id: values.customer,
      consultation_purchase_id: values.consultationPackage,
      consultant_id: selectedConsultant.id,
      consultant_name: selectedConsultant.name,
      status: values.status,
      ...(date && { consultation_time: date }),
      consultation_mode: values.mode,
      notes: values.notes || '',
    }

    if (mode === 'Add') {
      axios
        .post(`consultations`, data)
        .then((res) => {
          setNotificationConf([
            true,
            'success',
            'Consultation Added Successfully !',
          ])
          handleShow()
        })
        .catch(() =>
          setNotificationConf([
            true,
            'error',
            'Something went wrong. Please try again later!',
          ]),
        )
    } else {
      axios
        .put(`consultations/${currentConsultation.id}`, data)
        .then((res) => {
          setNotificationConf([
            true,
            'success',
            'Consultation Updated Successfully !',
          ])
          handleShow()
        })
        .catch(() =>
          setNotificationConf([
            true,
            'error',
            'Something went wrong. Please try again later!',
          ]),
        )
    }
    setShowForm(false)
  }

  const [showNotification, notificationType, notification] = notificationConf;
  const nameMap = {
    [CONSULTATION_STATUS_TYPE.BOOKED]: 'Booked',
    [CONSULTATION_STATUS_TYPE.CANCELLED]: 'Cancelled',
    [CONSULTATION_STATUS_TYPE.COMPLETED]: 'Completed',
  }

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
              setIsDelete(false)
              axios
                .delete(`consultations/${currentConsultation.id}`)
                .then(() => {
                  setNotificationConf([
                    true,
                    'success',
                    'Consultation Deleted Successfully !',
                  ])
                  handleShow()
                })
                .catch(() =>
                  setNotificationConf([
                    true,
                    'error',
                    'Something went wrong. Please try again later!',
                  ]),
                )
            },
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
              title={`List of ${nameMap[status]} Consultations`}
              csvReport={csvReport}
              addHandler={() => {
                setMode('Add')
                setShowForm(true)
              }}
              searchHandler={(value) => {
                setSearch(value)
              }}
            />
            {show && (
              <Table
                dataSource={{
                  columns: [
                    { id: 'user_id', label: 'User Id', sort: false },
                    {
                      id: 'user_id',
                      label: 'Customer Name',
                      sort: true,
                    },
                    {
                      id: 'customer_phone',
                      label: 'Customer Phone',
                      sort: false,
                    },
                    {
                      id: 'customer_email',
                      label: 'Customer Email',
                      sort: false,
                    },
                    {
                      id: 'consultation_package',
                      label: 'Consultation Package',
                      sort: true,
                    },
                    {
                      id: 'consultation_time',
                      label: 'Consultation Time',
                      sort: false,
                    },
                    {
                      id: 'consultation_mode',
                      label: 'Consultation Mode',
                      sort: false,
                    },
                    {
                      id: 'consultant_name',
                      label: 'Consultant Name',
                      sort: true,
                    },
                    { id: 'notes', label: 'Notes', sort: false },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: consultations.map((consultation) => {
                    return [
                      consultation.user_id,
                      `${consultation?.user?.first_name || ''} ${
                        consultation?.user?.last_name || ''
                      }`,
                      consultation.user?.mobile || '',
                      consultation.user?.email || '',
                      consultation.consultation_purchase
                        ?.consultation_package_name || '',
                      consultation.consultation_time,
                      consultation.consultation_mode,
                      consultation.consultant_name,
                      consultation.consultation_time,
                      getConsultationMode(consultation.consultation_mode),
                      consultation.notes,
                      <div style={{ minWidth: 112 }}>
                        {status === CONSULTATION_STATUS_TYPE.BOOKED && (
                          <Tooltip title="Mark as Complete">
                            <CheckCircleOutline style={{ margin: '0 6px', cursor: 'pointer' }} onClick={() => {
                              axios.put(`consultations/${consultation.id}`, { status: 2 }).then(() => {
                                handleShow();
                                setNotificationConf([true, 'success', 'Consultation Marked as Complete !'])
                              }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
                            }} />
                          </Tooltip>
                        )}
                        <Tooltip title="Edit">
                          <Edit
                            onClick={() => {
                              setMode('Update')
                              setCurrentConsultation({
                                id: consultation.id,
                                customer: consultation.user_id,
                                name: `${consultation?.user?.first_name || ''} ${consultation?.user?.last_name || ''}`,
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
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Delete
                            onClick={() => {
                              setIsDelete(true);
                              setCurrentConsultation(consultation);
                            }} style={{ margin: '0 6px', cursor: 'pointer' }} />
                        </Tooltip>
                      </div>
                    ]
                  }),
                }}
                order={order}
                orderBy={sort}
                onSortClick={(key) => {
                  setOrder(order === 'asc' ? 'desc' : 'asc')
                  setSort(key)
                }}
                pagination
                page={page}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                onChangePage={(_, newPage) => {
                  setPage(newPage)
                }}
                onChangeRowsPerPage={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10))
                  setPage(0)
                }}
              />
            )}
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
  )
}

export default ListofConsultation
