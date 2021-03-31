import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

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
  DialogTitle,
  DialogContent,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';

import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import { setMenu, selectMenu, resetMenu } from "../../../features/adminSlice";

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
} from "./QuestionElements";
import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

const validationSchema = Yup.object().shape({
  question: Yup.string().required().label("Question"),
  type: Yup.number().required().max(3).label("Type"),
  order: Yup.number().required().label("Order"),
});

const ListofMenu = () => {
  const dispatch = useDispatch();

  const [menus, setMenus] = useState([]);
  const menu = useSelector(selectMenu);
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

  let current_date_Time = new Date();
  const csvReport = {
    data: menus,
    filename: `List_of_menus_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`menus?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setMenus(res.data.data);
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
    setIsSuccess(false);
  };

  const handleUpdate = async (menu) => {
    await dispatch(
      setMenu({
        id: menu.id,
        name: menu.name,
        details: menu.details,
        picture: menu.picture,
        status: menu.status,
        order: menu.order,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (menu) => {
    await dispatch(resetMenu());
    await dispatch(
      setMenu({
        id: menu.id,
      })
    );
    await setIsDelete(true);
  };

  const CloseDelete = () => setIsDelete(false);
  const CloseUpdate = () => setISUpdate(false);

  const classes = useStyles();

  return (
    <>
      {isdelete && (
        <>
          {" "}
          <Dialog
            open={isdelete}
            onClose={CloseDelete}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
            <DialogContent>
              <Mini>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    axios
                      .delete(`menus/${menu.id}`)
                      .then((res) => {
                        setIsSuccess(true);
                        setIsDelete(false);
                        handleShow();
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "10px", background: "#800080" }}
                  color="primary"
                  onClick={CloseDelete}
                >
                  Close
                </Button>
              </Mini>
            </DialogContent>
          </Dialog>
        </>
      )}

      {isupdate && (
        <>
          {" "}
          <Dialog
            open={isupdate}
            onClose={CloseUpdate}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="form-dialog-title">Update Question</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  name: menu.name,
                  details: menu.details,
                  picture: menu.picture,
                  status: menu.status,
                  order: menu.order,
                }}
                onSubmit={(values) => {
                  console.log("meet");
                  axios
                    .put(`menus/${menu.id}`, {
                      name: values.name,
                      details: values.details,
                      picture: values.picture,
                      status: values.status,
                      order: values.order,
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      setISUpdate(false);
                      handleShow();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {({ handleSubmit, handleChange, errors, touched, values }) => (
                  <>
                    <Container>
                      <Mini>
                        <Title>Name :</Title>
                        <Input
                          value={values.name}
                          placeholder="Name"
                          onChange={handleChange("name")}
                        />
                      </Mini>
                      {errors.name && touched && (
                        <Info error>{errors.name}</Info>
                      )}

                      <Mini>
                        <Title>Details :</Title>
                        <Input
                          value={values.details}
                          placeholder="Details"
                          onChange={handleChange("details")}
                        />
                      </Mini>
                      {errors.details && touched && (
                        <Info error>{errors.details}</Info>
                      )}

                      <Mini>
                        <Title>Picture :</Title>
                        <Input
                          value={values.picture}
                          placeholder="Picture"
                          onChange={handleChange("picture")}
                        />
                      </Mini>
                      {errors.picture && touched && (
                        <Info error>{errors.picture}</Info>
                      )}
                      <Mini>
                        <Title>Status :</Title>
                        <Input
                          value={values.status}
                          placeholder="Status"
                          onChange={handleChange("status")}
                        />
                      </Mini>
                      {errors.status && touched && (
                        <Info error>{errors.status}</Info>
                      )}
                      <Mini>
                        <Title>Order :</Title>
                        <Input
                          value={values.order}
                          placeholder="Order"
                          onChange={handleChange("order")}
                        />
                      </Mini>
                      {errors.order && touched && (
                        <Info error>{errors.order}</Info>
                      )}
                      <Mini style={{ marginTop: "10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="contained"
                          style={{ margin: "10px", background: "#800080" }}
                          color="primary"
                          onClick={CloseUpdate}
                        >
                          Close
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
          <Main>
            <TableHeader
              title="List of Menus"
              csvReport={csvReport}
              addHandler={() => {
                // TODO: Handle add
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
                    { id: 'details', label: 'Details', sort: false },
                    { id: 'picture', label: 'Picture', sort: false },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: menus.map((menu) => {
                    return [
                      menu.name,
                      menu.details,
                      <a href={menu.picture} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      menu.status,
                      menu.order,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(menu);
                            // handleUpdate(menu);
                            // setShowForm(true);
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
              open={Issuccess}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                Success Message !
              </Alert>
            </Snackbar>
          </Main>
        </>
      )}
    </>
  );
};

export default ListofMenu;
