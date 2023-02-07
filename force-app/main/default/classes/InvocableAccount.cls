public with sharing class InvocableAccount {


        @invocableMethod
        public static list<account> CreaAccountDaInput(list<String> accNames){

            list<account> accList = new list<account>();
        for (string s : accNames){
            account a = new account (name = s);
        }
        insert accList;
        return accList;
        }
        
    }
