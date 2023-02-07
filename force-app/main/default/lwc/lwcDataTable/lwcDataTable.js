import { api, LightningElement ,track } from 'lwc';
import getAllAccount from "@salesforce/apex/UtilsMethods.getAllAccount";
import getAllOppsByAccId from "@salesforce/apex/UtilsMethods.getAllOppsByAccId";//SS
import getAllConsByAccId from "@salesforce/apex/UtilsMethods.getAllConsByAccId";//SS



const actions = [
    { label: 'edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
    { label: 'show Contacts', name: 'show_Contacts' },
    { label: 'show Opportunity', name: 'show_Opportunity' },
];

const columns = [
    { label: 'Name', fieldName: 'Name' , editable : true},
    
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable:true },
    { label: 'Type', fieldName: 'Type', type: 'type', editable:true },
    { label: 'OwnerId', fieldName: 'OwnerId', type: 'id'},
    {
        label:'Actions',
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

const columnsOpp = [
    { label: 'Name', fieldName: 'Name' ,type: 'String', editable : true},
    
    { label: 'stageName', fieldName: 'StageName', type: 'String', editable:true },
    { label: 'CloseDate', fieldName: 'CloseDate', type: 'date', editable:true },
    { label: 'Amount', fieldName :'Amount', type: 'decimal', editable:true},
    { label: 'OwnerId', fieldName: 'OwnerId', type: 'id' },
    {
        label:'Actions',
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

const columnsCon = [
    { label: 'FirstName', fieldName: 'FirstName' ,type: 'String', editable : true}, 
    { label: 'LastName', fieldName: 'LastName', type: 'String', editable:true },
    { label: 'Phone', fieldName: 'Phone', type: 'String', editable:true },
    { label: 'OwnerId', fieldName: 'OwnerId', type: 'id' },
    {
        label:'Actions',
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class DatatableWithRowActions extends LightningElement {

    ShowSecondPageOpp = false;
    ShowSecondPageCont = false;
    @track accList = [];
    @track oppList=[];
    @track conList=[];
    accountColumns = columns;
    oppColumns = columnsOpp;
    contColumns = columnsCon;
   

    @api
    getRecord() {
        this.data.forEach(element => {
            if (element.Id === this.recordId) {
                this.record = element;
            }
        });
    }
    
    
   
    

 



    connectedCallback(){
        this.loadAccountContext();
    }

    async loadAccountContext(){
        await this.getAccs();
    }
    async getAccs(){
        this.accList = await getAllAccount(); 
    }

    connectedCallbackOpp(){
        this.loadOpportunityContext();
    }

    async loadOpportunityContext(){
        await this.getOpps();
    }
    async getOpps(){
  
        this.oppList = await getAllOppsByAccId(this.accList[0].id);
       
    }

    connectedCallbackCon(){
        this.loadContactContext();
    }

    async loadContactContext(){
        await this.getCont();
    }
    async getCont(){
  
        this.conList = await getAllConsByAccId(this.accList[0].id);
        console.log('ciao');
               
    }

    
   
   

    handleRowAction(event) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        const selectedRows = event.detail.selectedRows;
        

        
        
        
        
        switch (actionName) {
            case 'delete':
                console.log(row.Id);
                
                
                this.deleteRow(row);
               
                break;
            case 'show_Opportunity':
                this.ShowSecondPageCont = false;
                this.ShowSecondPageOpp = true;
                this.getOpps(event);
                console.log(this.ShowSecondPageOpp);
                break;
            case 'show_Contacts':
                this.ShowSecondPageOpp=false;
                this.ShowSecondPageCont = true;
                this.getCont();
                console.log(this.ShowSecondPageCont);
                break;
            
            default:
        }
    }

    deleteRow(row) {
        
        const { id } = row;
        const index = this.findRowIndexById(id);
        //commento
        if (index !== -1) {
            this.accList = this.accList
                .slice(0, index)
                .concat(this.accList.slice(index + 1));
        }

        
    }

    findRowIndexById(id) {
        let ret = -1;
        this.accList.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    

   
}

    
