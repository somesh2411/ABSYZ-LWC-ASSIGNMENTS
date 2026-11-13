public with sharing class ContactFormController {

    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account WITH USER_MODE ORDER BY Name ASC LIMIT 200];
    }

    @AuraEnabled
    public static Contact createContact(Contact newContact) {
        try {
            insert as user newContact;
            return newContact;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}