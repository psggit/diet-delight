import React, { useState, useEffect } from "react";
import axios from "../../../axiosInstance";

import { Snackbar } from "@material-ui/core";
import { Edit } from '@material-ui/icons';

import MuiAlert from "@material-ui/lab/Alert";

import CustomSkeleton from "../../../CustomSkeleton";
import TableHeader from '../../reusable/TableHeader';
import UserFormModal from './UserFormModal';

import Table from '../../reusable/Table';
import { GENDER_TYPE } from '../Constants';

import { Main } from "./UserElements";

const userInitialValue = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  primaryAddressLine1: '',
  primaryAddressLine2: '',
  secondaryAddressLine1: '',
  secondaryAddressLine2: '',
  role: '',
  age: '',
  gender: '',
  firebaseUid: '',
}

const ListofUser = () => {
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('first_name');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [loading, setLodaing] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(userInitialValue)
  const [mode, setMode] = useState('Add');
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);


  let current_date_Time = new Date();
  const csvReport = {
    data: users,
    filename: `List_of_users_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios.get('roles').then(res => setUserRoles((res?.data?.data || []).map(role => ({ id: role.id, name: role.name }))));
  }, [])

  useEffect(() => {
    handleShow();
  }, [order, rowsPerPage, page, search, sort]);

  const handleShow = () => {
    axios
      .get(`users?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setUsers(res.data.data);
        setShow(true);
        setLodaing(false);
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

  const getGender = (gender) => {
    switch (gender) {
      case 0:
        return GENDER_TYPE[0].name;
      case 1:
        return GENDER_TYPE[1].name;
      case 2:
        return GENDER_TYPE[2].name;
    }
  };

  const handleFormSubmit = (values) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      mobile: values.phoneNumber,
      primary_address_line1: values.primaryAddressLine1,
      primary_address_line2: values.primaryAddressLine2,
      secondary_address_line1: values.secondaryAddressLine1,
      secondary_address_line2: values.secondaryAddressLine2,
      email: values.email,
      age: values.age,
      gender: values.gender,
      roles: [values.role],
      firebase_uid: values.firebaseUid,
    }
    if (mode === 'Add') {
      axios.post(`users`, { ...data, password: values.password }).then(() => {
        setNotificationConf([true, 'success', 'User Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`users/${currentUser.id}`, data)
        .then(() => {
          setNotificationConf([true, 'success', 'User Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
    setShowForm(false);
  }

  const [showNotification, notificationType, notification] = notificationConf;

  return (
    <>
      {showForm && (
        <UserFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentUser(userInitialValue)
            }
          }}
          mode={mode}
          values={currentUser}
          onSubmit={handleFormSubmit}
          roleOptions={userRoles}
        />
      )}
      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main style={{ width: "100%" }}>
            <TableHeader
              title="List of All Users"
              csvReport={csvReport}
              addHandler={() => {
                setMode('Add');
                setShowForm(true);
              }}
              searchHandler={(value) => {
                setSearch(value);
              }}
              searchMessage="Search is applicable to only Name, Phone Number and Email"
            />
            {show && (
              <Table
                dataSource={{
                  columns: [
                    { id: 'first_name', label: 'Name', sort: true },
                    { id: 'email', label: 'Email', sort: true },
                    { id: 'email_verified_at', label: 'Email Verified At', sort: false },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'firebase_uid', label: 'Firebase UID', sort: false },
                    { id: 'mobile', label: 'Mobile No.', sort: true },
                    { id: 'primary_address', label: 'Primary Address', sort: false },
                    { id: 'secondary_address', label: 'Secondary Address', sort: false },
                    { id: 'questionnaire_status', label: 'Questionnaire Status', sort: false },
                    { id: 'age', label: 'Age', sort: true },
                    { id: 'gender', label: 'Gender', sort: false },
                    { id: 'bmi', label: 'BMI', sort: true },
                    { id: 'recommended_calories', label: 'Recommended Calories', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: users.map((user) => {
                    return [
                      `${user.first_name || ''} ${user.last_name || ''}`,
                      user.email,
                      user.email_verified_at,
                      user.status,
                      user.firebase_uid,
                      user.mobile,
                      `${user.primary_address_line1 || ''} ${user.primary_address_line2 || ''}`,
                      `${user.secondary_address_line1 || ''} ${user.secondary_address_line2 || ''}`,
                      user.questionnaire_status,
                      user.age,
                      getGender(user.gender),
                      user.bmi,
                      user.recommended_calories,
                      <Edit
                        onClick={() => {
                          setMode('Update')
                          setCurrentUser({
                            id: user.id,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            email: user.email,
                            phoneNumber: user.mobile || '',
                            primaryAddressLine1: user.primary_address_line1 || '',
                            primaryAddressLine2: user.primary_address_line2 || '',
                            secondaryAddressLine1: user.secondary_address_line1 || '',
                            secondaryAddressLine2: user.secondary_address_line2 || '',
                            age: user.age,
                            gender: user.gender,
                            role: (user.roles || []).length ? user.roles[0].id : '',
                            firebaseUid: user.firebase_uid,
                          });
                          setShowForm(true);
                        }}
                        style={{ margin: '0 6px', cursor: 'pointer' }}
                      />
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
                page={page - 1}
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

export default ListofUser;
