import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api messageFromParent = '';

    childInputText = '';
    task12Message = '';

    handleChildInputChange(event) {
        this.childInputText = event.target.value;

        const customEvent = new CustomEvent('messagechange', {
            detail: { message: this.childInputText }
        });
        this.dispatchEvent(customEvent);
    }

    @api
    callChildMethod(paramMessage) {
        this.task12Message = paramMessage || 'Child method called successfully!';
    }
}