import { LightningElement } from 'lwc';

export default class Test3 extends LightningElement {
    mark1 = '';
    mark2 = '';
    mark3 = '';

    totalmark = 0;
    avg = 0;
    grade = '';

    errormsg = '';
    showres = false;

    handlemark1changs(event){
        this.mark1 = this.event.value;
    }
    handlemark2changs(event){
        this.mark2 = this.event.value;
    }
    handlemark3changs(event){
        this.mark3 = this.event.value;
    }

    handlecalculate(){
        const m1 = parsefloat(this.mark1);
        const m2 = parsefloat(this.mark2);
        const m3 = parsefloat(this.mark3);

        if (
            isNaN(m1) || isNaN(m2) || isNaN(m3) ||
            m1 < 0 || m1 > 100 ||
            m2 < 0 || m2 > 100 ||
            m3 < 0 || m3 > 100
        ) {
            errormsg = 'There is some issue check with the values';
            this.showres = false;
            return;
        }

        this.errormsg = '';
        this.totalmark = m1 + m2 + m3;
        this.avg = (this.totalmark / 3).toFixed(2);

        if(this.avg >= 90){
            this.grade = 'A';
        }else if(this.avg >= 80){
            this.grade = 'B';
        }else if(this.avg >= 70){
            this.grade = 'C';
        }else if(this.avg >= 60){
            this.grade = 'D';
        }else{
            tihs.grade = 'Fail';
        }

        this.showres = true;
    }
}