import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import BIRTHDATE_FIELD from '@salesforce/schema/Contact.Birthdate';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class CreateContactForm extends LightningElement {
    @api recordId; 

    firstName = '';
    lastName = '';
    email = '';
    birthdate = '';
    phone = '';

    errorMessage = '';
    isLoading = false;

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this[field.charAt(0).toLowerCase() + field.slice(1)] = event.target.value;
        this.errorMessage = '';
    }

    validateInputs() {
        if (!this.lastName || this.lastName.trim() === '') {
            this.errorMessage = 'Last Name cannot be empty.';
            return false;
        }
        if (!this.email || this.email.trim() === '') {
            this.errorMessage = 'Email cannot be empty.';
            return false;
        }
        const digitsOnly = this.phone ? this.phone.replace(/\D/g, '') : '';
        if (digitsOnly.length < 10) {
            this.errorMessage = 'Phone number must contain at least 10 digits.';
            return false;
        }
        return true;
    }

    handleSave() {
        this.errorMessage = '';
        if (!this.validateInputs()) {
            return;
        }
        this.isLoading = true;
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[BIRTHDATE_FIELD.fieldApiName] = this.birthdate || null;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId; 

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact has been created for this account',
                        variant: 'success'
                    })
                );
                this.resetForm();
            })
            .catch((error) => {
                this.errorMessage = error.body ? error.body.message : 'Error creating contact record.';
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.birthdate = '';
        this.phone = '';
        this.errorMessage = '';
    }
}