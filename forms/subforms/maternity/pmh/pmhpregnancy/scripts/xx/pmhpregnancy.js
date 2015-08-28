namespace.module('com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy', function (exports, require) {
    exports.extend({                                                            
        'setupUi': setupUi,
        //'hidePregnancyNumber': hidePregnancyNumber,
        'hideCesareanReason': hideCesareanReason
    });

    //var sumWidget;
    var deliveryModeItem, deliveryModeUi, cesareanGroup;

    function setupUi() {                                                        
                                                                                
        print("com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var formItem = freemedforms.forms.item("Maternity::Obstetrics::PastMedicalHistory::Pregnancy");
        print(formItem);                                                        
        formUi = formItem.ui();
        //sumWidget = formUi.findChild("PregnancyNumberLineEdit");
        //sumItem = freemedforms.forms.item("PregnancyNumber");
        cesareanGroup = formUi.findChild("cesareanSectionReasonGroupBox");
        deliveryModeItem = freemedforms.forms.item("Delivery::procedure::uniquelist");
        deliveryModeUi = formUi.findChild("modeOfDeliveryListView");
        // connect hideCesareanReason
        deliveryModeUi['valueChanged(int)'].connect(this, hideCesareanReason);
        
        
    }


//    function hidePregnancyNumber() {
//
//        sumItem.enabled = false;
//        sumWidget.visible = false;   
//
//    }

    function hideCesareanReason() {
        print("function hideCesareanReason()");
        print("deliveryModeItem.currentValue :" + deliveryModeItem.currentValue);
        print("deliveryModeItem :" + deliveryModeItem);
        var electiveCesareanFr = "Césarienne programmée";
        var emergencyCesareanFr = "Césarienne en urgence";
        var emergencyCesareanXx = "Delivery by emergency cesarean section";
        var electiveCesareanXx = "Elective cesarean section";
        if (deliveryModeItem.currentValue == emergencyCesareanFr ||
            deliveryModeItem.currentValue == emergencyCesareanXx ||
            deliveryModeItem.currentValue == electiveCesareanFr ||
            deliveryModeItem.currentValue == electiveCesareanXx) {
            print("Inside of if");
            cesareanGroup.visible = true;
            cesareanGroup.checked = true;    
        }
        else {
            cesareanGroup.visible = false;
            cesareanGroup.checked = false;
        }

    }
});

namespace.com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy.setupUi();
//namespace.com.freemedforms.maternity.obstetrics.pastmedicalhistory.pregnancy.hidePregnancyNumber();
