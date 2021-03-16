import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
import { Button, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'

import "./addForm.css";

const PostBlog = () => {

    const [Issuccess, setIsSuccess] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { 
            return;
        }

        setIsSuccess(false);
    };



    return (
        <>
            <Main className="addMain">
            <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add Blog</h3>
                <Formik
                    initialValues={{
                        title:'',
                        slug:'',
                        content:'',
                        featured_image:'',
                        published_at:'',
                        author_id:'',
         
                      
                    }}
                 
                    onSubmit={(values) => {
                        axios.post(`posts`, {
                          
                            title :values.title,
                            slug:values.slug,
                            content:values.content,
                            featured_image:values.featured_image,
                            published_at:values.published_at,
                            author_id:values.author_id,
                               
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container className="addContainer">
                                <Mini>
                                        <Title>
                                        Title
                                            </Title>
                                        <Input
                                            placeholder="Title"
                                            value={values.title}
                                            onChange={handleChange("title")}>
                                        </Input>
                                    </Mini>
                                    {errors.title && touched && (
                                        <Info error>{errors.title}</Info>
                                    )}
                                    <Mini>
                                        <Title>
                                        Slug
                                            </Title>
                                        <Input
                                            placeholder="Slug"
                                            value={values.slug}
                                            onChange={handleChange("slug")}>
                                        </Input>
                                    </Mini>
                                    {errors.slug && touched && (
                                        <Info error>{errors.slug}</Info>
                                    )}
                                    <Mini>
                                        <Title>Content</Title>
                                        <Input
                                            placeholder="Content"
                                            value={values.content}
                                            onChange={handleChange("content")} />
                                    </Mini>
                                    {errors.content && touched && (
                                        <Info error>{errors.content}</Info>
                                    )}
                                     <Mini>
                                        <Title>Featured Image</Title>
                                        <Input
                                            placeholder="Featured Image"
                                            value={values.featured_image}
                                            onChange={handleChange("featured_image")} />
                                    </Mini>
                                    {errors.featured_image && touched && (
                                        <Info error>{errors.featured_image}</Info>
                                    )}
                                      <Mini>
                                        <Title>Published At</Title>
                                        <Input
                                            placeholder="Published At"
                                            value={values.published_at}
                                            onChange={handleChange("published_at")} />
                                    </Mini>
                                    {errors.published_at && touched && (
                                        <Info error>{errors.published_at}</Info>
                                    )}
                                       <Mini>
                                        <Title>Author ID</Title>
                                        <Input
                                            placeholder="Author ID"
                                            value={values.author_id}
                                            onChange={handleChange("author_id")} />
                                    </Mini>
                                    {errors.author_id && touched && (
                                        <Info error>{errors.author_id}</Info>
                                    )}

                                <Button
                                    variant="contained"
                                    style={{ margin: "25px 5px", padding: "5px 25px", background: "#800080" }}
                                    color="primary"
                                    onClick={handleSubmit}
                                >submit</Button>
                            </Container>
                        </> 
                    )}

                </Formik>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                    message="Success"
                    open={Issuccess}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Blog Addded Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default PostBlog
