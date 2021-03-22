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
import {
  setCategory,
  selectCategory,
  resetCategory,
} from "../../../features/adminSlice";
import TableHeader from '../../reusable/TableHeader';
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
} from "./QuestionElements";
import { Formik } from "formik";
import * as Yup from "yup";
import { CSVLink } from "react-csv";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

const ListofCategory = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const category = useSelector(selectCategory);
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
    data: categories,
    filename: `List_of_categorys_${current_date_Time}.csv`,
  };

  useEffect(() => {
    // TODO: Remove after making change in API
      axios.get('menu-categories').then((res) => {
        setTotalCount(res?.data?.data?.length);
      })
    }, [])
  
    useEffect(() => {
      handleShow();
    }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`menu-categories?pageSize=${rowsPerPage}&page=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setCategories(res.data.data);
        setShow(true);
        setLoading(false);
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

  const handleUpdate = async (cate) => {
    await dispatch(
      setCategory({
        id: cate.id,
        menu_id: cate.menu_id,
        name: cate.name,
        parent: cate.parent,
        max_buy: cate.max_buy,
        order: cate.order,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (category) => {
    await dispatch(resetCategory());
    await dispatch(
      setCategory({
        id: category.id,
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
                      .delete(`menu-categories/${category.id}`)
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
                  menu_id: category.menu_id,
                  name: category.name,
                  parent: category.parent,
                  max_buy: category.max_buy,
                  order: category.order,
                }}
                onSubmit={(values) => {
                  console.log("meet");
                  axios
                    .put(`menu-categories/${category.id}`, {
                      menu_id: values.menu_id,
                      name: values.name,
                      parent: values.parent,
                      max_buy: values.max_buy,
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
                        <Title>Menu ID :</Title>
                        <Input
                          value={values.menu_id}
                          placeholder="Menu ID"
                          onChange={handleChange("menu_id")}
                        />
                      </Mini>
                      {errors.menu_id && touched && (
                        <Info error>{errors.menu_id}</Info>
                      )}

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
                        <Title>Parent :</Title>
                        <Input
                          value={values.parent}
                          placeholder="Parent"
                          onChange={handleChange("parent")}
                        />
                      </Mini>
                      {errors.parent && touched && (
                        <Info error>{errors.parent}</Info>
                      )}
                      <Mini>
                        <Title>Max Buy :</Title>
                        <Input
                          value={values.max_buy}
                          placeholder="Max Buy"
                          onChange={handleChange("max_buy")}
                        />
                      </Mini>
                      {errors.max_buy && touched && (
                        <Info error>{errors.max_buy}</Info>
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
              title="List of All Catregories"
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
                    { id: 'menu_id', label: 'Menu', sort: true },
                    { id: 'name', label: 'Name', sort: true },
                    { id: 'parent', label: 'Parent', sort: true },
                    { id: 'max_buy', label: 'Max Buy', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: categories.map((category) => {
                    return [
                      category.menu_id,
                      category.name,
                      category.parent,
                      category.max_buy,
                      category.order,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(q);
                            // handleUpdate(q);
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

export default ListofCategory;
