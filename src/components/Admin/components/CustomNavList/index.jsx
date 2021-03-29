import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    padding: 0,
    backgroundColor: '#373a47',
  },
  item: {
    paddingLeft: 20,
    paddingRight: 0,
    color: "#b8b7ad",
    '&:hover': {
      color: '#c94e50',
    }
  },
  nested: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 35,
    color: "#b8b7ad",
    '&:hover': {
      color: '#c94e50',
    }
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const { primaryLabel, navList, name, handleClick, open } = props;

  return (
    <>
      <List
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem className={classes.item} button onClick={() => handleClick(name)}>
          <ListItemText primary={<div className='list-item-label'>{primaryLabel}{open ? <ExpandLess /> : <ExpandMore />}</div>} />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navList.map((value, index) => (
              <ListItem
                key={index}
                button
                className={classes.nested}
                component={RouterLink}
                to={"/admin/" + value.link}
              >
                <ListItemText className='list-item-text' primary={value.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}
