import { LightningElement,api } from 'lwc';

export default class Pctest1 extends LightningElement {
    @api empName;
    @api dept;

    stdName = 'Som';
    stdId = 'STD001';

    handleselect(){
        const selectedId = {id : this.stdId,name : this.stdName};
        
        this.dispatchEvent(
            new CustomEvent('studentselect',{detail:selectedId})
        );
    }

    
}