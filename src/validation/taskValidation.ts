import * as Yup from 'yup';
import { priorityOptionsArr, categoryOptionsArr, statusOptionsArr } from '../constants/formconstants/TaskFormConstants'; 

export const createTaskSchema = Yup.object().shape({

    title: Yup.string().trim()
        .min(2, 'minimum 2 characters')
        .max(50, 'maximum 50 characters')
        .required('please enter the title!'),

    description: Yup.string().trim()
        .min(2, "description should be more than 2 characters")
        .max(150, "description cannot be more than 150 characters"),
       

    status: Yup.string()
        .oneOf(statusOptionsArr.map((e) => e.value), 'Invalid status selected'),
        

    category: Yup.string()
        .oneOf(categoryOptionsArr.map((e) => e.value), 'Invalid category selected')
        .required('please select the category of the task'),

    priority: Yup.string()
        .oneOf(priorityOptionsArr.map((e) => e.value), 'Invalid priority selected')
        .required('please select the priority of the task'),

   
    dueDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .test("check date ","The date must be a present date or a future date",(val)=>{
            if(!val)return true
            const today=new Date().getDay();
            const validationDate=new Date(val).getDay()
            return validationDate>=today
        })
    
});