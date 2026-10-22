import { LightningElement, wire } from 'lwc';
import searchContactsByName from '@salesforce/apex/ContactSearchController.searchContactsByName';

export default class ContactSearch extends LightningElement {
    searchKey = '';
    contacts;
    error;

    @wire(searchContactsByName, { searchKey: '$searchKey' })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    handleSearchChange(event) {
        this.searchKey = event.target.value;
    }
    get hasContacts() {
        return this.contacts && this.contacts.length > 0;
    }
    get isSearchEmpty() {
        return !this.searchKey || this.searchKey.trim() === '';
    }

    get showNoResults() {
        return !this.isSearchEmpty && this.contacts && this.contacts.length === 0;
    }
}