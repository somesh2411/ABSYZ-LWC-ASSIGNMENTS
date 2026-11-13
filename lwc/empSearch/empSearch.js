import { LightningElement } from 'lwc';
import getEmployeesByDepartment from '@salesforce/apex/EmployeeController.getEmployeesByDepartment';
//import EmployeeController from '@salesforce/apex/EmployeeController.EmployeeController';

export default class EmpSearch extends LightningElement {
    department = '';
    employees;
    errorMessage = '';

    handleChange(event){
        this.department = event.target.value;
    }

    async searchEmp(){
        this.employees = undefined;
        this.errorMessage = '';

        try{
            const res = await getEmployeesByDepartment({dept: this.department});
            if(res.length > 0) this.employees = res;
            else this.errorMessage = 'No Employees';
        }catch(error){
            this.errorMessage = 'Something went wrong';
        }
    }

    get hasEmp() {
        return this.employees && this.employees.length > 0;
    }
}