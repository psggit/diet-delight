import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

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
  DialogContent,
  DialogTitle,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from "@material-ui/lab/Alert";

import { Formik } from "formik";
import Table from '../../reusable/Table';
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
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [Issuccess, setIsSuccess] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [isupdate, setISUpdate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('')

  let current_date_Time = new Date();
  const csvReport = {
    data: listOfBlogs,
    filename: `List_of_Blogs_${current_date_Time}.csv`,
  };

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`posts?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setListOfBlogs(res.data.data);
        setLoading(false);
        setShow(true);
        setTotalCount(res.data?.meta?.total || 0);
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
        id: bloglist.id
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

      {showForm && (
        <>
          {" "}
          <Dialog
            open={showForm}
            onClose={() => { setShowForm(false) }}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="form-dialog-title">Update Question</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  id: mode === 'update' ? listOfBlog.id : '',
                  title: mode === 'update' ? listOfBlog.title : '',
                  slug: mode === 'update' ? listOfBlog.slug : '',
                  content: mode === 'update' ? listOfBlog.content : '',
                  featured_image: mode === 'update' ? listOfBlog.featured_image : '',
                  published_at: mode === 'update' ? listOfBlog.published_at : '',
                  author_id: mode === 'update' ? listOfBlog.author_id : '',
                }}
                onSubmit={(values) => {
                  if (mode === 'update') {
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
                        setShowForm(false)
                        handleShow();
                      })
                      .catch((err) => console.log(err));
                  } else {
                    axios
                      .post(`posts`, {
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
                        setShowForm(false)
                        handleShow();
                      })
                      .catch((err) => console.log(err));
                  }
                }

                }
              >
                {({ handleChange, handleSubmit, errors, touched, values }) => (
                  <>
                    <Container>
                      {mode === 'add' ?
                        <>
                          <Mini>
                            <Title>ID</Title>
                            <Input
                              placeholder="ID"
                              value={values.id}
                              onChange={handleChange("id")}
                            ></Input>
                          </Mini>
                          {errors.id && touched && <Info error>{errors.id}</Info>}
                        </>
                        : null}
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
                      {mode === 'update' ?
                        <>
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
                        </> :
                        null}
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
                          onClick={() => { setShowForm(false) }}
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
                title="List of Blogs"
                csvReport={csvReport}
                addHandler={() => {
                  setShowForm(true)
                  setMode('add')
                }}
                searchHandler={(value) => {
                  setSearch(value);
                }}
              />
              {show && (
                <Table
                  dataSource={{
                    columns: [
                      { id: 'title', label: 'Title', sort: true },
                      { id: 'slug', label: 'Slug', sort: true },
                      { id: 'content', label: 'Content', sort: false },
                      { id: 'featured_image', label: 'Featured Image', sort: false },
                      { id: 'published_at', label: 'Published At', sort: true },
                      { id: 'author_id', label: 'Author', sort: true },
                      { id: 'actions', label: '', sort: false },
                    ],
                    rows: listOfBlogs.map((blog) => {
                      return [
                        blog.title,
                        blog.slug,
                        blog.content,
                        <a href={blog.featured_image} target="_blank" rel="noopener noreferrer">
                          link
                      </a>,
                        blog.published_at,
                        blog.author_id,
                        <>
                          <Edit
                            onClick={() => {
                              setMode('update')
                              handleUpdate(blog);
                              setShowForm(true);
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

export default ListofBlog;
