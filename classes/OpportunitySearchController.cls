public with sharing class OpportunitySearchController {
    @AuraEnabled
    public static List<Opportunity> getOpportunitiesByMinAmount(Decimal minAmount) {
        if (minAmount == null) {
            return new List<Opportunity>();
        }

        return [
            SELECT Id, Name, StageName, Amount, CloseDate
            FROM Opportunity
            WHERE Amount >= :minAmount
            ORDER BY Amount DESC
            LIMIT 50
        ];
    }
}