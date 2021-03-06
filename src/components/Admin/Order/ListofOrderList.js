import React, { useState, useEffect } from 'react'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Edit, Delete } from '@material-ui/icons'

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';
import Modal from '../../reusable/Modal';
import Table from '../../reusable/Table';
import { Main } from './ConsultantElements'
import TableHeader from '../../reusable/TableHeader';
import MealPurchaseFormModal from './MealPurchaseFormModal';
import { TRANSACTION_PURCHASE_STATUS } from '../Constants';
import { CheckboxGroup } from '../../reusable/InputItems';


const mealPlanPurchaseInitialValues = {
  id: '',
  user: '',
  mealPlan: '',
  paymentId: '',
  amountPaid: '',
  status: '',
  startDate: '',
  endDate: '',
  billingAddressLine1: '',
  billingAddressLine2: '',
  shippingAddressLine1: '',
  shippingAddressLine2: '',
  kcal: '',
  portions: '',
  weekdays: [],
}

const ListofOrder = () => {
  const [listoforders, setListOfOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('meal_plan_name')
  const [order, setOrder] = useState('asc')
  const [show, setShow] = useState(false)
  const [isdelete, setIsDelete] = useState(false);
  const [mode, setMode] = useState('Add');
  const [showForm, setShowForm] = useState(false);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentMealPlanPurchase, setCurrentMealPlanPurchase] = useState(mealPlanPurchaseInitialValues);
  const [customers, setCustomers] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);

  let current_date_Time = new Date()
  const csvReport = {
    data: listoforders,
    filename: `List_of_listoforders_${current_date_Time}.csv`,
  }

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
    axios.get(`meal-plans`).then((res) => {
      setMealPlans((res?.data?.data || []).map((mealPlan) => {
        return {
          id: mealPlan.id,
          name: mealPlan.name,
          duration: mealPlan.duration,
          durationId: mealPlan.duration_id,
        }
      }));
    });
  }, [])

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios.get(`meal-purchases?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`
    ).then((res) => {
      console.log(res.data.data);
      setListOfOrders(res.data.data)
      setLoading(false)
      setShow(true)
      setTotalCount(res.data?.meta?.total || 0);
    }).catch(err => console.log(err));
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotificationConf([false, 'success', '']);
  };

  const getMealPlanPurchaseStatus = (status) => {
    switch (status) {
      case 0:
        return TRANSACTION_PURCHASE_STATUS[0].name;
      case 1:
        return TRANSACTION_PURCHASE_STATUS[1].name;
      case 2:
        return TRANSACTION_PURCHASE_STATUS[2].name;
    }
  }

  const getWeekdays = (weekdays) => {
    weekdays = weekdays ? JSON.parse(weekdays) : [];

    return <CheckboxGroup selectAll checkboxOptions={weekdays.map(i => ({ id: i, name: i }))} />
  }

  const handleFormSubmit = (values) => {
    const { startDate: sd, endDate: ed } = values;
    const selectedMealPlan = mealPlans.find(i => i.id === values.mealPlan);
    let startDate = '';
    let endDate = '';

    if (sd) {
      startDate = `${sd.getFullYear()}-${sd.getMonth() + 1}-${sd.getDate()} 00:00:00`
    }

    if (ed) {
      endDate = `${ed.getFullYear()}-${ed.getMonth() + 1}-${ed.getDate()} 11:59:59`
    }

    const data = {
      user_id: values.user,
      meal_plan_id: values.mealPlan,
      duration_id: selectedMealPlan.durationId,
      payment_id: values.paymentId,
      ...(values.status >= 0 ? { status: values.status } : {}),
      billing_address_line1: values.billingAddressLine1 || '',
      billing_address_line2: values.billingAddressLine2 || '',
      shipping_address_line1: values.shippingAddressLine1 || '',
      shipping_address_line2: values.shippingAddressLine2 || '',
      meal_plan_name: selectedMealPlan.name,
      meal_plan_duration: selectedMealPlan.duration,
      amount_paid: parseInt(values.amountPaid, 10),
      start_date: startDate,
      ...(endDate ? { end_date: endDate } : {}),
      kcal: parseInt(values.kcal || 0, 10),
      portions: parseInt(values.portions || 0, 10),
      ...((values.weekdays || []).length ? { weekdays: JSON.stringify(values.weekdays) } : {}),
    }
    if (mode === 'Add') {
      axios.post(`meal-purchases`, data).then((res) => {
        setNotificationConf([true, 'success', 'Meal Plan Subscription Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`meal-purchases/${currentMealPlanPurchase.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Meal Plan Subscription Updated Successfully !'])
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
          title="Delete Meal Plan Subscription"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`meal-purchases/${currentMealPlanPurchase.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Meal Plan Subscription Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <MealPurchaseFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentMealPlanPurchase(mealPlanPurchaseInitialValues)
            }
          }}
          mode={mode}
          values={currentMealPlanPurchase}
          onSubmit={handleFormSubmit}
          customers={customers}
          mealPlans={mealPlans}
        />
      )}
      {loading ? (
        <CustomSkeleton />
      ) : (
          <>
            <Main style={{ padding: '0 2rem' }}>
              <TableHeader
                title="List of Meal Plan Subscription"
                csvReport={csvReport}
                searchHandler={(value) => {
                  setSearch(value)
                }}
              />
              {show && (
                <Table
                  dataSource={{
                    columns: [
                      { id: 'user_id', label: 'User ID', sort: false },
                      { id: 'customer_name', label: 'Customer Name', sort: false },
                      { id: 'meal_plan_name', label: 'Meal Plan Name', sort: true },
                      { id: 'meal_plan_id', label: 'Meal Plan Id', sort: false },
                      { id: 'payment_id', label: 'Payment ID', sort: false },
                      { id: 'status', label: 'Status', sort: true },
                      { id: 'amount_paid', label: 'Revenue', sort: true },
                      { id: 'start_date', label: 'Start Date', sort: true },
                      { id: 'meal_plan_duration', label: 'Duration', sort: true },
                      { id: 'actions', label: '', sort: false },
                    ],
                    rows: listoforders.map((order) => {
                      return [
                        order.user_id,
                        `${order?.user?.first_name || ''} ${order?.user?.last_name || ''}`,
                        order.meal_plan_name,
                        order.meal_plan_id,
                        order.payment_id,
                        getMealPlanPurchaseStatus(order.status),
                        order.amount_paid,
                        order.start_date,
                        order.meal_plan_duration,
                      ]
                    }),
                  }}
                  order={order}
                  orderBy={sort}
                  onSortClick={(key) => {
                    setOrder(order === 'asc' ? 'desc' : 'asc')
                    setSort(key)
                  }}
                  pagination
                  page={page}
                  totalCount={totalCount}
                  rowsPerPage={rowsPerPage}
                  onChangePage={(_, newPage) => {
                    setPage(newPage)
                  }}
                  onChangeRowsPerPage={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10))
                    setPage(0)
                  }}
                />
              )}
              <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Success"
                open={showNotification}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={notificationType}>
                  {notification}
                </Alert>
              </Snackbar>
            </Main>
          </>
        )}
    </>
  )
}

export default ListofOrder
