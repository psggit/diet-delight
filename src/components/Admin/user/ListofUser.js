import React, { useState, useEffect } from "react";
import axios from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setTemp, selectTemp, resetTemp } from "../../../features/adminSlice";

import {
  makeStyles,
  // Table,
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
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

import MuiAlert from "@material-ui/lab/Alert";

import CustomSkeleton from "../../../CustomSkeleton";
import TableHeader from '../../reusable/TableHeader';
import UserFormModal from './UserFormModal';

import { Formik } from "formik";
import * as Yup from "yup";
import Table from '../../reusable/Table';
import { GENDER_TYPE } from '../Constants';

import {
  Main,
  HContainer,
  Container,
  Con,
  Input,
  Title,
  Set,
  Mini,
  Info,
} from "./UserElements";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },

  table: {
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

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
  const dispatch = useDispatch();
  const user = useSelector(selectTemp);

  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('first_name');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLodaing] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(userInitialValue)
  const [mode, setMode] = useState('Add');
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);

  const [orderBy, setOrderBy] = React.useState('first_name');

  // const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let current_date_Time = new Date();
  const csvReport = {
    data: users,
    filename: `List_of_users_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios
      .get(
        `users?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.data);
        setShow(true);
        setLodaing(false);
      })
      .catch((err) => console.log(err));
    axios.get('roles').then(res => setUserRoles((res?.data?.data || []).map(role => ({ id: role.id, name: role.name }))));
  }, [order, page, search, sort]);

  const handleShow = () => {
    axios
      .get(
        `users?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.data);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (user) => {
    await dispatch(
      setTemp({
        id: user.id,
        status: user.status,
        email: user.email,
        email_verified_at: user.email_verified_at,
        first_name: user.first_name,
        last_name: user.last_name,
        firebase_uid: user.firebase_uid,
        mobile: user.mobile,
        primary_address_line1: user.primary_address_line1,
        primary_address_line2: user.primary_address_line2,
        secondary_address_line1: user.secondary_address_line1,
        secondary_address_line2: user.secondary_address_line2,
        questionnaire_status: user.questionnaire_status,
        age: user.age,
        gender: user.gender,
        bmi: user.bmi,
        recommended_calories: user.recommended_calories,
        roles: user.roles,
      })
    );
    await setModal(true);
  };

  const DialogClose = () => {
    setModal(false);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const validateSchema = Yup.object().shape({
    first_name: Yup.string().required().label("First Name"),
    last_name: Yup.string().required().label("Last Name"),
    mobile: Yup.number().required().label("Phone"),
    email: Yup.string().required().email().label("Email"),
    address: Yup.string().required().min(10).label("Address"),
    address_secondary: Yup.string().label("Sec Address"),
    roles: Yup.number().required().label("Roles"),
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationConf([false, 'success', '']);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'status', numeric: true, disablePadding: true, label: 'Status' },
    { id: 'email', numeric: true, disablePadding: true, label: 'Email' },
    { id: 'email_verified', numeric: true, disablePadding: true, label: 'Email Verified' },
    { id: 'first_name', numeric: true, disablePadding: true, label: 'First Name' },
    { id: 'last_name', numeric: true, disablePadding: true, label: 'Last Name' },
    { id: 'firebase_uid', numeric: true, disablePadding: true, label: 'Firebase UID' },
    { id: 'mobile', numeric: true, disablePadding: true, label: 'Mobile' },
    { id: 'primary_address_line1', numeric: true, disablePadding: true, label: 'Primary Address Line 1' },
    { id: 'primary_address_line2', numeric: true, disablePadding: true, label: 'Primary Address Line 2' },
    { id: 'secondary_address_line1', numeric: true, disablePadding: true, label: 'Secondary Address Line 1' },
    { id: 'secondary_address_line2', numeric: true, disablePadding: true, label: 'Secondary Address Line 2' },
    { id: 'questionnaire_status', numeric: true, disablePadding: true, label: 'Questionnaire Status' },
    { id: 'age', numeric: true, disablePadding: true, label: 'Age' },
    { id: 'gender', numeric: true, disablePadding: true, label: 'Gender' },
    { id: 'bmi', numeric: true, disablePadding: true, label: 'BMI' },
    { id: 'recommended_calories', numeric: true, disablePadding: true, label: 'Recommended Calories' },

  ];

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align="right">Update</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
        setNotificationConf([true, 'success', 'Question Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`users/${currentUser.id}`, data)
        .then(() => {
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
                      `${user.first_name} ${user.last_name}`,
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
              />
            )}
            {/* {show && (
              <>
                <TableContainer component={Paper} className={classes.container}>
                  <Table stickyHeader className={classes.table} aria-label="simple table">
                    <EnhancedTableHead
                      classes={classes}
                      // numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      // onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={users.length}
                    />
                    <TableBody>
                      {stableSort(users, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell component="th" scope="row">
                            {user.id}
                          </TableCell>
                          <TableCell align="right">{user.status}</TableCell>
                          <TableCell align="right">{user.email}</TableCell>
                          <TableCell align="right">
                            {user.email_verified_at}
                          </TableCell>
                          <TableCell align="right">{user.first_name}</TableCell>
                          <TableCell align="right">{user.last_name}</TableCell>
                          <TableCell align="right">
                            {user.firebase_uid}
                          </TableCell>
                          <TableCell align="right">{user.mobile}</TableCell>
                          <TableCell align="right">
                            {user.primary_address_line1}
                          </TableCell>
                          <TableCell align="right">
                            {user.primary_address_line2}
                          </TableCell>
                          <TableCell align="right">
                            {user.secondary_address_line1}
                          </TableCell>
                          <TableCell align="right">
                            {user.secondary_address_line2}
                          </TableCell>
                          <TableCell align="right">
                            {user.questionnaire_status}
                          </TableCell>
                          <TableCell align="right">{user.age}</TableCell>
                          <TableCell align="right">{user.gender}</TableCell>
                          <TableCell align="right">{user.bmi}</TableCell>
                          <TableCell align="right">
                            {user.recommended_calories}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(user)}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </>
            )} */}
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
