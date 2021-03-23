import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    padding: "0",
    backgroundColor: '#373a47',
  },
  item: {
    color: "#b8b7ad",
    '&:hover': {
      color: '#c94e50',
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
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
          <ListItemText primary={primaryLabel} />
          {open ? <ExpandLess /> : <ExpandMore />}
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
                <ListItemText primary={value.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}
