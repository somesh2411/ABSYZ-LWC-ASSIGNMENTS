import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountModalController.getAccounts';

export default class AccountListModal extends LightningElement {
    accounts;
    error;
    selectedAccount = {};
    isModalOpen = false;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    handleShowDetails(event) {
        const accountId = event.target.dataset.id;
        this.selectedAccount = this.accounts.find((acc) => acc.Id === accountId);
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedAccount = {};
    }
}