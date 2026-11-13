import { LightningElement } from 'lwc';

export default class ChildUrlComponent extends LightningElement {
    handleClick(event) {
        const selectedUrl = event.target.dataset.url;

        // Dispatch a custom event to send the URL up to the parent
        const urlSelectEvent = new CustomEvent('selecturl', {
            detail: selectedUrl
        });
        this.dispatchEvent(urlSelectEvent);
    }
}