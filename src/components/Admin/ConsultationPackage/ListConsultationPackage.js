import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

import { Snackbar, makeStyles, Icon } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { Main } from "./QuestionElements";
import Table from '../../reusable/Table';
import { Edit, Delete } from '@material-ui/icons';
import TableHeader from '../../reusable/TableHeader';
import ConsultantPackageFormModal from './ConsultantPackageFormModal';
import Modal from '../../reusable/Modal';
import { CONSULTATION_PACKAGE_STATUS } from '../Constants';

const initialValue = {
  id: '',
  name: '',
  duration: '',
  order: '',
  status: '',
  subtitle: '',
  details: '',
  price: '',
  salePrice: '',
}

const useStyles = makeStyles(() => ({
  hoverStyle: {
    cursor: 'pointer',
    color: "#b8b7ad",
    '&:hover': {
      color: 'blue',
    }
  },
}));

const ListConsultationPackage = () => {
  const [consultantPackages, setConsultationPackages] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isdelete, setIsDelete] = useState(false);
  const [mode, setMode] = useState('Add');
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentPackage, setCurrentPackage] = useState(initialValue);
  const [imgconfig, setImageConfig] = useState([false, ''])

  const classes = useStyles();

  let current_date_Time = new Date();
  const csvReport = {
    data: consultantPackages,
    filename: `List_of_consultantPackages_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`consultation-packages?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setConsultationPackages(res.data.data);
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

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return CONSULTATION_PACKAGE_STATUS[0].name;
      case 1:
        return CONSULTATION_PACKAGE_STATUS[1].name;
    }
  }

  const handleFormSubmit = (values) => {
    const data = {
      name: values.name,
      status: values.status,
      duration: parseInt(values.duration, 10),
      order: parseInt(values.order, 10),
      subtitle: values.subtitle,
      details: values.details,
      price: values.price,
      sale_price: values.salePrice,
      ...(values.picture ? { picture: values.picture } : {}),
    };
    if (mode === 'Add') {
      axios.post(`consultation-packages`, data).then((res) => {
        setNotificationConf([true, 'success', 'Consultation Package Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`consultation-packages/${currentPackage.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Consultation Package Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
    setShowForm(false);
  }

  const [showNotification, notificationType, notification] = notificationConf;
  const [showImageModal, image] = imgconfig;

  return (
    <>
      {isdelete && (
        <Modal
          visible={isdelete}
          onClose={() => setIsDelete(false)}
          title="Delete Consultation Package"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`consultation-packages/${currentPackage.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Consultation Package Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}

      {showForm && (
        <ConsultantPackageFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentPackage(initialValue)
            }
          }}
          mode={mode}
          values={currentPackage}
          onSubmit={handleFormSubmit}
        />
      )}

      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main>
            <TableHeader
              title="List of Consultation Packages"
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
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'duration', label: 'Duration', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'subtitle', label: 'Sub Title', sort: true },
                    { id: 'details', label: 'Details', sort: false },
                    { id: 'picture', label: 'Picture', sort: false },
                    { id: 'price', label: 'Price', sort: true },
                    { id: 'sale_price', label: 'Sale Price', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: consultantPackages.map((cPackage) => {
                    return [
                      cPackage.name,
                      getStatus(cPackage.status),
                      cPackage.duration,
                      cPackage.order,
                      cPackage.subtitle,
                      cPackage.details,
                      <Icon className={classes.hoverStyle} onClick={() => cPackage.picture && setImageConfig([true, cPackage.picture])}>
                        open_in_new
                        </Icon>,
                      cPackage.price,
                      cPackage.sale_price,
                      <>
                        <Edit
                          onClick={() => {
                            setMode('Update')
                            setCurrentPackage({ ...cPackage, salePrice: cPackage.sale_price, details: cPackage.details || '' });
                            setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete onClick={() => {
                          setIsDelete(true)
                          setCurrentPackage(cPackage);
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
            {showImageModal && (
              <Modal visible={showImageModal} onClose={() => setImageConfig([false, ''])}><img src={image} style={{ width: '100%' }} /></Modal>
            )}
          </Main>
        </>
      )}
    </>
  );
};
export default ListConsultationPackage;
