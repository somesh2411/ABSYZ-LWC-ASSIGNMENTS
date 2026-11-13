import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class AccountKeywordInput extends LightningElement {
    @api searchKeyword = '';

    handleChange(event) {
        this.searchKeyword = event.target.value;
        this.dispatchEvent(new FlowAttributeChangeEvent('searchKeyword', this.searchKeyword));
    }
}
