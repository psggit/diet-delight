import React, { useState, useEffect } from "react";
import axios from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setTemp, selectTemp, resetTemp } from "../../../features/adminSlice";

import {
  makeStyles,
  Table,
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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

import MuiAlert from "@material-ui/lab/Alert";

import CustomSkeleton from "../../../CustomSkeleton";

import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";

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

const ListofUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectTemp);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLodaing] = useState(true);

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
    }, []);
    // }, [order, page, search, sort]);

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
    setIsSuccess(false);
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
    const { classes,  order, orderBy, numSelected, rowCount, onRequestSort } = props;
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

  const classes = useStyles();

  return (
    <>
      {modal && (
        <>
          <Dialog
            open={modal}
            onClose={DialogClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="form-dialog-title">Update User</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
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
                  roles: user.roles[0].id,
                }}
                validationSchema={validateSchema}
                onSubmit={(values) => {
                  axios
                    .put(`users/${values.id}`, {
                      status: values.status,
                      email: values.email,
                      email_verified_at: values.email_verified_at,
                      first_name: values.first_name,
                      last_name: values.last_name,
                      firebase_uid: values.firebase_uid,
                      mobile: values.mobile,
                      primary_address_line1: values.primary_address_line1,
                      primary_address_line2: values.primary_address_line2,
                      secondary_address_line1: values.secondary_address_line1,
                      secondary_address_line2: values.secondary_address_line2,
                      questionnaire_status: values.questionnaire_status,
                      age: values.age,
                      gender: values.gender,
                      bmi: values.bmi,
                      recommended_calories: values.recommended_calories,
                      roles: [values.roles],
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      DialogClose();
                      handleShow();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>ID</Title>
                        <Input
                          style={{ cursor: "not-allowed" }}
                          disabled
                          value={values.id}
                          onChange={handleChange("id")}
                        ></Input>
                      </Mini>
                      <Mini>
                        <Title>Status</Title>
                        <Input
                          value={values.status}
                          onChange={handleChange("status")}
                        ></Input>
                      </Mini>
                      {errors.status && touched && (
                        <Info error>{errors.status}</Info>
                      )}
                      <Mini>
                        <Title>Email</Title>
                        <Input
                          value={values.email}
                          onChange={handleChange("email")}
                        ></Input>
                      </Mini>
                      {errors.email && touched && (
                        <Info error>{errors.email}</Info>
                      )}
                      <Mini>
                        <Title>Email Verified At</Title>
                        <Input
                          value={values.email_verified_at}
                          onChange={handleChange("email_verified_at")}
                        ></Input>
                      </Mini>
                      {errors.email_verified_at && touched && (
                        <Info error>{errors.email_verified_at}</Info>
                      )}

                      <Mini>
                        <Title>First Name</Title>
                        <Input
                          value={values.first_name}
                          onChange={handleChange("first_name")}
                        ></Input>
                      </Mini>
                      {errors.first_name && touched && (
                        <Info error>{errors.first_name}</Info>
                      )}
                      <Mini>
                        <Title>Last Name</Title>
                        <Input
                          value={values.last_name}
                          onChange={handleChange("last_name")}
                        ></Input>
                      </Mini>
                      {errors.last_name && touched && (
                        <Info error>{errors.last_name}</Info>
                      )}
                      <Mini>
                        <Title>Firebase Uid</Title>
                        <Input
                          value={values.firebase_uid}
                          onChange={handleChange("firebase_uid")}
                        ></Input>
                      </Mini>
                      {errors.firebase_uid && touched && (
                        <Info error>{errors.firebase_uid}</Info>
                      )}

                      <Mini>
                        <Title>Phone :</Title>
                        <Input
                          value={values.mobile}
                          onChange={handleChange("mobile")}
                        />
                      </Mini>
                      {errors.mobile && touched && (
                        <Info error>{errors.mobile}</Info>
                      )}
                      <Mini>
                        <Title>Primary Address Line1</Title>
                        <Input
                          value={values.primary_address_line1}
                          onChange={handleChange("primary_address_line1")}
                        ></Input>
                      </Mini>
                      {errors.primary_address_line1 && touched && (
                        <Info error>{errors.primary_address_line1}</Info>
                      )}
                      <Mini>
                        <Title>Primary Address Line2</Title>
                        <Input
                          value={values.primary_address_line2}
                          onChange={handleChange("primary_address_line2")}
                        ></Input>
                      </Mini>
                      {errors.primary_address_line2 && touched && (
                        <Info error>{errors.primary_address_line2}</Info>
                      )}
                      <Mini>
                        <Title>Secondary Address Line1</Title>
                        <Input
                          value={values.secondary_address_line1}
                          onChange={handleChange("secondary_address_line1")}
                        ></Input>
                      </Mini>
                      {errors.secondary_address_line1 && touched && (
                        <Info error>{errors.secondary_address_line1}</Info>
                      )}
                      <Mini>
                        <Title>Secondary Address Line2</Title>
                        <Input
                          value={values.secondary_address_line2}
                          onChange={handleChange("secondary_address_line2")}
                        ></Input>
                      </Mini>
                      {errors.secondary_address_line2 && touched && (
                        <Info error>{errors.secondary_address_line2}</Info>
                      )}
                      <Mini>
                        <Title>Questionnaire Status</Title>
                        <Input
                          value={values.questionnaire_status}
                          onChange={handleChange("questionnaire_status")}
                        ></Input>
                      </Mini>
                      {errors.questionnaire_status && touched && (
                        <Info error>{errors.questionnaire_status}</Info>
                      )}
                      <Mini>
                        <Title>Age</Title>
                        <Input
                          value={values.age}
                          onChange={handleChange("age")}
                        ></Input>
                      </Mini>
                      {errors.age && touched && <Info error>{errors.age}</Info>}
                      <Mini>
                        <Title>Gender</Title>
                        <Input
                          value={values.gender}
                          onChange={handleChange("gender")}
                        ></Input>
                      </Mini>
                      {errors.gender && touched && (
                        <Info error>{errors.gender}</Info>
                      )}
                      <Mini>
                        <Title>BMI</Title>
                        <Input
                          value={values.bmi}
                          onChange={handleChange("bmi")}
                        ></Input>
                      </Mini>
                      {errors.bmi && touched && <Info error>{errors.bmi}</Info>}
                      <Mini>
                        <Title>Recommended Calories</Title>
                        <Input
                          value={values.recommended_calories}
                          onChange={handleChange("recommended_calories")}
                        ></Input>
                      </Mini>
                      {errors.recommended_calories && touched && (
                        <Info error>{errors.recommended_calories}</Info>
                      )}
                      <Mini>
                        <Title>Roles :</Title>
                        <Select
                          defaultValue={values.roles}
                          onChange={handleChange("roles")}
                        >
                          <MenuItem value={1}>Customer</MenuItem>
                          <MenuItem value={2}>Admin</MenuItem>
                          <MenuItem value={3}>Consultant</MenuItem>
                          <MenuItem value={4}>Accountant</MenuItem>
                          <MenuItem value={5}>Kitchen</MenuItem>
                        </Select>
                      </Mini>
                      {errors.roles && touched && (
                        <Info error>{errors.roles}</Info>
                      )}
                      <Mini>
                        <Button
                          variant="contained"
                          style={{
                            margin: "10px",
                            padding: "5px",
                            background: "#800080",
                          }}
                          color="primary"
                          onClick={handleSubmit}
                        >
                          submit
                        </Button>
                        <Button
                          onClick={DialogClose}
                          variant="contained"
                          style={{
                            margin: "10px",
                            padding: "5px",
                            background: "#800080",
                          }}
                          color="primary"
                        >
                          Cancel
                        </Button>
                      </Mini>
                    </Container>
                  </>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      )}
      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main style={{width :"100%"}}>
            <h3
              style={{
                textAlign: "left",
                marginLeft: "50px",
                marginBottom: "20px",
              }}
            >
              List of Users
            </h3>
            <HContainer>
              {/* <Con>
                <Title>Data per Page</Title>
                <Input
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  placeholder="Page Size"
                ></Input>
              </Con> */}
              <Con>
                <Title>Search All</Title>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search all"
                ></Input>
              </Con>
              {/* <Con>
                <Title>Sort By</Title>
                <Input
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  placeholder="Sort by"
                ></Input>
              </Con>
              <Con>
                <Title>Sort Order</Title>
                <Input
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="asc or desc"
                ></Input>
              </Con> */}
              <Set>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  onClick={handleShow}
                  color="primary"
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  onClick={() => {
                    setUsers([]);
                    setShow(false);
                    setPage("");
                    setSearch("");
                    setSort("");
                    setOrder("");
                  }}
                  color="primary"
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                >
                  <CSVLink {...csvReport} style={{ color: "white" }}>
                    Export CSV
                  </CSVLink>
                </Button>
              </Set>
            </HContainer>
            {show && (
              <>
                <TableContainer component={Paper} className={classes.container}>
                  <Table stickyHeader className={classes.table} aria-label="simple table">
                    {/* <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Email Verified At</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Firebase Uid</TableCell>
                        <TableCell align="right">Mobile</TableCell>
                        <TableCell align="right">
                          Primary Address Line1
                        </TableCell>
                        <TableCell align="right">
                          Primary Address Line2
                        </TableCell>
                        <TableCell align="right">
                          Secondary Address Line1
                        </TableCell>
                        <TableCell align="right">
                          Secondary Address Line2
                        </TableCell>
                        <TableCell align="right">
                          Questionnaire Status
                        </TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">BMI</TableCell>
                        <TableCell align="right">
                          Recommended Calories
                        </TableCell>

                        <TableCell align="right">Update</TableCell>
                      </TableRow>
                    </TableHead> */}

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
            )}
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              message="Success"
              open={Issuccess}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                User Updated Successfully !
              </Alert>
            </Snackbar>
          </Main>
        </>
      )}
    </>
  );
};

export default ListofUser;
