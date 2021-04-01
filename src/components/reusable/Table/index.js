import React from "react";
import {
	makeStyles,
	Table as DefaultTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TableSortLabel,
	Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	table: {
		minWidth: 650,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
});

const Table = (props) => {
	const { dataSource, order, orderBy, onSortClick, pagination = false, totalCount, page, rowsPerPage, onChangePage, onChangeRowsPerPage } = props;
	const { columns = [], rows = [] } = dataSource;
	const classes = useStyles();

	return (
		<>
			<TableContainer style={{ margin: "10px 0" }} component={Paper}>
				<DefaultTable className={classes.table} aria-label="simple table">
					<TableHead>
						{columns.map((column) => {
							if (column.sort) {
								return (
									<TableCell
										key={column.id}
										sortDirection={orderBy === column.id ? order : false}>
										<TableSortLabel
											active={orderBy === column.id}
											direction={order}
											onClick={() => onSortClick && onSortClick(column.id)}
										>
											{column.label}
											{orderBy === column.id ? (
												<span className={classes.visuallyHidden}>
													{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</TableCell>
								)
							}
							return <TableCell key={column.id}>{column.label}</TableCell>
						})}
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
			{pagination && <TablePagination
				rowsPerPageOptions={[20, 50, 100]}
				component="div"
				count={totalCount}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={onChangePage}
				onChangeRowsPerPage={onChangeRowsPerPage}
			/>}
		</>
	);
}

export default Table;
