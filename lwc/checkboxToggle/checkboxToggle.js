import { LightningElement } from 'lwc';

export default class CheckboxToggle extends LightningElement {
    isChecked = true;

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
    }

    get statusMessage() {
        return this.isChecked ? 'Checkbox is checked' : 'Checkbox is not checked';
    }

    get statusStyleClass() {
        return this.isChecked ? 'status-text checked' : 'status-text unchecked';
    }
}