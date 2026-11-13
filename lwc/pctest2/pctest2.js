import { LightningElement } from 'lwc';

export default class Pctest2 extends LightningElement {
    Name = 'Somesh';
    dept = 'Application developer';
    stdId = '';
    stdName = '';

    handleStudent(event){
        this.std = event.detail;

        this.stdId = this.std.Id;
        this.stdName = this.std.Name;
    }
}