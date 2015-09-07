namespace.module('com.freemedforms.pmh.pregnancy', function (exports, require) {

    exports.extend({
        'setupUi': setupUi,
        'hideCesareanReason': hideCesareanReason,
        'hideFetusGroupBox': hideFetusGroupBox
    });

    var fetusNumber, fetusGroup1, fetusGroup2, fetusGroup3, fetusGroup4, fetusGroup5, fetusGroup6;

    var f1DeliveryModeItem, f1DeliveryModeUi, f1CesareanGroup;                  
    var f2DeliveryModeItem, f2DeliveryModeUi, f2CesareanGroup;                  
    var f3DeliveryModeItem, f3DeliveryModeUi, f3CesareanGroup;                  
    var f4DeliveryModeItem, f4DeliveryModeUi, f4CesareanGroup;                  
    var f5DeliveryModeItem, f5DeliveryModeUi, f5CesareanGroup;                  
    var f6DeliveryModeItem, f6DeliveryModeUi, f6CesareanGroup;

    function setupUi() {

        print("com.freemedforms.pmh.pregnancy Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var formItem = freemedforms.forms.item("Maternity::Pmh::Pregnancy");   
        print(formItem);                                                        
        formUi = formItem.ui();

        // fetus                                                 
        fetusNumber = formUi.findChild("fetusNumberSpinBox");                                      
        fetusGroup1 = formUi.findChild("fetus1GroupBox"); 
        fetusGroup2 = formUi.findChild("fetus2GroupBox");
        fetusGroup3 = formUi.findChild("fetus3GroupBox");                                   
        fetusGroup4 = formUi.findChild("fetus4GroupBox");
        fetusGroup5 = formUi.findChild("fetus5GroupBox");
        fetusGroup6 = formUi.findChild("fetus6GroupBox");
        defaultHideFetusGroupBox();

        f1CesareanGroup = formUi.findChild("f1CesareanSectionReasonGroupBox");  
        f1DeliveryModeItem = freemedforms.forms.item("F1::Delivery::procedure::uniquelist");
        f1DeliveryModeUi = formUi.findChild("f1ModeOfDeliveryListView");        
                                                                                
        f2CesareanGroup = formUi.findChild("f2CesareanSectionReasonGroupBox");  
        f2DeliveryModeItem = freemedforms.forms.item("F2::Delivery::procedure::uniquelist");
        f2DeliveryModeUi = formUi.findChild("f2ModeOfDeliveryListView");        
                                                                                
        f3CesareanGroup = formUi.findChild("f3CesareanSectionReasonGroupBox");  
        f3DeliveryModeItem = freemedforms.forms.item("F3::Delivery::procedure::uniquelist");
        f3DeliveryModeUi = formUi.findChild("f3ModeOfDeliveryListView");        
                                                                                
        f4CesareanGroup = formUi.findChild("f4CesareanSectionReasonGroupBox");  
        f4DeliveryModeItem = freemedforms.forms.item("F4::Delivery::procedure::uniquelist");
        f4DeliveryModeUi = formUi.findChild("f4ModeOfDeliveryListView");        
                                                                                
        f5CesareanGroup = formUi.findChild("f5CesareanSectionReasonGroupBox");  
        f5DeliveryModeItem = freemedforms.forms.item("F5::Delivery::procedure::uniquelist");
        f5DeliveryModeUi = formUi.findChild("f5ModeOfDeliveryListView");        
                                                                                
        f6CesareanGroup = formUi.findChild("f6CesareanSectionReasonGroupBox");  
        f6DeliveryModeItem = freemedforms.forms.item("F6::Delivery::procedure::uniquelist");
        f6DeliveryModeUi = formUi.findChild("f6ModeOfDeliveryListView");



        // fetus connection
        fetusNumber['valueChanged(int)'].connect(this, hideFetusGroupBox);

        
    }
    
    // fetus functions

    function defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = false;                                        
            fetusGroup3.visible = false;                                        
            fetusGroup4.visible = false;                                        
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;                                        
        }

    function hideFetusGroupBox() {
            print("fetusNumber = " + fetusNumber.value);
        if (fetusNumber.value == 0) {
            print("if = 0");
            fetusGroup1.visible = false;
            fetusGroup2.visible = false;
            fetusGroup3.visible = false;
            fetusGroup4.visible = false;                                        
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;
        }
        else if (fetusNumber.value == 1) {
            print("if = 1");
            fetusGroup1.visible = true;                                      
            fetusGroup2.visible = false;                                      
            fetusGroup3.visible = false;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;
        }
        else if (fetusNumber.value == 2) {
            print("if = 2");                                                
            fetusGroup1.visible = true;                                       
            fetusGroup2.visible = true;                                   
            fetusGroup3.visible = false;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;                                      
        }  
        else if (fetusNumber.value == 3) {
            print("if = 3");                                                
            fetusGroup1.visible = true;                                       
            fetusGroup2.visible = true;                                      
            fetusGroup3.visible = true;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;                                     
        }
        else if (fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = true;                                         
            fetusGroup3.visible = true;
            fetusGroup4.visible = true;
            fetusGroup5.visible = false;
            fetusGroup6.visible = false;                                         
        }
        else if (fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = true;                                         
            fetusGroup3.visible = true;                                         
            fetusGroup4.visible = true;                                         
            fetusGroup5.visible = true;
            fetusGroup6.visible = false;                                        
        }
        else if (fetusNumber.value == 6) {                                      
            print("if = 6");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = true;                                         
            fetusGroup3.visible = true;                                         
            fetusGroup4.visible = true;                                         
            fetusGroup5.visible = true;                                         
            fetusGroup6.visible = true;                                         
        } 
        else {
            print("not coded yet sorry");
        }
    }

    function hideCesareanReason() {                                           
                                                                                
        print("function f1HideCesareanReason()");                               
        print("f1DeliveryModeItem.currentValue :" + f1DeliveryModeItem.currentValue);
                                                                                
        var electiveCesareanFr = "Césarienne programmée";                       
        var emergencyCesareanFr = "Césarienne en urgence";                      
        var emergencyCesareanXx = "Delivery by emergency cesarean section";     
        var electiveCesareanXx = "Elective cesarean section";                   
        if (f1DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f1DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f1DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f1DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f1CesareanGroup.visible = true;                                     
            f1CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f1CesareanGroup.visible = false;                                    
            f1CesareanGroup.checked = false;                                    
        }
        if (f2DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f2DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f2DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f2DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f2CesareanGroup.visible = true;                                     
            f2CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f2CesareanGroup.visible = false;                                    
            f2CesareanGroup.checked = false;                                    
        }                                                                       
        if (f3DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f3DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f3DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f3DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f3CesareanGroup.visible = true;                                     
            f3CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f3CesareanGroup.visible = false;                                    
            f3CesareanGroup.checked = false;                                    
        }
        if (f4DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f4DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f4DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f4DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f4CesareanGroup.visible = true;                                     
            f4CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f4CesareanGroup.visible = false;                                    
            f4CesareanGroup.checked = false;                                    
        }
        if (f5DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f5DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f5DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f5DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f5CesareanGroup.visible = true;                                     
            f5CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f5CesareanGroup.visible = false;                                    
            f5CesareanGroup.checked = false;                                    
        }    
        if (f6DeliveryModeItem.currentValue == emergencyCesareanFr ||           
            f6DeliveryModeItem.currentValue == emergencyCesareanXx ||           
            f6DeliveryModeItem.currentValue == electiveCesareanFr ||            
            f6DeliveryModeItem.currentValue == electiveCesareanXx) {            
            print("Inside of if");                                              
            f6CesareanGroup.visible = true;                                     
            f6CesareanGroup.checked = true;                                     
        }                                                                       
        else {                                                                  
            f6CesareanGroup.visible = false;                                    
            f6CesareanGroup.checked = false;                                    
        }                                                                        
    }

    

});

namespace.com.freemedforms.pmh.pregnancy.setupUi();
