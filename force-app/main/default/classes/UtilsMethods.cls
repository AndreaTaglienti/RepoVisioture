
public class UtilsMethods {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccount(){
        return [SELECT Name, Phone, Type, OwnerId FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllConsByAccId(Id accId){
        return [SELECT FirstName, LastName, Phone, OwnerId FROM Contact WHERE AccountId = :accId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAllOppsByAccId(Id accId){
        return [SELECT Name, StageName, CloseDate, Amount, OwnerId FROM Opportunity WHERE AccountId = :accId];
    }

    @AuraEnabled(cacheable=true)
    public static boolean insertAccount(String accName, String accPhone, String accType){
        return Database.insert(new Account(Name = accName, Phone = accPhone, Type = accType), false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean insertContact(String conFirstName, String conLastName, String conPhone){
       return  Database.insert(new Contact(FirstName = conFirstName, LastName = conLastName, Phone = conPhone), false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean insertOpportunity(String oppName, String oppStageName, Date oppCloseDate, Decimal oppAmount){
       return Database.insert(new Opportunity(Name = oppName, StageName = oppStageName, CloseDate = oppCloseDate, Amount = oppAmount), false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean updateAccount(Account acc){
        return Database.update(acc, false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean updateContact(Contact con){
        return Database.update(con, false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean updateOpportunity(Opportunity opp){
        return Database.update(opp, false).isSuccess();
    }

    @AuraEnabled(cacheable=true)
    public static boolean deletesOBject(Id myId){
       return Database.delete(myId, false).isSuccess();
    }
}