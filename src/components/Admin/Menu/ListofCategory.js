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
  setCategory,
  selectCategory,
  resetCategory,
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

  const [categorys, setCategorys] = useState([]);
  const category = useSelector(selectCategory);
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
    data: categorys,
    filename: `List_of_categorys_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios
      .get(
        `menu-categories?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "useeffect from list category");
        setCategorys(res.data.data);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `menu-categories?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCategorys(res.data.data);
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
            <h3
              style={{
                textAlign: "left",
                marginLeft: "50px",
                marginBottom: "20px",
              }}
            >
              List of Category
            </h3>
            <HContainer>
              <Con>
                <Title>Data per Page</Title>
                <Input
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  placeholder="Page Size"
                ></Input>
              </Con>
              <Con>
                <Title>Search All</Title>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search all"
                ></Input>
              </Con>
              <Con>
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
              </Con>
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
                    setCategory([]);
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
                <TableContainer style={{ margin: "10px 0" }} component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Menu ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Parent</TableCell>
                        <TableCell>Max Buy</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categorys.map((cate) => (
                        <TableRow key={cate.id}>
                          <TableCell component="th" scope="row">
                            {cate.id}
                          </TableCell>
                          <TableCell>{cate.menu_id}</TableCell>
                          <TableCell>{cate.name}</TableCell>
                          <TableCell>{cate.parent}</TableCell>
                          <TableCell>{cate.max_buy}</TableCell>
                          <TableCell>{cate.order}</TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(cate)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(cate)}
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

export default ListofCategory;
