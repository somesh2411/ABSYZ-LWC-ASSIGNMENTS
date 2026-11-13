import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import STATUS_FIELD from '@salesforce/schema/Event_Project__c.Status__c';
import NAME_FIELD from '@salesforce/schema/Event_Project__c.Name';
import NUMBER_FIELD from '@salesforce/schema/Event_Project__c.Event_Project_Number__c';
import START_FIELD from '@salesforce/schema/Event_Project__c.Start_Date__c';
import END_FIELD from '@salesforce/schema/Event_Project__c.End_Date__c';

const FIELDS = [STATUS_FIELD, NAME_FIELD, NUMBER_FIELD, START_FIELD, END_FIELD];

const STATUS_PROGRESS = {
    'Planning': 25,
    'In Progress': 50,
    'On Hold': 50,
    'Completed': 100
};

const STATUSES = ['Planning', 'In Progress', 'On Hold', 'Completed'];

export default class EventProjectProgress extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;

    get status() { return getFieldValue(this.record.data, STATUS_FIELD); }
    get projectName() { return getFieldValue(this.record.data, NAME_FIELD); }
    get projectNumber() { return getFieldValue(this.record.data, NUMBER_FIELD); }
    get startDate() { return getFieldValue(this.record.data, START_FIELD); }
    get endDate() { return getFieldValue(this.record.data, END_FIELD); }
    get progress() { return STATUS_PROGRESS[this.status] || 0; }
    get statuses() { return STATUSES.map((s) => ({ label: s, value: s })); }

    get isPlanning() { return this.status === 'Planning'; }
    get isInProgress() { return this.status === 'In Progress'; }
    get isOnHold() { return this.status === 'On Hold'; }
    get isCompleted() { return this.status === 'Completed'; }

    get planningVariant() { return this.isPlanning ? 'brand' : 'neutral'; }
    get inProgressVariant() { return this.isInProgress ? 'brand' : 'neutral'; }
    get onHoldVariant() { return this.isOnHold ? 'brand' : 'neutral'; }
    get completedVariant() { return this.isCompleted ? 'brand' : 'neutral'; }

    async handleStatusChange(event) {
        const newStatus = event.currentTarget.dataset.status;
        if (newStatus === this.status) { return; }
        const fields = { Id: this.recordId };
        fields[STATUS_FIELD.fieldApiName] = newStatus;
        try {
            await updateRecord({ fields });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Status Updated',
                    message: `Status changed to ${newStatus}.`,
                    variant: 'success'
                })
            );
        } catch (error) {
            const message = (error && error.body && error.body.message) || 'Unable to update status.';
            this.dispatchEvent(
                new ShowToastEvent({ title: 'Update Failed', message, variant: 'error' })
            );
        }
    }
}
