import React, { useState, useEffect } from "react";
import CustomSkeleton from "../../../CustomSkeleton";
import axios from "../../../axiosInstance";

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
  DialogTitle,
  DialogContent,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import {
  setMenuItem,
  selectMenuItem,
  resetMenuItem,
} from "../../../features/adminSlice";

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
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
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
    axios
      .get(
        `menu-items?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setMenuItems(res.data.data);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `menu-items?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setMenuItems(res.data.data);
        setShow(true);
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
                // TODO: Handle search
              }}
            />
            {show && (
              <>
                <TableContainer style={{ margin: "10px 0" }} component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Menu ID</TableCell>
                        <TableCell>Menu Category ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Picture</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Day</TableCell>
                        <TableCell>Featured</TableCell>
                        <TableCell>Veg</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menuitems.map((menuitem) => (
                        <TableRow key={menuitem.id}>
                          <TableCell component="th" scope="row">
                            {menuitem.id}
                          </TableCell>
                          <TableCell>{menuitem.menu_id}</TableCell>
                          <TableCell>{menuitem.menu_category_id}</TableCell>
                          <TableCell>{menuitem.name}</TableCell>
                          <TableCell>{menuitem.picture}</TableCell>
                          <TableCell>{menuitem.date}</TableCell>
                          <TableCell>{menuitem.day}</TableCell>
                          <TableCell>{menuitem.featured}</TableCell>
                          <TableCell>{menuitem.veg}</TableCell>
                          <TableCell>{menuitem.order}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(menuitem)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(menuitem)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
