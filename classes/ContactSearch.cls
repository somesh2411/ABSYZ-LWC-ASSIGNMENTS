public with sharing class ContactSearch {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Contact>();
        }
        
        String key = '%' + searchKey.trim() + '%';
        return [SELECT Id, Name, Phone, Email FROM Contact WHERE Name LIKE :key WITH USER_MODE LIMIT 50 ];
    }
}