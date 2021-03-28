import React, { useState, useEffect } from 'react'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Edit, Delete } from '@material-ui/icons';

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';
import { Main } from './ConsultantElements'
import TableHeader from '../../reusable/TableHeader';
import Table from '../../reusable/Table';
import ConsultationPurchaseFormModal from "./ConsultationPurchaseFormModal";
import { CONSULTATION_MODE, TRANSACTION_PURCHASE_STATUS } from "../Constants";
import Modal from '../../reusable/Modal';

const consultationPurchaseInitialValue = {
	id: '',
	user: '',
	consultationPackage: '',
	paymentId: '',
	amountPaid: '',
	status: '',
	billingAddressLine1: '',
	billingAddressLine2: '',
}

const PostOrder = () => {
	const [listoforders, setListOfOrders] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(20)
	const [page, setPage] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('consultation_package_name')
	const [order, setOrder] = useState('asc');
	const [show, setShow] = useState(false)
	const [isdelete, setIsDelete] = useState(false);
	const [mode, setMode] = useState('Add');
	const [showForm, setShowForm] = useState(false);
	const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
	const [currentConsultaionPurchase, setCurrentConsultationPurchase] = useState(consultationPurchaseInitialValue);
	const [customers, setCustomers] = useState([]);
	const [consultationPackages, setConsoltationPackages] = useState([]);

	let current_date_Time = new Date();
	const csvReport = {
		data: listoforders,
		filename: `List_of_listoforders_${current_date_Time}.csv`,
	};

	useEffect(() => {
		axios.get(`users?role_id=${1}`).then((res) => {
			setCustomers((res?.data?.data || []).map((user) => {
				return {
					id: user.id,
					name: `${user.first_name || ''} ${user.last_name || ''}`,
					email: user.email,
					mobile: user.mobile,
				}
			}));
		});
		axios.get(`consultation-packages`).then((res) => {
			setConsoltationPackages((res?.data?.data || []).map((cPackage) => {
				return {
					id: cPackage.id,
					name: cPackage.name,
					duration: cPackage.duration,
				}
			}));
		});
	}, [])

	useEffect(() => {
		handleShow();
	}, [rowsPerPage, page, search, sort, order]);

	const handleShow = () => {
		axios.get(`consultation-purchases?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`).then((res) => {
			setListOfOrders(res.data.data)
			setLoading(false)
			setShow(true)
			setTotalCount(res.data?.meta?.total || 0);
		}).catch(err => console.log(err));
	}

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setNotificationConf([false, 'success', '']);
	};

	const getConsultationMode = (mode) => {
		switch (mode) {
			case 0:
				return CONSULTATION_MODE[0].name;
			case 1:
				return CONSULTATION_MODE[1].name;
		}
	}

	const getConsultationPurchaseStatus = (status) => {
		switch (status) {
			case 0:
				return TRANSACTION_PURCHASE_STATUS[0].name;
			case 1:
				return TRANSACTION_PURCHASE_STATUS[1].name;
			case 2:
				return TRANSACTION_PURCHASE_STATUS[2].name;
		}
	}

	const handleFormSubmit = (values) => {
		const selectedpackage = consultationPackages.find(i => i.id === values.consultationPackage);

		const data = {
			user_id: values.user,
			consultation_package_id: values.consultationPackage,
			payment_id: values.paymentId,
			...(values.status >= 0 ? { status: values.status } : {}),
			billing_address_line1: values.billingAddressLine1 || '',
			billing_address_line2: values.billingAddressLine2 || '',
			consultation_package_name: selectedpackage.name,
			consultation_package_duration: selectedpackage.duration,
			amount_paid: parseInt(values.amountPaid, 10),
		}
		if (mode === 'Add') {
			axios.post(`consultation-purchases`, data).then((res) => {
				setNotificationConf([true, 'success', 'Consultation Purchase Added Successfully !'])
				handleShow();
			}).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
		} else {
			axios
				.put(`consultation-purchases/${currentConsultaionPurchase.id}`, data)
				.then((res) => {
					setNotificationConf([true, 'success', 'Consultation Purchase Updated Successfully !'])
					handleShow();
				})
				.catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
		}
		setShowForm(false);
	}

	const [showNotification, notificationType, notification] = notificationConf;

	return (
		<>

			{isdelete && (
				<Modal
					visible={isdelete}
					onClose={() => setIsDelete(false)}
					title="Delete Consultation Purchase"
					acceptButtonConfig={{
						color: 'secondary',
						text: 'Delete',
						onClick: () => {
							setIsDelete(false);
							axios
								.delete(`consultation-purchases/${currentConsultaionPurchase.id}`)
								.then(() => {
									setNotificationConf([true, 'success', 'Consultation Purchase Deleted Successfully !'])
									handleShow();
								})
								.catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
						}
					}}
				/>
			)}
			{showForm && (
				<ConsultationPurchaseFormModal
					visible={showForm}
					onClose={() => {
						setShowForm(false)
						if (mode === 'Update') {
							setCurrentConsultationPurchase(consultationPurchaseInitialValue)
						}
					}}
					mode={mode}
					values={currentConsultaionPurchase}
					onSubmit={handleFormSubmit}
					customers={customers}
					consultationPackages={consultationPackages}
				/>
			)}
			{loading ? (
				<CustomSkeleton />
			) : (
				<Main>
					<TableHeader
						title="List of Consultation Purchase"
						csvReport={csvReport}
						addHandler={() => {
							setMode('Add');
							setShowForm(true);
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
									{ id: 'customer_name', label: 'Customer Name', sort: true },
									{ id: 'consultation_package_name', label: 'Consultation Package', sort: true },
									{ id: 'payment_id', label: 'Payment ID', sort: false },
									{ id: 'status', label: 'Status', sort: true },
									{ id: 'billing_address', label: 'Billing Address', sort: false },
									{ id: 'consultation_mode', label: 'Mode of Consultation', sort: false },
									{ id: 'amount_paid', label: 'Amount Paid', sort: true },
									{ id: 'actions', label: '', sort: false },
								],
								rows: listoforders.map((order) => {
									return [
										order.user_id,
										order?.user?.name || '',
										order.consultation_package_name,
										order.payment_id,
										getConsultationPurchaseStatus(order.status),
										`${order.billing_address_line1 || ''} ${order.billing_address_line2 || ''}`,
										getConsultationMode((order?.consultations || [])[0]?.consultation_mode || ''),
										order.amount_paid,
										<>
											<Edit
												onClick={() => {
													setMode('Update')
													setCurrentConsultationPurchase({
														id: order.id,
														user: order.user_id,
														consultationPackage: order.consultation_package_id,
														paymentId: order.payment_id,
														amountPaid: order.amount_paid,
														status: order.status,
														billingAddressLine1: order.billing_address_line1 || '',
														billingAddressLine2: order.billing_address_line2 || '',
													});
													setShowForm(true);
												}}
												style={{ margin: '0 6px', cursor: 'pointer' }}
											/>
											<Delete onClick={() => {
												setCurrentConsultationPurchase(order);
												setIsDelete(true)
											}} style={{ margin: '0 6px', cursor: 'pointer' }} />
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
						open={showNotification}
						onClose={handleClose}
					>
						<Alert onClose={handleClose} severity={notificationType}>
							{notification}
						</Alert>
					</Snackbar>
				</Main>
			)}
		</>
	)
}

export default PostOrder
