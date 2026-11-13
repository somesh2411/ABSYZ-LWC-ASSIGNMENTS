import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateContactRecord extends LightningElement {
    handleSuccess(event) {
        const contactId = event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: `Contact created successfully with Record ID: ${contactId}`,
                variant: 'success'
            })
        );
        this.handleReset();
    }
    handleError(event) {
        const errorMessage = event.detail.detail || event.detail.message || 'An error occurred while creating the record.';
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error Creating Record',
                message: errorMessage,
                variant: 'error',
                mode: 'sticky'
            })
        );
    }
    handleReset() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }
    }
}