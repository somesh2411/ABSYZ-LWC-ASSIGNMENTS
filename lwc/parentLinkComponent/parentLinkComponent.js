import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    selectedUrl = '';

    handleUrlSelect(event) {
        this.selectedUrl = event.detail;
    }
}