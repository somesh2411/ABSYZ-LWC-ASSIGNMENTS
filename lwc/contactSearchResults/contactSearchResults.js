import { LightningElement, api, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactSearch.searchContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class ContactSearchResults extends LightningElement {
    @api searchKeyword = '';
    columns = COLUMNS;

    @wire(searchContacts, { searchKey: '$searchKeyword' })
    contacts;

    get hasContacts() {
        return this.contacts && this.contacts.data && this.contacts.data.length > 0;
    }
}
