import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

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
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { Formik } from "formik";
import { CSVLink } from "react-csv";
// import * as Yup from 'yup'

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
} from "./ConsultantElements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListOfBlog,
  resetListOfBlog,
  setListOfBlog,
} from "../../../features/adminSlice";
import TableHeader from '../../reusable/TableHeader';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 650,
  },
});

const ListofBlog = () => {
  const dispatch = useDispatch();
  const listOfBlog = useSelector(selectListOfBlog);

  const [listOfBlogs, setListOfBlogs] = useState([]);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfBlogs,
    filename: `List_of_Blogs_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios
      .get(
        `posts?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfBlogs(res.data.data);
        setLoading(false);
        setShow(true);
      });
  }, [page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(
        `posts?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setListOfBlogs(res.data.data);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSuccess(false);
  };

  const handleUpdate = async (bloglist) => {
    console.log(bloglist);
    await dispatch(
      setListOfBlog({
        title: bloglist.title,
        slug: bloglist.slug,
        content: bloglist.content,
        featured_image: bloglist.featured_image,
        published_at: bloglist.published_at,
        author_id: bloglist.author_id,
      })
    );

    await setISUpdate(true);
  };

  const handleDelete = async (bloglist) => {
    await dispatch(resetListOfBlog());
    await dispatch(
      setListOfBlog({
        id: bloglist.id,
      })
    );
    await setIsDelete(true);
  };

  const CloseDelete = () => setIsDelete(false);
  const CloseUpdate = () => setISUpdate(false);

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
                      .delete(`posts/${listOfBlog.id}`)
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
                  title: listOfBlog.title,
                  slug: listOfBlog.slug,
                  content: listOfBlog.content,
                  featured_image: listOfBlog.featured_image,
                  published_at: listOfBlog.published_at,
                  author_id: listOfBlog.author_id,
                }}
                onSubmit={(values) => {
                  axios
                    .put(`posts/${listOfBlog.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      title: values.title,
                      slug: values.slug,
                      content: values.content,
                      featured_image: values.featured_image,
                      published_at: values.published_at,
                      author_id: values.author_id,
                    })
                    .then((res) => {
                      setIsSuccess(true);
                      setISUpdate(false);
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
                          placeholder="ID"
                          value={values.id}
                          onChange={handleChange("id")}
                        ></Input>
                      </Mini>
                      {errors.id && touched && <Info error>{errors.id}</Info>}
                      <Mini>
                        <Title>Title</Title>
                        <Input
                          placeholder="Title"
                          value={values.title}
                          onChange={handleChange("title")}
                        ></Input>
                      </Mini>
                      {errors.title && touched && (
                        <Info error>{errors.title}</Info>
                      )}
                      <Mini>
                        <Title>Slug</Title>
                        <Input
                          placeholder="Slug"
                          value={values.slug}
                          onChange={handleChange("slug")}
                        ></Input>
                      </Mini>
                      {errors.slug && touched && (
                        <Info error>{errors.slug}</Info>
                      )}
                      <Mini>
                        <Title>Content</Title>
                        <Input
                          placeholder="Content"
                          value={values.content}
                          onChange={handleChange("content")}
                        />
                      </Mini>
                      {errors.content && touched && (
                        <Info error>{errors.content}</Info>
                      )}
                      <Mini>
                        <Title>Featured Image</Title>
                        <Input
                          placeholder="Featured Image"
                          value={values.featured_image}
                          onChange={handleChange("featured_image")}
                        />
                      </Mini>
                      {errors.featured_image && touched && (
                        <Info error>{errors.featured_image}</Info>
                      )}
                      <Mini>
                        <Title>Published At</Title>
                        <Input
                          placeholder="Published At"
                          value={values.published_at}
                          onChange={handleChange("published_at")}
                        />
                      </Mini>
                      {errors.published_at && touched && (
                        <Info error>{errors.published_at}</Info>
                      )}
                      <Mini>
                        <Title>Author ID</Title>
                        <Input
                          placeholder="Author ID"
                          value={values.author_id}
                          onChange={handleChange("author_id")}
                        />
                      </Mini>
                      {errors.author_id && touched && (
                        <Info error>{errors.author_id}</Info>
                      )}

                      <Mini>
                        <Button
                          variant="contained"
                          style={{
                            margin: "20px",
                            padding: "5px",
                            background: "#800080",
                          }}
                          color="primary"
                          onClick={handleSubmit}
                        >
                          submit
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            margin: "20px",
                            padding: "5px",
                            background: "#800080",
                          }}
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
              title="List of All Blogs"
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
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Slug</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Featured Image</TableCell>
                        <TableCell>Published At</TableCell>
                        <TableCell>Author ID</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfBlogs.map((bloglist) => (
                        <TableRow key={bloglist.id}>
                          <TableCell component="th" scope="row">
                            {bloglist.id}
                          </TableCell>
                          <TableCell>{bloglist.title}</TableCell>
                          <TableCell>{bloglist.slug}</TableCell>
                          <TableCell>{bloglist.content}</TableCell>
                          <TableCell>{bloglist.featured_image}</TableCell>
                          <TableCell>{bloglist.published_at}</TableCell>
                          <TableCell>{bloglist.author_id}</TableCell>

                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUpdate(bloglist)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(bloglist)}
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

export default ListofBlog;
