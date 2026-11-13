public with sharing class AccountContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        if (accountId == null) {
            return new List<Contact>();
        }
        return [
            SELECT Id, Name, Title, Phone, Email, Owner.Name 
            FROM Contact 
            WHERE AccountId = :accountId
            WITH USER_MODE
            ORDER BY Name ASC
        ];
    }
}