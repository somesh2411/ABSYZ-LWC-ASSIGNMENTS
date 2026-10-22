import { LightningElement } from 'lwc';

export default class CricketerList extends LightningElement {
    cricketers = [
        { id: 1, name: 'Virat Kohli' },
        { id: 2, name: 'Rohit Sharma' },
        { id: 3, name: 'MS Dhoni' },
        { id: 4, name: 'Jasprit Bumrah' },
        { id: 5, name: 'Ravindra Jadeja' },
        { id: 6, name: 'Sachin Tendulkar' }
    ];
}