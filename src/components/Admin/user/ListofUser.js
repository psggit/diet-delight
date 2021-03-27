import React, { useState, useEffect } from "react";
import axios from "../../../axiosInstance";

import { Snackbar } from "@material-ui/core";
import { Edit } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

import MuiAlert from "@material-ui/lab/Alert";

import CustomSkeleton from "../../../CustomSkeleton";
import TableHeader from '../../reusable/TableHeader';
import UserFormModal from './UserFormModal';

import Table from '../../reusable/Table';
import { GENDER_TYPE, USER_TYPE } from '../Constants';
import { useHistory } from "react-router-dom";
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
  bmi: '',
  calories: '',
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
  const [roleId, setRoleId] = useState(-1);

  let history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const userType = searchParams.get('type') || USER_TYPE.CUSTOMER;
  const customerPage = searchParams.get('type') === 'customer';

  let current_date_Time = new Date();
  const csvReport = {
    data: users,
    filename: `List_of_users_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios.get('roles').then(res => setUserRoles((res?.data?.data || []).map(role => ({ id: role.id, name: role.name }))));
  }, [])

  useEffect(() => setRoleId(-1), [userType]);

  useEffect(() => {
    if (userRoles.length && roleId < 0) {
      for (const role of userRoles) {
        if (role.name.toLowerCase() === userType) {
          setRoleId(role.id);
        }
      }
    }
  }, [userRoles, roleId])

  useEffect(() => {
    handleShow();
  }, [order, rowsPerPage, page, search, sort, roleId]);

  const handleShow = () => {
    if (roleId >= 0) {
      let query = `users?role_id=${roleId}&pageSize=${rowsPerPage}&page=${page + 1}&sortBy=${sort}&sortOrder=${order}`;
      query = search ? `${query}&search=${search}` : query;

      axios.get(query).then((res) => {
        setUsers(res.data.data);
        setShow(true);
        setLodaing(false);
        setTotalCount(res.data?.meta?.total || 0);
      })
        .catch((err) => console.log(err));
    }
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
      roles: [values.role || 1],
      bmi: values.bmi || '',
      ...(values.calories && { recommended_calories: parseInt(values.calories, 10) }),
    }

    if (mode === 'Add') {
      axios.post(`users`, { ...data, password: values.password, firebase_uid: uuidv4() }).then(() => {
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
  const Header = {
    [USER_TYPE.CUSTOMER]: 'Customers',
    [USER_TYPE.ADMIN]: 'Admins',
    [USER_TYPE.ACCOUNTANT]: 'Accountants',
    [USER_TYPE.KITCHEN]: 'Kitchen',
  }

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
          showRoleField={!customerPage}
        />
      )}
      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main style={{ width: "100%" }}>
            <TableHeader
              title={`List of ${Header[userType] || 'Consultants'}`}
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
                  columns: customerPage ? [
                    { id: 'id', label: 'User Id', sort: false },
                    { id: 'first_name', label: 'Name', sort: true },
                    { id: 'mobile', label: 'Mobile No.', sort: true },
                    { id: 'email', label: 'Email', sort: true },
                    { id: 'primary_address', label: 'Primary Address', sort: false },
                    { id: 'secondary_address', label: 'Secondary Address', sort: false },
                    { id: 'email_verified_at', label: 'Email Verified At', sort: false },
                    { id: 'questionnaire_status', label: 'Questionnaire Status', sort: false },
                    { id: 'age', label: 'Age', sort: true },
                    { id: 'gender', label: 'Gender', sort: false },
                    { id: 'bmi', label: 'BMI', sort: true },
                    { id: 'recommended_calories', label: 'Recommended Calories', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ] : [
                    { id: 'first_name', label: 'Name', sort: true },
                    { id: 'email', label: 'Email', sort: true },
                    { id: 'role', label: 'Role', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: users.map((user) => {
                    const actionButton = (
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
                            bmi: user.bmi,
                            calories: user.recommended_calories,
                            role: (user.roles || []).length ? user.roles[0].id : '',
                          });
                          setShowForm(true);
                        }}
                        style={{ margin: '0 6px', cursor: 'pointer' }}
                      />
                    )

                    return customerPage ? [
                      user.id,
                      `${user.first_name || ''} ${user.last_name || ''}`,
                      user.mobile,
                      user.email,
                      `${user.primary_address_line1 || ''} ${user.primary_address_line2 || ''}`,
                      `${user.secondary_address_line1 || ''} ${user.secondary_address_line2 || ''}`,
                      user.email_verified_at,
                      user.questionnaire_status,
                      user.age,
                      getGender(user.gender),
                      user.bmi,
                      user.recommended_calories,
                      actionButton
                    ] : [
                      `${user.first_name || ''} ${user.last_name || ''}`,
                      user.email,
                      (user.roles || []).length ? user.roles[0].name : '',
                      actionButton
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

export default ListofUser;
