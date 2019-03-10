//UI controller
var UIController = (function(){
    
    
    
    return{
        
    }
})();


//BudgetController
var BudgetController = (function(){
    
    
    
    return{
        
    }
})();


//GlobalController
var Controller = (function(){
//    var addBtn = ".add__btn";
    
    //add btn handler
    var ctrlAddBtn = function(){
        console.log('add btn is clicked');
    }
    
    //add event listener
    document.querySelector('.add__btn').addEventListener('click',ctrlAddBtn);
    
    document.addEventListener('keypress',function(event){
        if(event.keyCode==13 || event.which==13){
            ctrlAddBtn();
        }
    });
    
    return{
        
    }
})();