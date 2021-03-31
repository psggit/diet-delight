import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        temp: null,
        mealplan: null,
        question: null,
        consultant: null, 
        consultationPackage:null,
        menu:null,
        category:null,
        menuitem:null,
        listoforder : null,
        listOfCoupon:null,
        consultation:null,
        answer:null,
        duration:null,
        listOfBlog:null,
        listOfKitchenReport:null,
    },
    reducers: {
        setTemp: (state, action) => {
            state.temp = action.payload
        },
        resetTemp: (state) => {
            state.temp = null
        },
        setMealPlan: (state, action) => {
            state.mealplan = action.payload
        },
        resetMealPlan: (state) => {
            state.mealplan = null
        },
        setQuestion: (state, action) => {
            state.question = action.payload
        },
        resetQuestion: (state) => {
            state.question = null
        },
        setConsultant: (state, action) => {
            state.consultant = action.payload
        },
        resetConsultant: (state) => {
            state.consultant = null
        },
        setConsultationPackage: (state, action) => {
            state.consultationPackage = action.payload
        },
        resetConsultationPackage: (state) => {
            state.consultationPackage = null
        },
        setMenu: (state, action) => {
            state.menu = action.payload
        },
        resetMenu: (state) => {
            state.menu = null
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        resetCategory: (state) => {
            state.category = null
        },
        setMenuItem: (state, action) => {
            state.menuitem = action.payload
        },
        resetMenuItem: (state) => {
            state.menuitem = null
        },
        setListOfOrder: (state, action) => {
            state.listoforder = action.payload
        },
        resetListOfOrder: (state) => {
            state.listoforder = null 
        },
        setListOfCoupon: (state, action) => {
            state.listOfCoupon = action.payload
        },
        resetListOfCoupon: (state) => {
            state.listOfCoupon = null
        },
        setConsultation: (state, action) => {
            state.Consultation = action.payload
        },
        resetConsultation: (state) => {
            state.Consultation = null
        },
        setListOfAnswer: (state, action) => {
            state.answer = action.payload
        },
        resetListOfAnswer: (state) => {
            state.answer = null
        },
        setListOfDuration: (state, action) => {
            state.duration = action.payload
        },
        resetListOfDuration: (state) => {
            state.duration = null
        },
        setListOfBlog: (state, action) => {
            state.blog = action.payload
        },
        resetListOfBlog: (state) => {
            state.blog = null
        },
        setListOfKitchenReport: (state, action) => {
            state.kitchenReport = action.payload
        },
        resetListOfKitchenReport: (state) => {
            state.kitchenReport = null
        }
    }
});

export const {
    setTemp,
    resetTemp,
    setMealPlan,
    resetMealPlan,
    setQuestion,
    resetQuestion,
    setConsultant,
    resetConsultant,
    setConsultationPackage,
    resetConsultationPackage,
    setMenu,
    resetMenu,
    setCategory,
    resetCategory,
    setMenuItem,
    resetMenuItem,
    setListOfOrder,
    resetListOfOrder,
    setListOfCoupon,
    resetListOfCoupon,
    setConsultation,
    resetConsultation,
    setListOfAnswer,
    resetListOfAnswer,
    setListOfDuration,
    resetListOfDuration,
    setListOfBlog,
    resetListOfBlog,
    setListOfKitchenReport,
    resetListOfKitchenReport
 } = adminSlice.actions;

export const selectTemp = state => state.admin.temp;
export const selectMealPlan = state => state.admin.mealplan;
export const selectQuestion = state => state.admin.question;
export const selectConsultant = state => state.admin.consultant;
export const selectConsultationPackage = state => state.admin.consultationPackage;
export const selectMenu = state => state.admin.menu;
export const selectCategory = state => state.admin.category;
export const selectMenuItem = state => state.admin.menuitem;
export const selectListOfOrder = state => state.admin.listoforder;
export const selectListOfCoupon = state => state.admin.listOfCoupon;
export const selectConsultation = state => state.admin.Consultation;
export const selectListOfAnswer = state => state.admin.answer;
export const selectListOfDuration = state => state.admin.duration;
export const selectListOfBlog = state => state.admin.blog;
export const selectListOfKitchenReport = state => state.admin.kitchenReport;
export default adminSlice.reducer;