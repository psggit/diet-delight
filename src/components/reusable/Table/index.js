import React from "react";
import {
    makeStyles,
    Table as DefaultTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },

    table: {
        minWidth: 650,
    },
});

const Table = (props) => {
    const { dataSource } = props;
    const { columns = [], rows = [] } = dataSource;

    const classes = useStyles();


    return (
        <TableContainer style={{ margin: "10px 0" }} component={Paper}>
            <DefaultTable className={classes.table} aria-label="simple table">
                <TableHead>
                    {columns.map((column, index) => <TableCell key={index}>{column}</TableCell>)}
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        return <TableRow key={index}>
                            {row.map((element, key) => <TableCell key={key}>{element}</TableCell>)}
                        </TableRow>
                    })}
                </TableBody>
            </DefaultTable>
        </TableContainer>
    );
}

export default Table;
