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
  setMenuItem,
  selectMenuItem,
  resetMenuItem,
} from "../../../features/adminSlice";
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
import TableHeader from '../../reusable/TableHeader';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

const ListofMenuItem = () => {
  const dispatch = useDispatch();

  const [menuitems, setMenuItems] = useState([]);
  const menuitem = useSelector(selectMenuItem);
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
    data: menuitems,
    filename: `List_of_menuitems_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`menu-items?pageSize=${rowsPerPage}&page=${page+1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setMenuItems(res.data.data);
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

  const handleUpdate = async (menuitem) => {
    await dispatch(
      setMenuItem({
        id: menuitem.id,
        menu_id: menuitem.menu_id,
        menu_category_id: menuitem.menu_category_id,
        name: menuitem.name,
        picture: menuitem.picture,
        date: menuitem.date,
        day: menuitem.day,
        featured: menuitem.featured,
        veg: menuitem.veg,
        order: menuitem.order,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (menuitem) => {
    await dispatch(resetMenuItem());
    await dispatch(
      setMenuItem({
        id: menuitem.id,
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
                      .delete(`menu-items/${menuitem.id}`)
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
                  menu_id: menuitem.menu_id,
                  menu_category_id: menuitem.menu_category_id,
                  name: menuitem.name,
                  picture: menuitem.picture,
                  date: menuitem.date,
                  day: menuitem.day,
                  featured: menuitem.featured,
                  veg: menuitem.veg,
                  order: menuitem.order,
                }}
                onSubmit={(values) => {
                  axios
                    .put(`menu-items/${menuitem.id}`, {
                      id: values.id,
                      menu_id: values.menu_id,
                      menu_category_id: values.menu_category_id,
                      name: values.name,
                      picture: values.picture,
                      date: values.date,
                      day: values.day,
                      featured: values.featured,
                      veg: values.veg,
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
                        <Title>Menu Category ID :</Title>
                        <Input
                          value={values.menu_category_id}
                          placeholder="Menu Category ID"
                          onChange={handleChange("menu_category_id")}
                        />
                      </Mini>
                      {errors.menu_category_id && touched && (
                        <Info error>{errors.menu_category_id}</Info>
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
                        <Title>Date :</Title>
                        <Input
                          value={values.date}
                          placeholder="Date"
                          onChange={handleChange("date")}
                        />
                      </Mini>
                      {errors.date && touched && (
                        <Info error>{errors.date}</Info>
                      )}
                      <Mini>
                        <Title>Day :</Title>
                        <Input
                          value={values.day}
                          placeholder="Day"
                          onChange={handleChange("day")}
                        />
                      </Mini>
                      {errors.day && touched && <Info error>{errors.day}</Info>}
                      <Mini>
                        <Title>Featured :</Title>
                        <Input
                          value={values.featured}
                          placeholder="Featured"
                          onChange={handleChange("featured")}
                        />
                      </Mini>
                      {errors.featured && touched && (
                        <Info error>{errors.featured}</Info>
                      )}
                      <Mini>
                        <Title>Veg :</Title>
                        <Input
                          value={values.veg}
                          placeholder="Veg"
                          onChange={handleChange("veg")}
                        />
                      </Mini>
                      {errors.veg && touched && <Info error>{errors.veg}</Info>}
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
              title="List of All Menu Items"
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
                    { id: 'menu_id', label: 'Menu ID', sort: true },
                    { id: 'menu_category_id', label: 'Menu Category', sort: true },
                    { id: 'picture', label: 'Picture', sort: false },
                    { id: 'date', label: 'Date', sort: true },
                    { id: 'day', label: 'Day', sort: true },
                    { id: 'featured', label: 'Featured', sort: true },
                    { id: 'veg', label: 'Veg', sort: false },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: menuitems.map((item) => {
                    return [
                      item.name,
                      item.menu_id,
                      item.menu_category_id,
                      <a href={item.picture} target="_blank" rel="noopener noreferrer">
                        link
                      </a>,
                      item.date,
                      item.day,
                      item.featured,
                      item.veg,
                      item.order,
                      <>
                        <Edit
                          onClick={() => {
                            // setMode('Update')
                            // setCurrentQuestion(item);
                            // handleUpdate(item);
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

export default ListofMenuItem;
