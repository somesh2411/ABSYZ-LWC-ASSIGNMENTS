import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

export default class CreateRecordUiRecordApi extends LightningElement {
    accountName = '';
    accountRating = '';

    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleRatingChange(event) {
        this.accountRating = event.target.value;
    }

    handleCreateAccount() {
        const inputFields = this.template.querySelectorAll('lightning-input');
        const isValid = [...inputFields].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if (!isValid) {
            return;
        }

        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[RATING_FIELD.fieldApiName] = this.accountRating;

        const recordInput = {
            apiName: ACCOUNT_OBJECT.objectApiName,
            fields: fields
        };

        createRecord(recordInput)
            .then((account) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: `Account created successfully with Id: ${account.id}`,
                        variant: 'success'
                    })
                );
                this.accountName = '';
                this.accountRating = '';
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body ? error.body.message : error.message,
                        variant: 'error'
                    })
                );
            });
    }
}