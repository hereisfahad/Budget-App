//UI controller
var UIController = (function(){
    
    var domStrings = {
        addBtn:'.add__btn',
        Inputtype: '.add__type',
        Inputdescription: '.add__description',
        Inputvalue: '.add__value'
    };
    
    
    
    return{
        getInputs: function(){
            return{
                type: document.querySelector(domStrings.Inputtype).value,//either inc or exp,
                description: document.querySelector(domStrings.Inputdescription).value,
                value: document.querySelector(domStrings.Inputvalue).value
            }
        },
        getDomStrings: function(){
            return domStrings;
        }
    };
    
    
    
})();


//BudgetController
var BudgetController = (function(){
    
    
    
    return{
        
    }
})();



//GlobalController
var Controller = (function(bugetCtrl,uiCtrl){
    //get dom strings
   var strings = uiCtrl.getDomStrings();
    //add btn handler
    var ctrlAddBtn = function(){
        console.log('add btn is clicked');
        //get inputs
        uiCtrl.getInputs();
        console.log(uiCtrl.getInputs());
           
    }
    
    //add event listener
    document.querySelector(strings.addBtn).addEventListener('click',ctrlAddBtn);
    
    document.addEventListener('keypress',function(event){
        if(event.keyCode==13 || event.which==13){
            ctrlAddBtn();
        }
    });
    
    return{
        ctrlAddBtn: ctrlAddBtn
    }
})(BudgetController,UIController);


//Controller.ctrlAddBtn();