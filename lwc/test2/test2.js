import { LightningElement } from 'lwc';

export default class Test2 extends LightningElement {
    username = '';

    handleinputchange(event){
        this.username = event.target.value;
    }

    handleclear(){
        this.username = '';
    }

    get greetingmessage() {
        return this.username.trim() ? `Hello, ${this.username}` : `Hello User`;
    }
}

