//UI controller
var UIController = (function(){
    
    var domStrings = {
        addBtn:'.add__btn',
        Inputtype: '.add__type',
        Inputdescription: '.add__description',
        Inputvalue: '.add__value',
        expContainer:'.expenses__list',
        incContainer:'.income__list',
        budgetLabel: '.budget__value',
        budgetIncomeLabel: '.budget__income--value',
        budgetExpenseLabel: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        Container: '.container',
        itemsPercentages: '.item__percentage',
        dateLabel: '.budget__title--month'
        
        
    };
    
    var foramtNumber = function(num,type){
        var numSplit,int;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        if(int.length > 3){
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,int.length);
        }
        return (type === 'inc' ? '+' : '-') + int + '.' + dec;
    }
    //public methods
    return{
        //add item/obj to UI
        addListItem: function(type,obj){
            var element,html,newHtml;
            //get dummy html
            if(type==="inc"){
                element = domStrings.incContainer;//container
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else{
                element = domStrings.expContainer;
                html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace values 
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%des%',obj.description);
            newHtml = newHtml.replace('%val%',foramtNumber(obj.value,type));
            //insert newHtm to container
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        
        deleteItemFormUI: function(id){
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
        },
        
        getInputs: function(){
            return{
                type: document.querySelector(domStrings.Inputtype).value,//either inc or exp,
                description: document.querySelector(domStrings.Inputdescription).value,
                value: parseFloat(document.querySelector(domStrings.Inputvalue).value)
            }
        },
        
        getDomStrings: function(){
            return domStrings;
        },
        
        clearInputs:function(){
            //can also use querySelectorAll which return list..
            //slice list as Array.prototype.slice.call(list).
            //then change value to '' by calling loop e.g. foreache(curnt,i,arr)
            document.querySelector(domStrings.Inputdescription).value = '';
            document.querySelector(domStrings.Inputvalue).value = '';
        },
        
        displayBudget: function(obj){
//            console.log(obj);
            if(obj.budget > 0){
                type = 'inc';
            }else { type = 'exp';}
            document.querySelector(domStrings.budgetLabel).textContent = foramtNumber(obj.budget,type);
            document.querySelector(domStrings.budgetIncomeLabel).textContent = obj.totalInc;
            document.querySelector(domStrings.budgetExpenseLabel).textContent = obj.totalExp;
            if(obj.percentage > 0 && obj.percentage < 100){
                document.querySelector(domStrings.percentage).textContent = obj.percentage+'%';    
            }else{
                document.querySelector(domStrings.percentage).textContent = '--'
            }
            
        },
        
        displayPercentages: function(percentages){
            var elements = document.querySelectorAll(domStrings.itemsPercentages);
            console.log(elements);
            //iterating over nodlist
            Array.prototype.forEach.call(elements,function(curr,index){
                if(percentages[index] > 0){
                    curr.textContent = percentages[index] + '%';
                }else{
                    curr.textContent = '--';
                }
                
            });
        },
        
        displayData : function(){
            var now, month, months, year;
            now = new Date();
            month = now.getMonth(); //return the index of the current month
            year = now.getFullYear();
            months = ['January','February','March','April','May','June','Julu','August','September','October','November','December'];
            document.querySelector(domStrings.dateLabel).textContent = months[month] +' ' + year;
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
        this.percentage = -1;
    }
    //data object to store exp and inc
    Expenses.prototype.calcPercentage = function(totalIcm){
        if(data.totals.inc > 0){
            this.percentage = Math.round((this.value/totalIcm)*100);
        }else{
            this.percentage = -1;
        } 
    };
    Expenses.prototype.getPercentage = function(){
        return this.percentage;
    };
    var data = {
        totalItems:{
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }
    
    var calculateTotals = function(type){
         var sum = 0;
            var item = data.totalItems[type];
            item.forEach(function(current){
                sum += current.value;
            });
            data.totals[type] = sum;
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
        
        deletItemfromdata: function(type,id){
            var idsArray,index
            idsArray = data.totalItems[type].map(function(current){
                return current.id;
            }); 
            index = idsArray.indexOf(id);
            console.log(index);
            if(index !== -1){
                data.totalItems[type].splice(index,1);
            }
        },
        
        calculatePercentage: function(){
            data.totalItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages: function(){
            var percentages = data.totalItems.exp.map(function(curr){
                return curr.getPercentage();
            });
//            console.log(percentages);
            return percentages;
            
        },
        
        testing: function(){
            console.log(data);
        },
        calculateBudget: function(type){
            calculateTotals('inc');
            calculateTotals('exp');
            data.budget = data.totals.inc - data.totals.exp;
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
//                console.log()
            }else{
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }

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
        if(inputs.description !== '' && !isNaN(inputs.value) && inputs.value > 0){
            newItem = budgetCtrl.addItem(inputs.type,inputs.description,inputs.value);//2
//          console.log(newItem);//output the newTiem object
            uiCtrl.addListItem(inputs.type,newItem);//3
            uiCtrl.clearInputs();   //4
            updateBudget();     //5
            updatePercentage();
        }
        
    }
    
    var updateBudget = function(){
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
//        console.log(budget);
        uiCtrl.displayBudget(budget);
    }
    
    var updatePercentage = function(){
        budgetCtrl.calculatePercentage();
        var percentages = budgetCtrl.getPercentages();
//        console.log(percentages);
        uiCtrl.displayPercentages(percentages);
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
        document.querySelector(strings.Container).addEventListener('click',deleteItem);
    }
    
    var deleteItem = function(event){
        
        targetID = event.target.parentNode.parentNode.parentNode.parentNode.id;
//        console.log(targetID);
        if(targetID){
            splitID = targetID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]); 
//            console.log(splitID);
            budgetCtrl.deletItemfromdata(type,id);
            uiCtrl.deleteItemFormUI(targetID); // target id as inc-% or exp-%
            updateBudget();
            updatePercentage();
        }
        
    }
    //public methods
    return{
        init: function(){
            console.log('start budgetign \'Khatam_Shudd\'')
            uiCtrl.displayData();
            uiCtrl.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: '--'
        });
        setUpEventListener();
        },
    }
    
})(BudgetController,UIController);


Controller.init();