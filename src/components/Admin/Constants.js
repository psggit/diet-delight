export const QUESTION_TYPES = [
    {
        id: 0,
        name: 'Text'
    },
    {
        id: 1,
        name: 'Yes/No'
    },
    {
        id: 2,
        name: 'Dropdown'
    },
    {
        id: 3,
        name: 'Number'
    },
]

export const GENDER_TYPE = [{ id: 0, name: 'Male' }, { id: 1, name: 'Female' }, { id: 2, name: 'Other' }]

export const CONSULTATION_STATUS = [{ id: 0, name: 'Booked' }, { id: 1, name: 'Cancelled' }]

export const MEAL_PLAN_STATUS = [{ id: 0, name: 'Available' }, { id: 1, name: 'Unavailable' }]

export const MEAL_PLAN_TYPE = [{ id: 0, name: 'With Weekend' }, { id: 1, name: 'Without Weekend' }]

export const CONSULTANT_STATUS = [{ id: 0, name: 'Available' }, { id: 1, name: 'Leave' }, { id: 2, name: 'Left' }]

export const CONSULTATION_MODE = [{ id: 0, name: 'Offline' }, { id: 1, name: 'Online' }]

export const CONSULTATION_PACKAGE_STATUS = [{ id: 0, name: 'Available' }, { id: 1, name: 'Unavailable' }]

export const TRANSACTION_PURCHASE_STATUS = [{ id: 0, name: 'Processing' }, { id: 1, name: 'Success' }, { id: 2, name: 'Failed' }]

export const WEEK_DAYS = [
    { id: 'Sun', name: 'Sun' },
    { id: 'Mon', name: 'Mon' },
    { id: 'Tue', name: 'Tue' },
    { id: 'Wed', name: 'Wed' },
    { id: 'Thur', name: 'Thur' },
    { id: 'Fri', name: 'Fri' },
    { id: 'Sat', name: 'Sat' },
]

export const USER_TYPE = {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    CONSULTANT: 'consultant',
    ACCOUNTANT: 'accountant',
    KITCHEN: 'kitchen',
}

export const CONSULTATION_STATUS_TYPE = {
    CANCELLED: 'cancelled',
    BOOKED: 'booked',
}
