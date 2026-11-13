import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLE_MC from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class Component2 extends LightningElement {
    receivedMessage = '';
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription && this.messageContext) {
            this.subscription = subscribe(
                this.messageContext,
                SAMPLE_MC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE } 
            );
        }
    }
    handleMessage(message) {
        this.receivedMessage = message ? message.messageToSend : '';
    }
    unsubscribeToMessageChannel() {
        if (this.subscription) {
            unsubscribe(this.subscription);
            this.subscription = null;
        }
    }
}