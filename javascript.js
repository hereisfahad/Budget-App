//UI controller
var UIController = (function(){
    
    var domStrings = {
        addBtn:'.add__btn',
        Inputtype: '.add__type',
        Inputdescription: '.add__description',
        Inputvalue: '.add__value',
        expContainer:'.expenses__list',
        incContainer:'.income__list'
    };
    
    
    //public methods
    return{
        //add item/obj to UI
        addListItem: function(type,obj){
            var element,html,newHtml;
            //get dummy html
            if(type==="exp"){
                element = domStrings.expContainer;//container
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else{
                element = domStrings.incContainer;
                html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace values 
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%des%',obj.description);
            newHtml = newHtml.replace('%val%',obj.value);
            //insert newHtm to container
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        
        getInputs: function(){
            return{
                type: document.querySelector(domStrings.Inputtype).value,//either inc or exp,
                description: document.querySelector(domStrings.Inputdescription).value,
                value: document.querySelector(domStrings.Inputvalue).value
            }
        },
        
        getDomStrings: function(){
            return domStrings;
        },
        
        clearInputs(){
            document.querySelector(domStrings.Inputdescription).value = '';
            document.querySelector(domStrings.Inputvalue).value = '';
        }
    };
    
    
    
})();


//BudgetController
var BudgetController = (function(){
    //income constructor
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    //expenses constructor
    var Expenses = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    //data object to store exp and inc
    var data = {
        totalItems:{
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    
    
    //public methods
    return{
        //public function to create and add exp or income to  data                
        addItem: function(type,des,val){
            var newItem,id;
            //initalize id
            if(data.totalItems[type].length>0){
                id = data.totalItems[type][data.totalItems[type].length-1].id+1;
            }else{
                id = 0;  
            }
            //create expense object
            if(type === "exp"){
                newItem = new Expenses(id,des,val)
            }else if(type === "inc"){//create income object
                newItem = new Income(id,des,val)
            }
            //push the newItem object in the respective array of data
            data.totalItems[type].push(newItem);
            return newItem;
        },

    }
})();



//GlobalController
var Controller = (function(budgetCtrl,uiCtrl){
    var inputs,newItem;
    //add btn handler
    var ctrlAddBtn = function(){
        //get inputs
        inputs = uiCtrl.getInputs();    //1
//        console.log(uiCtrl.getInputs());  //inputs from UI  
        newItem = budgetCtrl.addItem(inputs.type,inputs.description,inputs.value);//2
//        console.log(newItem);//output the newTiem object
        uiCtrl.addListItem(inputs.type,newItem);//3
        uiCtrl.clearInputs();   //4
    }
    
    var setUpEventListener = function(){
        //get dom strings
        var strings = uiCtrl.getDomStrings();
        //add event listener
        document.querySelector(strings.addBtn).addEventListener('click',ctrlAddBtn);
        document.addEventListener('keypress',function(event){
            if(event.keyCode==13 || event.which==13){
                ctrlAddBtn();
            }
        });
    }
    
    //public methods
    return{
        init: function(){
            setUpEventListener();
        },
    }
    
})(BudgetController,UIController);


Controller.init();