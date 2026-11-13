public with sharing class AccountMgmtController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchTerm) {
        String term = (searchTerm == null) ? '' : searchTerm.trim();
        if (String.isBlank(term)) {
            return [
                SELECT Id, Name, Phone, Industry, Type, AnnualRevenue
                FROM Account
                WITH USER_MODE
                ORDER BY Name
                LIMIT 200
            ];
        }
        String likeTerm = '%' + String.escapeSingleQuotes(term) + '%';
        return [
            SELECT Id, Name, Phone, Industry, Type, AnnualRevenue
            FROM Account
            WHERE Name LIKE :likeTerm
            WITH USER_MODE
            ORDER BY Name
            LIMIT 200
        ];
    }

    @AuraEnabled
    public static void deleteAccounts(List<Id> accountIds) {
        if (accountIds == null || accountIds.isEmpty()) {
            return;
        }
        List<Account> toDelete = [
            SELECT Id FROM Account
            WHERE Id IN :accountIds
            WITH USER_MODE
        ];
        delete toDelete;
    }
}
