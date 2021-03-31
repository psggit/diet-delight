import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { useSelector } from "react-redux";
import { selectConsultationPackage } from "../../../features/adminSlice";

import { Main } from "./QuestionElements";
import Table from '../../reusable/Table';
import { Edit, Delete } from '@material-ui/icons';
import TableHeader from '../../reusable/TableHeader';
import ConsultantPackageFormModal from './ConsultantPackageFormModal';
import Modal from '../../reusable/Modal';

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
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);
  const [mode, setMode] = useState('Add');
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentPackage, setCurrentPackage] = useState(initialValue);

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
              title="List of All Consultation Packages"
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
                      cPackage.status,
                      cPackage.duration,
                      cPackage.order,
                      cPackage.subtitle,
                      cPackage.details,
                      <a href={cPackage.picture} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      cPackage.price,
                      cPackage.sale_price,
                      <>
                        <Edit
                          onClick={() => {
                            setMode('Update')
                            setCurrentPackage({...cPackage, salePrice: cPackage.sale_price});
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
          </Main>
        </>
      )}
    </>
  );
};
export default ListConsultationPackage;
