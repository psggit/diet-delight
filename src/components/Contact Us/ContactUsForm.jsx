import React, { useState } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
  },
});

const sendMail = async (formData) => {
  if (!formData) return;

  const mailChimpUrl = "https://mandrillapp.com/api/1.0/messages/send";
  const dietDelightMailUrl =
    "https://dietdelight.enigmaty.com/api/v1/key-values?key=email";
  const dietDelightMailResponse = await axios.get(dietDelightMailUrl);
  const dietDelightMail = dietDelightMailResponse.data.value;

  const data = {
    key: process.env.REACT_APP_MAIL_CHIMP_KEY,
    message: {
      //   html: "<h1>This is a Test Mail.</h1>",
      text: formData.message,
      subject: formData.subject,
      from_email: formData.email,
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

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    console.log("Value : ", formValue);

    sendMail(formValue);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  console.log("Mail champ Key : ", process.env.REACT_APP_MAIL_CHIMP_KEY);

  return (
    <form className={classes.root} autoComplete="off">
      <h2 className={classes.heading}>Contact Us</h2>
      <ThemeProvider theme={theme}>
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          color="primary"
          required
          name="name"
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          name="subject"
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          required
          multiline
          rows={4}
          label="Message"
          variant="outlined"
          name="message"
          onChange={handleChange}
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
      </ThemeProvider>
    </form>
  );
};

export default ContactUsForm;
