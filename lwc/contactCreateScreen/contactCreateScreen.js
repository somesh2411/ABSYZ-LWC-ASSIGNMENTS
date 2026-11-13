import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreateScreen extends LightningElement {
    @api accountId; // Input from Flow
    @api createdContactId; // Output to Flow

    handleSuccess(event) {
        this.createdContactId = event.detail.id;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Record Created',
                message: `Contact Record is Created with record id: ${this.createdContactId}`,
                variant: 'success'
            })
        );

        this.dispatchEvent(new FlowNavigationNextEvent());
    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating Contact',
                message: event.detail.detail || 'Could not create Contact.',
                variant: 'error'
            })
        );
    }

    handleCancel() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field => field.reset());
        }
    }
}