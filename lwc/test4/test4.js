import { LightningElement } from 'lwc';

export default class Test4 extends LightningElement {
    arr = [
        {id:'101',name : 'Somesh',department : 'IT'},
        {id:'102',name : 'John',department : 'HR'},
        {id:'103',name : 'Sam',department : 'IT'}
    ]

    allemp = [];

    connectedCallback(){
        this.allemp = [...this.arr];
    }
    showIT(){
        this.allemp = this.arr.filter(emp => emp.department === 'IT');  
    }

    showAll(){
        this.allemp = [...this.arr];
    }

    hasEmp(){
        return this.allemp.length > 0;
    }
}


