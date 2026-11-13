public with sharing class EmployeeController {

    @AuraEnabled
    public static List<Employee__c> getEmployeesByDepartment(String dept) {

        return [
            SELECT Id, Name, Department__c, Salary__c
            FROM Employee__c
            WHERE Department__c = :dept
        ];
    }
}