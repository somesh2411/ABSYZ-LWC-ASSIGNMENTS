public with sharing class AccountModalController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, AccountNumber, Industry, Type, Phone
            FROM Account
            WITH USER_MODE
            ORDER BY Name ASC
            LIMIT 10
        ];
    }
}