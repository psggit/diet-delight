import React, { useState, useEffect } from 'react'

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';

import { makeStyles, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Edit, Delete } from '@material-ui/icons';

import { Formik } from 'formik'
// import * as Yup from 'yup'

import { Main, HContainer, Con, Input, Title, Set, Mini, Info, Container } from './ConsultantElements'
import { useDispatch, useSelector } from 'react-redux'
import { selectListOfOrder, resetListOfOrder, setListOfOrder } from '../../../features/adminSlice'
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';

const useStyles = makeStyles({
	root: {
		width: '100%',
	},

	table: {
		minWidth: 650,
	},
});

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required().label("Name"),
//     status: Yup.string().required().label("Status"),
//     qualification: Yup.string().required().label("Qualification"),
//     bio: Yup.string().required().label("Bio"),
//     order: Yup.number().required().label("Order"),
// });


const PostOrder = () => {

	const dispatch = useDispatch();
	const listoforder = useSelector(selectListOfOrder);

	const [listoforders, setListOfOrders] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(20)
	const [page, setPage] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('consultation_package_name')
	const [order, setOrder] = useState('asc');
	const [show, setShow] = useState(false)
	const [Issuccess, setIsSuccess] = useState(false);
	const [isdelete, setIsDelete] = useState(false);
	const [isupdate, setISUpdate] = useState(false);

	let current_date_Time = new Date();
	const csvReport = {
		data: listoforders,
		filename: `List_of_listoforders_${current_date_Time}.csv`,
	};

	useEffect(() => {
		// TODO: Remove after making change in API
		  axios.get('consultation-purchases').then((res) => {
			setTotalCount(res?.data?.data?.length);
		  })
		}, [])
	  
		useEffect(() => {
		  handleShow();
		}, [rowsPerPage, page, search, sort, order]);

	const handleShow = () => {
		axios.get(`consultation-purchases?pageSize=${rowsPerPage}&page=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`).then((res) => {
			setListOfOrders(res.data.data)
			setLoading(false)
			setShow(true)
		}).catch(err => console.log(err));
	}

	const classes = useStyles();

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsSuccess(false);
	};


	const handleUpdate = async (orderlist) => {
		console.log(orderlist)
		await dispatch(setListOfOrder({
			id: orderlist.id,
			user_id: orderlist.user_id,
			consultation_package_id: orderlist.consultation_package_id,
			payment_id: orderlist.payment_id,
			status: orderlist.status,
			billing_address_line1: orderlist.billing_address_line1,
			billing_address_line2: orderlist.billing_address_line2,
			consultation_package_name: orderlist.consultation_package_name,
			consultation_package_duration: orderlist.consultation_package_duration,
			amount_paid: orderlist.amount_paid,

		}))

		await setISUpdate(true);
	}

	const handleDelete = async (orderlist) => {
		await dispatch(resetListOfOrder())
		await dispatch(setListOfOrder({
			id: orderlist.id
		}))
		await setIsDelete(true)
	}

	const CloseDelete = () => setIsDelete(false)
	const CloseUpdate = () => setISUpdate(false)

	return (
		<>

			{isdelete && (<>  <Dialog
				open={isdelete}
				onClose={CloseDelete}
				aria-labelledby="form-dialog-title"
				disableBackdropClick
				disableEscapeKeyDown
			>
				<DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
				<DialogContent>
					<Mini>
						<Button variant="contained" color="secondary"
							onClick={() => {
								axios.delete(`consultation-purchases/${listoforder.id}`).then(
									(res) => {
										setIsSuccess(true)
										setIsDelete(false)
										handleShow()
									}
								).catch(err => console.log(err))
							}}
						>Delete</Button>
						<Button variant="contained" style={{ margin: "10px", background: "#800080" }} color="primary" onClick={CloseDelete}>Close</Button>
					</Mini>
				</DialogContent>
			</Dialog>
			</>)}

			{isupdate && (<>  <Dialog
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
							user_id: listoforder.user_id,
							consultation_package_id: listoforder.consultation_package_id,
							payment_id: listoforder.payment_id,
							status: listoforder.status,
							billing_address_line1: listoforder.billing_address_line1,
							billing_address_line2: listoforder.billing_address_line2,
							consultation_package_name: listoforder.consultation_package_name,
							consultation_package_duration: listoforder.consultation_package_duration,
							amount_paid: listoforder.amount_paid,
						}}

						onSubmit={(values) => {
							axios.put(`meal-purchases/${listoforder.id}`, {
								headers: {
									Authorization: `Bearer ${localStorage.getItem('access_token')}`
								},
								user_id: values.user_id,
								consultation_package_id: values.consultation_package_id,
								payment_id: values.payment_id,
								status: values.status,
								billing_address_line1: values.billing_address_line1,
								billing_address_line2: values.billing_address_line2,
								consultation_package_name: values.consultation_package_name,
								consultation_package_duration: values.consultation_package_duration,
								amount_paid: values.amount_paid,
							}).then((res) => {
								setIsSuccess(true)
								setISUpdate(false)
								handleShow()
							}).catch(err => console.log(err))
						}}
					>
						{({ handleChange, handleSubmit, errors, touched, values }) => (
							< >
								<Container>
									<Mini>
										<Title>
											User ID
                                            </Title>
										<Input
											value={values.user_id}
											placeholder="User ID"
											onChange={handleChange("user_id")}>
										</Input>
									</Mini>
									{errors.user_id && touched && (
										<Info error>{errors.user_id}</Info>
									)}

									<Mini>
										<Title>
											Consultation Package ID
                                            </Title>
										<Input
											placeholder=" Consultation Package ID"
											value={values.consultation_package_id}
											onChange={handleChange("consultation_package_id")}>
										</Input>
									</Mini>
									{errors.consultation_package_id && touched && (
										<Info error>{errors.consultation_package_id}</Info>
									)}
									<Mini>
										<Title>
											Payment ID
                                            </Title>
										<Input
											placeholder="Payment ID"
											value={values.payment_id}
											onChange={handleChange("payment_id")}>
										</Input>
									</Mini>
									{errors.payment_id && touched && (
										<Info error>{errors.payment_id}</Info>
									)}
									<Mini>
										<Title>Status</Title>
										<Input
											placeholder="Status"
											value={values.status}
											onChange={handleChange("status")} />
									</Mini>
									{errors.status && touched && (
										<Info error>{errors.status}</Info>
									)}
									<Mini>
										<Title>Billing Address Line1</Title>
										<Input
											placeholder="Billing Address Line1"
											value={values.billing_address_line1}
											onChange={handleChange("billing_address_line1")} />
									</Mini>
									{errors.billing_address_line1 && touched && (
										<Info error>{errors.billing_address_line1}</Info>
									)}
									<Mini>
										<Title>Billing Address Line2</Title>
										<Input
											placeholder="Billing Address Line2"
											value={values.billing_address_line2}
											onChange={handleChange("billing_address_line2")} />
									</Mini>
									{errors.billing_address_line2 && touched && (
										<Info error>{errors.billing_address_line2}</Info>
									)}
									<Mini>
										<Title>Consultation Package Name</Title>
										<Input
											placeholder="Consultation Package Name"
											value={values.consultation_package_name}
											onChange={handleChange("consultation_package_name")} />
									</Mini>
									{errors.consultation_package_name && touched && (
										<Info error>{errors.consultation_package_name}</Info>
									)}
									<Mini>
										<Title>Consultation Package Duration</Title>
										<Input
											placeholder="Consultation Package Duration"
											value={values.consultation_package_duration}
											onChange={handleChange("consultation_package_duration")} />
									</Mini>
									{errors.consultation_package_duration && touched && (
										<Info error>{errors.consultation_package_duration}</Info>
									)}
									<Mini>
										<Title>Amount Paid</Title>
										<Input
											placeholder="Amount Paid"
											value={values.amount_paid}
											onChange={handleChange("amount_paid")} />
									</Mini>
									{errors.amount_paid && touched && (
										<Info error>{errors.amount_paid}</Info>
									)}

									<Mini>
										<Button
											variant="contained"
											style={{ margin: "20px", padding: "5px", background: "#800080" }}
											color="primary"
											onClick={handleSubmit}
										>submit</Button>
										<Button
											variant="contained"
											style={{ margin: "20px", padding: "5px", background: "#800080" }}
											color="primary"
											onClick={CloseUpdate}
										>Close</Button>
									</Mini>
								</Container>
							</>
						)}

					</Formik>
				</DialogContent>
			</Dialog>
			</>)}
			{loading ? (<CustomSkeleton />) : (<>
				<Main>
					<TableHeader
						title="List of All Consultation Purchase"
						csvReport={csvReport}
						addHandler={() => {
							// TODO: Handle add
						}}
						searchHandler={(value) => {
							setSearch(value);
						}}
					/>
					{show && (
						<Table
							dataSource={{
								columns: [
									{ id: 'user_id', label: 'User ID', sort: true },
									{ id: 'consultation_package_id', label: 'Consultation Package ID', sort: true },
									{ id: 'payment_id', label: 'Payment ID', sort: false },
									{ id: 'satus', label: 'Satus', sort: true },
									{ id: 'billing_address', label: 'Billing Address', sort: false },
									{ id: 'consultation_package_name', label: 'Consultation Package Name', sort: true },
									{ id: 'consultation_package_duration', label: 'Consultation Package Duration', sort: true },
									{ id: 'amount_paid', label: 'Amount Paid', sort: true },
									{ id: 'actions', label: '', sort: false },
								],
								rows: listoforders.map((order) => {
									return [
										order.user_id,
										order.consultation_package_id,
										order.payment_id,
										order.satus,
										`${order.billing_address_line1 || ''} ${order.billing_address_line2 || ''}`,
										order.consultation_package_name,
										order.consultation_package_duration,
										order.amount_paid,
										<>
											<Edit
												onClick={() => {
													// setMode('Update')
													// setCurrentQuestion(order);
													// handleUpdate(order);
													// setShowForm(true);
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
						anchorOrigin={{ vertical: 'top', horizontal: "center" }}
						message="Success"
						open={Issuccess}
						onClose={handleClose}
					>
						<Alert onClose={handleClose} severity="success">
							Success Message !
                        </Alert>
					</Snackbar>
				</Main>
			</>)}
		</>
	)
}

export default PostOrder
