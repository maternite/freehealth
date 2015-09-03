namespace.module('com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy', function (exports, require) {
    exports.extend({                                                            
        'setupUi': setupUi,
        //'hidePregnancyNumber': hidePregnancyNumber,
        'hideFetusGroupBox': hideFetusGroupBox,
        'f1HideCesareanReason': f1HideCesareanReason,
        'f2HideCesareanReason': f2HideCesareanReason,
        'f3HideCesareanReason': f3HideCesareanReason,
        'f4HideCesareanReason': f4HideCesareanReason,
        'f5HideCesareanReason': f5HideCesareanReason,
        'f6HideCesareanReason': f6HideCesareanReason
    });

    //var sumWidget;
    var f1DeliveryModeItem, f1DeliveryModeUi, f1CesareanGroup;
    var f2DeliveryModeItem, f2DeliveryModeUi, f2CesareanGroup;
    var f3DeliveryModeItem, f3DeliveryModeUi, f3CesareanGroup;
    var f4DeliveryModeItem, f4DeliveryModeUi, f4CesareanGroup;
    var f5DeliveryModeItem, f5DeliveryModeUi, f5CesareanGroup;
    var f6DeliveryModeItem, f6DeliveryModeUi, f6CesareanGroup;
    
    //var groupboxes
    var fetusNumber, fetusGroup1, fetusGroup2, fetusGroup3, fetusGroup4,
        fetusGroup5, fetusGroup6;

    function setupUi() {                                                        
                                                                                
        print("com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var formItem = freemedforms.forms.item("Maternity::Obstetrics::PastMedicalHistory::Pregnancy");
        print(formItem);                                                        
        formUi = formItem.ui();
        //sumWidget = formUi.findChild("PregnancyNumberLineEdit");
        //sumItem = freemedforms.forms.item("PregnancyNumber");
        f1CesareanGroup = formUi.findChild("f1CesareanSectionReasonGroupBox");
        f1DeliveryModeItem = freemedforms.forms.item("F1::Delivery::procedure::uniquelist");
        f1DeliveryModeUi = formUi.findChild("f1ModeOfDeliveryListView");

        f2CesareanGroup = formUi.findChild("f2CesareanSectionReasonGroupBox");
        f2DeliveryModeItem = freemedforms.forms.item("F2::Delivery::procedure::uniquelist");
        f2DeliveryModeUi = formUi.findChild("f2ModeOfDeliveryListView");

        f3CesareanGroup = formUi.findChild("f3CesareanSectionReasonGroupBox");
        f3DeliveryModeItem = freemedforms.forms.item("F3::Delivery::procedure::uniquelist");
        f3DeliveryModeUi = formUi.findChild("f3ModeOfDeliveryListView");

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
        
        // hide fetus groups
        fetusNumber = formUi.findChild("fetusNumberSpinBox");                                  
        fetusGroup1 = formUi.findChild("fetus1GroupBox");                       
        fetusGroup2 = formUi.findChild("fetus2GroupBox");                       
        fetusGroup3 = formUi.findChild("fetus3GroupBox");                       
        fetusGroup4 = formUi.findChild("fetus4GroupBox");                       
        fetusGroup5 = formUi.findChild("fetus5GroupBox");
        fetusGroup6 = formUi.findChild("fetus6GroupBox");

        // connect hideCesareanReason
        //f1DeliveryModeUi['valueChanged(int)'].connect(this, f1HideCesareanReason);
        
        // connect fetusNumber
        // fetus connection                                                     
        fetusNumber['valueChanged(int)'].connect(this, hideFetusGroupBox);        
    }


//    function hidePregnancyNumber() {
//
//        sumItem.enabled = false;
//        sumWidget.visible = false;   
//
//    }

    function f1HideCesareanReason() {
        
        print("function f1HideCesareanReason()");
        print("f1DeliveryModeItem.currentValue :" + f1DeliveryModeItem.currentValue);
        print("f1DeliveryModeItem :" + f1DeliveryModeItem);

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

    }

    function f2HideCesareanReason() {
        print("function f2HideCesareanReason()");
        print("f2DeliveryModeItem.currentValue :" + f2DeliveryModeItem.currentValue);
        print("f2DeliveryModeItem :" + f2DeliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
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

    }

    function f3HideCesareanReason() {
        print("function f3HideCesareanReason()");
        print("f3DeliveryModeItem.currentValue :" + f3DeliveryModeItem.currentValue);
        print("f3DeliveryModeItem :" + f3DeliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
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

    }

    function f4HideCesareanReason() {
        print("function f4HideCesareanReason()");
        print("f4DeliveryModeItem.currentValue :" + f4DeliveryModeItem.currentValue);
        print("f4DeliveryModeItem :" + f4DeliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
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

    }

    function f5HideCesareanReason() {
        print("function f5HideCesareanReason()");
        print("f5DeliveryModeItem.currentValue :" + f5DeliveryModeItem.currentValue);
        print("f5DeliveryModeItem :" + f5DeliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
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

    }

    function f6HideCesareanReason() {
        print("function f6HideCesareanReason()");
        print("f6DeliveryModeItem.currentValue :" + f6DeliveryModeItem.currentValue);
        print("f6DeliveryModeItem :" + f6DeliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
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
});

namespace.com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy.setupUi();
//namespace.com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy.hidePregnancyNumber();
