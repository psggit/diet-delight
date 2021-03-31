import React, { useState } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#303960",
  },
  textField: {
    width: "25rem",
    margin: theme.spacing(1),
  },
  submitBtn: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#303960",
    },
    secondary: {
      main: "#f44336",
    },
    overrides: {
      MuiPickersBasePicker: {
        pickerView: {
          backgroundColor: "black",
        },
      },
      MuiPickersDay: {
        day: {
          color: "light-gray",
          fontFamily: '"Do Hyeon", sans-serif',
          backgroundColor: "white",
          borderRadius: "0px",
        },
        container: {
          backgroundColor: "black",
        },
        daySelected: {
          backgroundColor: "",
          color: "light-gray",
        },
        dayDisabled: {
          color: "black",
        },
        current: {
          color: "",
        },
      },
    },
  },
});

const sendMail = async (values) => {
  const mailChimpUrl = "https://mandrillapp.com/api/1.0/messages/send";
  const dietDelightMailUrl =
    "https://dietdelight.enigmaty.com/api/v1/key-values?key=email";
  const dietDelightMailResponse = await axios.get(dietDelightMailUrl);
  const dietDelightMail = dietDelightMailResponse.data.value;

  console.log("Mail champ Key : ", process.env.REACT_APP_MAIL_CHIMP_KEY);
  console.log("Values: ", values);
  if(!process.env.REACT_APP_MAIL_CHIMP_KEY) return;

  const data = {
    key: process.env.REACT_APP_MAIL_CHIMP_KEY,
    message: {
      //   html: "<h1>This is a Test Mail.</h1>",
      text: values.message,
      subject: values.subject,
      from_email: values.email,
      from_name: "User",
      to: [dietDelightMail],
    },
    async: false,
    ip_pool: "",
    send_at: "",
  };
  const response = await axios.post(mailChimpUrl, { ...data });

  console.log("Response : MM : ", response);
};

const ContactUsForm = () => {
  const classes = useStyles();

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    subject: Yup.string().required().label("Subject"),
    message: Yup.string().required().label("Message"),
  });

  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Contact Us</h2>
      <ThemeProvider theme={theme}>
        <Formik
          className={classes.root}
          initialValues={{
            name: "",
            email: "",
            subject: "",
            message: "",
          }}
          validationSchema={ValidateSchema}
          onSubmit={(values) => {
            console.log("Values :", values);
            sendMail(values);
          }}
        >
          {({ handleChange, handleSubmit, errors, touched, values }) => (
            <>
              <TextField
                className={classes.textField}
                id="name"
                label="Name"
                variant="outlined"
                color="primary"
                required
                name="name"
                onChange={handleChange}
                value={values.name}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                className={classes.textField}
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={values.email}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                className={classes.textField}
                id="subject"
                label="Subject"
                variant="outlined"
                name="subject"
                required
                onChange={handleChange}
                value={values.subject}
                error={touched.subject && errors.subject}
                helperText={touched.subject && errors.subject}
              />
              <TextField
                className={classes.textField}
                id="message"
                required
                multiline
                rows={4}
                label="Message"
                variant="outlined"
                name="message"
                onChange={handleChange}
                value={values.message}
                error={touched.message && errors.message}
                helperText={touched.message && errors.message}
              />
              <div>
                <Button
                  className={classes.submitBtn}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </Formik>
      </ThemeProvider>
    </div>
  );
};

export default ContactUsForm;
