import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CUSTOM_MC from '@salesforce/messageChannel/CustomMessageChannel__c';

export default class LmsPublisher extends LightningElement {
    messageText = '';

    @wire(MessageContext)
    messageContext;

    handleInputChange(event) {
        this.messageText = event.target.value;
    }

    handlePublish() {
        const payload = {
            recordData: this.messageText
        };
        publish(this.messageContext, CUSTOM_MC, payload);
    }
}