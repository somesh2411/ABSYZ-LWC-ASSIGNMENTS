import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import STREET_FIELD from '@salesforce/schema/Account.BillingStreet';
import CITY_FIELD from '@salesforce/schema/Account.BillingCity';
import STATE_FIELD from '@salesforce/schema/Account.BillingState';
import POSTAL_FIELD from '@salesforce/schema/Account.BillingPostalCode';
import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

const FIELDS = [
    NAME_FIELD,
    PHONE_FIELD,
    TYPE_FIELD,
    INDUSTRY_FIELD,
    STREET_FIELD,
    CITY_FIELD,
    STATE_FIELD,
    POSTAL_FIELD,
    COUNTRY_FIELD,
    REVENUE_FIELD
];

export default class AccountCard extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;


    connectedCallback(){

        this.recordId
        console.log('Record:'+this.recordId);
    }

    
    get name() {
        return getFieldValue(this.account?.data, NAME_FIELD);
    }
    get phone() {
        return getFieldValue(this.account?.data, PHONE_FIELD);
    }
    get type() {
        return getFieldValue(this.account?.data, TYPE_FIELD);
    }
    get industry() {
        return getFieldValue(this.account?.data, INDUSTRY_FIELD);
    }
    get billingStreet() {
        return getFieldValue(this.account?.data, STREET_FIELD);
    }
    get billingCity() {
        return getFieldValue(this.account?.data, CITY_FIELD);
    }
    get billingState() {
        return getFieldValue(this.account?.data, STATE_FIELD);
    }
    get billingPostalCode() {
        return getFieldValue(this.account?.data, POSTAL_FIELD);
    }
    get billingCountry() {
        return getFieldValue(this.account?.data, COUNTRY_FIELD);
    }
    get annualRevenue() {
        return getFieldValue(this.account?.data, REVENUE_FIELD);
    }
}