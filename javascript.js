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
    
    //add btn handler
    var ctrlAddBtn = function(){
        //get inputs
        uiCtrl.getInputs();
        console.log(uiCtrl.getInputs());       
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
    
    
    return{
        init: function(){
            setUpEventListener();
        },
    }
    
})(BudgetController,UIController);


Controller.init();