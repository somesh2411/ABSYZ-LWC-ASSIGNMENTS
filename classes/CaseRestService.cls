@RestResource(urlMapping='/CaseService/*')
global with sharing class CaseRestService {

    @HttpGet
    global static List<Case> getCasesBySubject() {
        String subject = RestContext.request.params.get('subject');
        String likeTerm = '%' + (subject == null ? '' : subject) + '%';
        return [
            SELECT Id, CaseNumber, Subject, Origin, Description, Status, CreatedDate
            FROM Case
            WHERE Subject LIKE :likeTerm
            WITH USER_MODE
        ];
    }

    @HttpDelete
    global static String deleteCasesBySubject() {
        String subject = RestContext.request.params.get('subject');
        String likeTerm = '%' + (subject == null ? '' : subject) + '%';
        List<Case> toDelete = [
            SELECT Id FROM Case
            WHERE Subject LIKE :likeTerm
            WITH USER_MODE
        ];
        if (toDelete.isEmpty()) {
            return 'No matching cases found.';
        }
        delete toDelete;
        return 'Deleted ' + toDelete.size() + ' case(s).';
    }

    @HttpPost
    global static Case createCase() {
        String body = RestContext.request.requestBody.toString();
        Map<String, Object> payload = (Map<String, Object>) JSON.deserializeUntyped(body);

        Case c = new Case();
        c.Subject = (String) payload.get('Subject');
        c.Origin = (String) payload.get('Origin');
        c.Description = (String) payload.get('Description');

        insert c;
        return [
            SELECT Id, CaseNumber, Subject, Origin, Description, Status, CreatedDate
            FROM Case
            WHERE Id = :c.Id
            WITH USER_MODE
            LIMIT 1
        ];
    }
}
