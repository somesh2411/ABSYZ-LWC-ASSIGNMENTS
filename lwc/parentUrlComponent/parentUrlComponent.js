import { LightningElement } from 'lwc';

export default class ParentUrlComponent extends LightningElement {
    displayedUrl = 'https://absyz.com/'; 

    handleUrlSelect(event) {
        this.displayedUrl = event.detail;
    }
}