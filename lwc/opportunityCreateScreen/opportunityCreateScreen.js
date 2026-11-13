import { LightningElement, api } from 'lwc';
import { FlowNavigationFinishEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityCreateScreen extends LightningElement {
    @api accountId;
    handleSuccess(event) {
        const oppId = event.detail.id;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Record Created',
                message: `Opportunity Record is Created with record id: ${oppId}`,
                variant: 'success'
            })
        );

        this.dispatchEvent(new FlowNavigationFinishEvent());
    }
    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating Opportunity',
                message: event.detail.detail || 'Could not create Opportunity.',
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