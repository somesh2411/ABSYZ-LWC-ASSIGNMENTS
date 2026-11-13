import { LightningElement, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactSearch.searchContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class ContactSearchTable extends LightningElement {
    searchKey = '';
    columns = COLUMNS;

    @wire(searchContacts, { searchKey: '$searchKey' })
    contacts;

    handleSearchChange(event) {
        this.searchKey = event.target.value;
    }

    get firstContact() {
        if (this.contacts?.data && this.contacts.data.length > 0) {
            return this.contacts.data[0];
        }
        return null;
    }
}