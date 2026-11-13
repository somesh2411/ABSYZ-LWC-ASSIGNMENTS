import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/ContactFormController.getAccounts';
import createContact from '@salesforce/apex/ContactFormController.createContact';

export default class CreateContactForm extends LightningElement {
    accountOptions = [];
    selectedAccountId = '';
    
    @track contactRecord = {
        LastName: '',
        Title: '',
        Email: '',
        Phone: '',
        AccountId: ''
    };

    isLoading = false;

    connectedCallback() {
        this.fetchAccountOptions();
    }

    fetchAccountOptions() {
        this.isLoading = true;
        getAccounts()
            .then((data) => {
                this.accountOptions = data.map((acc) => ({
                    label: acc.Name,
                    value: acc.Id
                }));
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to load accounts: ' + this.getErrorMessage(error), 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
        this.contactRecord.AccountId = this.selectedAccountId;
    }

    handleInputChange(event) {
        const field = event.target.name;
        this.contactRecord[field] = event.target.value;
    }

    handleSave() {
        // Validate inputs
        const allValid = [
            ...this.template.querySelectorAll('lightning-input, lightning-combobox')
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if (!allValid) {
            this.showToast('Error', 'Please fill all required fields correctly.', 'error');
            return;
        }

        this.isLoading = true;

        createContact({ newContact: this.contactRecord })
            .then(() => {
                this.showToast('Success', 'Contact created successfully!', 'success');
                this.resetForm();
            })
            .catch((error) => {
                this.showToast('Error', 'Error creating contact: ' + this.getErrorMessage(error), 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    resetForm() {
        this.contactRecord = {
            LastName: '',
            Title: '',
            Email: '',
            Phone: '',
            AccountId: ''
        };
        this.selectedAccountId = '';
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    getErrorMessage(error) {
        if (error && error.body && error.body.message) {
            return error.body.message;
        }
        return 'Unknown error';
    }
}