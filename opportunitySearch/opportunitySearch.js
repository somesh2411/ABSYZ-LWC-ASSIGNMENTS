import { LightningElement } from 'lwc';
import getOpportunitiesByMinAmount from '@salesforce/apex/OpportunitySearchController.getOpportunitiesByMinAmount';

export default class OpportunitySearch extends LightningElement {
    enteredAmount;
    searchedAmount;
    opportunities;
    errorMessage;
    isLoading = false;
    hasSearched = false;
    handleAmountChange(event) {
        this.enteredAmount = event.target.value;
    }
    handleSearch() {
        if (!this.enteredAmount || this.enteredAmount < 0) {
            this.errorMessage = 'Please enter a valid positive amount.';
            this.opportunities = undefined;
            return;
        }
        this.errorMessage = undefined;
        this.isLoading = true;
        this.searchedAmount = this.enteredAmount;
        getOpportunitiesByMinAmount({ minAmount: parseFloat(this.enteredAmount) })
            .then((result) => {
                this.opportunities = result;
                this.hasSearched = true;
                this.errorMessage = undefined;
            })
            .catch((error) => {
                this.errorMessage = error.body ? error.body.message : 'Error fetching opportunities';
                this.opportunities = undefined;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
    get hasOpportunities() {
        return this.opportunities && this.opportunities.length > 0;
    }
    get showNoRecords() {
        return this.hasSearched && this.opportunities && this.opportunities.length === 0;
    }
    get isInitialState() {
        return !this.hasSearched && !this.errorMessage;
    }
}