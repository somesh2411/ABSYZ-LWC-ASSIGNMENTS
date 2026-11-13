import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

const FIELDS = [NAME_FIELD,INDUSTRY_FIELD,PHONE_FIELD,TYPE_FIELD,ANNUAL_REVENUE_FIELD];

export default class AccountRecordViewer extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
    get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }
    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }
    get type() {
        return getFieldValue(this.account.data, TYPE_FIELD);
    }
    get annualRevenue() {
        return getFieldValue(this.account.data, ANNUAL_REVENUE_FIELD);
    }
}