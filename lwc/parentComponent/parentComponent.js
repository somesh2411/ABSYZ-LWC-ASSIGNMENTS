import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    parentText = '';

    messageFromChild = '';

    handleParentInputChange(event) {
        this.parentText = event.target.value;
    }

    handleMessageFromChild(event) {
        this.messageFromChild = event.detail.message;
    }

    handleCallChildMethod() {
        const childComp = this.template.querySelector('c-child-component');
        if (childComp) {
            childComp.callChildMethod('Triggered from Parent Button Click!');
        }
    }
}