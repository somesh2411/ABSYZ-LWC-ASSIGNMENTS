public with sharing class ContactSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContactsByName(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Contact>();
        }
        String key = '%' + searchKey.trim() + '%';
        return [
            SELECT Id, Name, Email, Phone, Title 
            FROM Contact 
            WHERE Name LIKE :key 
            ORDER BY Name ASC 
            LIMIT 20
        ];
    }
}