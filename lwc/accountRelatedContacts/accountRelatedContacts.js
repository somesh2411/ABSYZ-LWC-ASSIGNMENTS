import { LightningElement, api, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountContactController.getRelatedContacts';

const COLUMNS = [
    { label: 'Contact Name', fieldName: 'Name', type: 'text' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Contact Owner', fieldName: 'OwnerName', type: 'text' }
];

export default class AccountRelatedContacts extends LightningElement {
    @api recordId;

    columns = COLUMNS;
    contacts;
    error;

    @wire(getRelatedContacts, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data.map((record) => ({
                ...record,
                OwnerName: record.Owner ? record.Owner.Name : ''
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}