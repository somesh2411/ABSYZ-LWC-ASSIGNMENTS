import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountMgmtController.getAccounts';
import deleteAccounts from '@salesforce/apex/AccountMgmtController.deleteAccounts';

export default class AccountManagementTable extends NavigationMixin(LightningElement) {
    @track accounts = [];
    @track selectedRows = [];
    isLoading = false;
    searchTerm = '';
    sortBy = 'Name';
    sortDirection = 'asc';
    hasLoaded = false;

    columns = [
        { label: 'Account Name', fieldName: 'Name', sortable: true },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Type', fieldName: 'Type' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', sortable: true },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'View', name: 'view' },
                    { label: 'Edit', name: 'edit' },
                    { label: 'Delete', name: 'delete' }
                ]
            }
        }
    ];

    connectedCallback() {
        this.loadAccounts();
    }

    async loadAccounts() {
        this.isLoading = true;
        try {
            const result = await getAccounts({ searchTerm: this.searchTerm });
            this.accounts = result || [];
            this.hasLoaded = true;
        } catch (e) {
            this.showToast('Error', (e && e.body && e.body.message) || 'Failed to load accounts.', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        this.loadAccounts();
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.sortBy = fieldName;
        this.sortDirection = sortDirection;
        this.sortData(fieldName, sortDirection);
    }

    sortData(fieldName, direction) {
        const isAsc = direction === 'asc';
        this.accounts = [...this.accounts].sort((a, b) => {
            const aVal = a[fieldName] == null ? '' : a[fieldName];
            const bVal = b[fieldName] == null ? '' : b[fieldName];
            if (aVal < bVal) return isAsc ? -1 : 1;
            if (aVal > bVal) return isAsc ? 1 : -1;
            return 0;
        });
    }

    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows.map((r) => r.Id);
    }

    get selectedCount() {
        return this.selectedRows.length;
    }

    get hasSelection() {
        return this.selectedCount > 0;
    }

    get noRecords() {
        return this.hasLoaded && (!this.accounts || this.accounts.length === 0);
    }

    async handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'view') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: { recordId: row.Id, objectApiName: 'Account', actionName: 'view' }
            });
        } else if (actionName === 'edit') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: { recordId: row.Id, objectApiName: 'Account', actionName: 'edit' }
            });
        } else if (actionName === 'delete') {
            if (!window.confirm('Delete this Account?')) return;
            await this.deleteIds([row.Id]);
        }
    }

    async handleDeleteSelected() {
        if (!this.hasSelection) {
            this.showToast('Info', 'Select at least one record to delete.', 'info');
            return;
        }
        if (!window.confirm(`Delete ${this.selectedCount} selected Account(s)?`)) return;
        await this.deleteIds(this.selectedRows);
    }

    async deleteIds(ids) {
        this.isLoading = true;
        try {
            await deleteAccounts({ accountIds: ids });
            this.showToast('Success', 'Account(s) deleted successfully.', 'success');
            this.selectedRows = [];
            await this.loadAccounts();
        } catch (e) {
            this.showToast('Error', (e && e.body && e.body.message) || 'Failed to delete.', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
