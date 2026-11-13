public with sharing class ContactListController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, Name 
            FROM Contact 
            WITH USER_MODE 
            ORDER BY CreatedDate DESC 
            LIMIT 10
        ];
    }
}