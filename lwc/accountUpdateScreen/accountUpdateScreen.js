import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountUpdateScreen extends LightningElement {
    @api recordId; 

    handleSuccess() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Record Update',
                message: 'Account record is updated Successfully',
                variant: 'success'
            })
        );

        // Move to the next screen in the Flow
        this.dispatchEvent(new FlowNavigationNextEvent());
    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error updating Account',
                message: event.detail.detail || 'Could not update Account record.',
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