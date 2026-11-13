import { LightningElement,wire,api } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

const field = [NAME_FIELD, INDUSTRY_FIELD, PHONE_FIELD, WEBSITE_FIELD];
export default class Test5 extends LightningElement {
    @api recordId;

    Isview = true;

    fieldset = field;

    @wire(getRecord, {recordId : '$recordId', fields: field})
    account;

    get accountname(){
        return getFieldValue(this.account.data,NAME_FIELD);
    }

    get industry(){
        return getFieldValue(this.account.data,INDUSTRY_FIELD);
    }

    get phone(){
        return getFieldValue(this.account.data,PHONE_FIELD);
    }

    get website(){
        return getFieldValue(this.account.value,WEBSITE_FIELD);
    }
    handletoggleedit(){
        this.Isview = !this.Isview;
    }

    handlesuccess(){
        this.Isview = true;
    }



}