import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import CUSTOM_MC from '@salesforce/messageChannel/CustomMessageChannel__c';

export default class LmsSubscriber extends LightningElement {
    receivedMessage = 'No message received yet.';
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
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                CUSTOM_MC,
                (payload) => this.handleMessage(payload)
            );
        }
    }
    handleMessage(payload) {
        this.receivedMessage = payload.recordData;
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}