import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_MC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Component1 extends LightningElement {
    inputValue = '';

    @wire(MessageContext)
    messageContext;

    handleInputChange(event) {
        this.inputValue = event.target.value;

        const payload = {
            messageToSend: this.inputValue
        };

        publish(this.messageContext, SAMPLE_MC, payload);
    }
}