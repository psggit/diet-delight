import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import CustomSkeleton from "../../../CustomSkeleton";

import { Snackbar } from "@material-ui/core";
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from "@material-ui/lab/Alert";

import TableHeader from '../../reusable/TableHeader';
import Modal from '../../reusable/Modal';
import MealPlanFormModal from './MealPlanFormModal';

import Table from '../../reusable/Table';
import { MEAL_PLAN_STATUS, MEAL_PLAN_TYPE } from '../Constants';
import { Main } from "./MealPlanElements";

const mealPlanInitialValues = {
  id: '',
  title: '',
  subtitle: '',
  menu: '',
  duration: '',
  order: '',
  status: '',
  type: '',
  price: '',
  salePrice: '',
  details: '',
}

const ListofMealPlan = () => {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('Add');
  const [isdelete, setIsDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [durations, setDurations] = useState([]);
  const [menus, setMenus] = useState([]);
  const [notificationConf, setNotificationConf] = useState([false, 'success', '']);
  const [currentMealPlan, setCurrentMealPlan] = useState(mealPlanInitialValues);

  let current_date_Time = new Date();
  const csvReport = {
    data: meals,
    filename: `List_of_meals_${current_date_Time}.csv`,
  };

  useEffect(() => {
    axios.get(`durations`).then((res) => {
      setDurations((res?.data?.data || []).map((duration) => {
        return {
          id: duration.id,
          name: duration.title,
          duration: duration.duration,
        }
      }));
    });
    axios.get(`menus`).then((res) => {
      setMenus((res?.data?.data || []).map((menu) => {
        return {
          id: menu.id,
          name: menu.name
        }
      }));
    });
  }, [])

  useEffect(() => {
    handleShow();
  }, [rowsPerPage, page, search, sort, order]);

  const handleShow = () => {
    axios
      .get(`meal-plans?pageSize=${rowsPerPage}&page=${page + 1}&search=${search}&sortBy=${sort}&sortOrder=${order}`)
      .then((res) => {
        setMeals(res.data.data);
        setLoading(false);
        setShow(true);
        setTotalCount(res.data?.meta?.total || 0);
      })
      .catch((err) => console.log(err));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationConf([false, 'success', '']);
  };

  const handleFormSubmit = (values) => {
    const selectedDuration = durations.find(d => d.id === values.duration)
    const data = {
      name: values.title,
      menu_id: values.menu,
      duration_id: values.duration,
      ...(values.status > 0 ? { status: values.status } : {}),
      ...(values.type > 0 ? { type: values.type } : {}),
      duration: selectedDuration.duration,
      order: parseInt(values.order, 10),
      subtitle: values.subtitle || '',
      details: values.details || '',
      ...(values.picture ? { picture: values.picture } : {}),
      ...(values.price ? { price: values.price } : {}),
      ...(values.salePrice ? { sale_price: values.salePrice } : {}),
    }
    if (mode === 'Add') {
      axios.post(`meal-plans`, data).then((res) => {
        setNotificationConf([true, 'success', 'Meal Plan Added Successfully !'])
        handleShow();
      }).catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']))
    } else {
      axios
        .put(`meal-plans/${currentMealPlan.id}`, data)
        .then((res) => {
          setNotificationConf([true, 'success', 'Meal Plan Updated Successfully !'])
          handleShow();
        })
        .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
    }
    console.log(data);
    setShowForm(false);
  }

  const getMealStatus = (status) => {
    switch (status) {
      case 0:
        return MEAL_PLAN_STATUS[0].name;
      case 1:
        return MEAL_PLAN_STATUS[1].name;
    }
  }

  const getMealType = (type) => {
    switch (type) {
      case 0:
        return MEAL_PLAN_TYPE[0].name;
      case 1:
        return MEAL_PLAN_TYPE[1].name;
    }
  }

  const [showNotification, notificationType, notification] = notificationConf;

  return (
    <>
      {isdelete && (
        <Modal
          visible={isdelete}
          onClose={() => setIsDelete(false)}
          title="Delete Meal Plan"
          acceptButtonConfig={{
            color: 'secondary',
            text: 'Delete',
            onClick: () => {
              setIsDelete(false);
              axios
                .delete(`meal-plans/${currentMealPlan.id}`)
                .then(() => {
                  setNotificationConf([true, 'success', 'Meal Plan Deleted Successfully !'])
                  handleShow();
                })
                .catch(() => setNotificationConf([true, 'error', 'Something went wrong. Please try again later!']));
            }
          }}
        />
      )}
      {showForm && (
        <MealPlanFormModal
          visible={showForm}
          onClose={() => {
            setShowForm(false)
            if (mode === 'Update') {
              setCurrentMealPlan(mealPlanInitialValues)
            }
          }}
          mode={mode}
          values={currentMealPlan}
          onSubmit={handleFormSubmit}
          durations={durations}
          menus={menus}
        />
      )}
      {loading ? (
        <CustomSkeleton />
      ) : (
        <>
          <Main>
            <TableHeader
              title="List of Meal Plans"
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
                    { id: 'name', label: 'Name', sort: true },
                    { id: 'menu_id', label: 'Menu Package', sort: true },
                    { id: 'duration', label: 'Duration', sort: true },
                    { id: 'status', label: 'Status', sort: true },
                    { id: 'type', label: 'Type', sort: true },
                    { id: 'order', label: 'Order', sort: true },
                    { id: 'price', label: 'Price', sort: true },
                    { id: 'sale_price', label: 'Sales Price', sort: true },
                    { id: 'actions', label: '', sort: false },
                  ],
                  rows: meals.map((meal) => {
                    return [
                      meal.name,
                      meal.menu_id,
                      meal.duration,
                      getMealStatus(meal.status),
                      getMealType(meal.type),
                      meal.order,
                      meal.price,
                      meal.sale_price,
                      <>
                        <Edit
                          onClick={() => {
                            setMode('Update')
                            setCurrentMealPlan({
                              id: meal.id,
                              title: meal.name,
                              subtitle: meal.subtitle,
                              menu: meal.menu_id,
                              duration: meal.duration_id,
                              order: meal.order,
                              status: meal.status,
                              type: meal.type,
                              price: meal.price,
                              salePrice: meal.sale_price,
                              details: meal.details,
                            });
                            setShowForm(true);
                          }}
                          style={{ margin: '0 6px', cursor: 'pointer' }}
                        />
                        <Delete onClick={() => {
                          setIsDelete(true);
                          setCurrentMealPlan(meal);
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
          </Main>
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
        </>
      )}
    </>
  );
};

export default ListofMealPlan;
