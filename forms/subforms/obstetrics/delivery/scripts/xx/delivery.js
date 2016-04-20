namespace.module('com.freemedforms.obstetrics.delivery', function (exports, require) {

    exports.extend({
        'delivery_setupUi': delivery_setupUi,
        //'delivery_hideFetusGroupBox': delivery_hideFetusGroupBox,
        'delivery_entryModeReferredCheckBox' : delivery_entryModeReferredCheckBox,
        'delivery_entryModeSpontaneousCheckBox' : delivery_entryModeSpontaneousCheckBox,
        'delivery_followedInThisInstitutionCheckBox' : delivery_followedInThisInstitutionCheckBox,
        'delivery_notFollowedInThisInstitutionCheckBox' : delivery_notFollowedInThisInstitutionCheckBox,
        'delivery_healthcareProfessionalGroupBox' : delivery_healthcareProfessionalGroupBox,
        'delivery_onReferralGroupBoxToggled' : delivery_onReferralGroupBoxToggled,
        'delivery_onSelfReferralGroupBoxToggled' : delivery_onSelfReferralGroupBoxToggled
    });

//    var delivery_fetusNumber, delivery_fetusGroup1, delivery_fetusGroup2, delivery_fetusGroup3, delivery_fetusGroup4, delivery_fetusGroup5, delivery_fetusGroup6;

    var delivery_entryModeReferredCheckBox, delivery_referralGroupBox, delivery_entryModeSpontaneousCheckBox;
    var delivery_selfReferralGroupBox, delivery_followedInThisInstitutionCheckBox, delivery_notFollowedInThisInstitutionCheckBox;
    var delivery_pregnancyFollowUpGroupBox;
    var delivery_healthcareProfessionalGroupBoxWidget, delivery_healthcareProfessionalGroupBoxItem;
    var delivery_deliveryModeUniquelistItem;

    function delivery_setupUi() {

        print("com.freemedforms.obstetrics.delivery Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var delivery_formItem = freemedforms.forms.item("Maternity::Obstetrics::Delivery");   
        print(delivery_formItem);                                                        
        delivery_formUi = delivery_formItem.ui();

        // fetus                                                 
        delivery_fetusNumber = delivery_formUi.findChild("fetusNumberSpinBox");
        delivery_fetusGroup1 = delivery_formUi.findChild("fetus1GroupBox");
        delivery_fetusGroup2 = delivery_formUi.findChild("fetus2GroupBox");
        delivery_fetusGroup3 = delivery_formUi.findChild("fetus3GroupBox");
        delivery_fetusGroup4 = delivery_formUi.findChild("fetus4GroupBox");
        delivery_fetusGroup5 = delivery_formUi.findChild("fetus5GroupBox");
        delivery_fetusGroup6 = delivery_formUi.findChild("fetus6GroupBox");
        delivery_defaultHideFetusGroupBox();

        // entryMode
        delivery_entryModeReferredCheckBox = delivery_formUi.findChild("entryModeReferredCheckBox");
        delivery_entryModeSpontaneousCheckBox = delivery_formUi.findChild("entryModeSpontaneousCheckBox");
        delivery_referralGroupBox = delivery_formUi.findChild("referralGroupBox");


        delivery_selfReferralGroupBox = delivery_formUi.findChild("selfReferralGroupBox");
        delivery_followedInThisInstitutionCheckBox = delivery_formUi.findChild("followedInThisInstitutionCheckBox");
        delivery_notFollowedInThisInstitutionCheckBox = delivery_formUi.findChild("notFollowedInThisInstitutionCheckBox");

        delivery_pregnancyFollowUpGroupBox = delivery_formUi.findChild("pregnancyFollowUpGroupBox");

        delivery_healthcareProfessionalGroupBoxWidget = delivery_formUi.findChild("healthcareProfessionalGroupBox");
        delivery_healthcareProfessionalGroupBoxItem = freemedforms.forms.item("Maternity::Obstetrics::Delivery::Delivery::Healthcare::Professional::Group");   
        delivery_deliveryModeUniquelistItem = freemedforms.forms.item("Maternity::Obstetrics::Delivery::Delivery::Mode::Uniquelist");
        // fetus connection
        delivery_fetusNumber['valueChanged(int)'].connect(this, delivery_hideFetusGroupBox);
        print("************************************ Inside delivery_setupUi()");
    }
    
    // fetus functions

    function delivery_entryModeReferredCheckBox() {
        print("Inside delivery_entryModeReferredCheckBox()");
        if (delivery_entryModeReferredCheckBox.checked == true) {
            delivery_referralGroupBox.checked = true;
            delivery_selfReferralGroupBox.checked = false;
            delivery_entryModeSpontaneousCheckBox.checked = false;
            delivery_pregnancyFollowUpGroupBox.checked = false;
        }
        else {
            delivery_entryModeSpontaneousCheckBox.checked = true;
            delivery_referralGroupBox.checked = false;
            delivery_selfReferralGroupBox.checked = true;
            delivery_pregnancyFollowUpGroupBox.checked = false;
        }
    }

    function delivery_entryModeSpontaneousCheckBox() {                             
        print("Inside delivery_entryModeSpontaneousCheckBox()");                    
        if (delivery_entryModeSpontaneousCheckBox.checked == true) {               
            delivery_referralGroupBox.checked = false;
            delivery_selfReferralGroupBox.checked = true;
            delivery_pregnancyFollowUpGroupBox.checked = false;
            delivery_entryModeReferredCheckBox.checked = false;                           
        } else {                                                                  
            //delivery_referralGroupBox.visible = true;
            delivery_referralGroupBox.checked = true;
            delivery_selfReferralGroupBox.checked = false;
            delivery_entryModeReferredCheckBox.checked = true;
            delivery_pregnancyFollowUpGroupBox.checked = false;                          
        }                                                                       
    }

    function delivery_followedInThisInstitutionCheckBox() {
        if (delivery_followedInThisInstitutionCheckBox.checked == true) {
            delivery_pregnancyFollowUpGroupBox.checked = false;
            delivery_notFollowedInThisInstitutionCheckBox.checked = false;
        } else if (delivery_followedInThisInstitutionCheckBox.checked == false) {
            delivery_notFollowedInThisInstitutionCheckBox = true;
            delivery_pregnancyFollowUpGroupBox.checked = true;
        }
    }

    function delivery_notFollowedInThisInstitutionCheckBox() {                     
        if (delivery_notFollowedInThisInstitutionCheckBox.checked == true) {       
            delivery_pregnancyFollowUpGroupBox.checked = true;                 
            delivery_followedInThisInstitutionCheckBox.checked = false;              
        } else if (delivery_notFollowedInThisInstitutionCheckBox.checked == false) {                                                              
            delivery_pregnancyFollowUpGroupBox.checked = false;                  
            delivery_followedInThisInstitutionCheckBox.checked = true;               
        }  
    }

    function delivery_healthcareProfessionalGroupBox() {
        var test1 = delivery_healthcareProfessionalGroupBoxItem.isVisible;
        var test2 = delivery_healthcareProfessionalGroupBoxItem.visible == false;
        var test3 = delivery_healthcareProfessionalGroupBoxItem.visible == true;
        print ("delivery_healthcareProfessionalGroupBoxItem.isVisible");
        print (test1);
        print ("delivery_healthcareProfessionalGroupBoxItem.visible == false");
        print (test2);
        print ("delivery_healthcareProfessionalGroupBoxItem.visible == true"); 
        print (test3);  
        var test4 = delivery_healthcareProfessionalGroupBoxWidget.isVisible;      
        var test5 = delivery_healthcareProfessionalGroupBoxWidget.visible == false;
        var test6 = delivery_healthcareProfessionalGroupBoxWidget.visible == true;
        print ("delivery_healthcareProfessionalGroupBoxWidget.isVisible");
        print (test4);
        print ("delivery_healthcareProfessionalGroupBoxWidget.visible == false");      
        print (test5);
        print ("delivery_healthcareProfessionalGroupBoxWidget.visible == true");
        print (test6);
        print (delivery_deliveryModeUniquelistItem.currentText);
        if (delivery_deliveryModeUniquelistItem.currentUuid == "Delivery normal" ||
            delivery_deliveryModeUniquelistItem.currentUuid == "Instrumental delivery" ||
            delivery_deliveryModeUniquelistItem.currentUuid == "Not done") {    
                delivery_healthcareProfessionalGroupBoxWidget.visible = false;
        }

        if (delivery_deliveryModeUniquelistItem.currentUuid == "Delivery by emergency cesarean section" ||
            delivery_deliveryModeUniquelistItem.currentUuid == "Elective cesarean section") {
                delivery_healthcareProfessionalGroupBoxWidget.visible = true;
        }
    var user = freemedforms.user
    print("user.usualName");
    print(user.usualName);

    }

    function delivery_onReferralGroupBoxToggled() {

        //if ((delivery_referralGroupBox.checked == false) &&
        //    (delivery_selfReferralGroupBox.checked == false)) {
        //    print("return");
        //    return;
        //}

        print("Referral");
         if (delivery_referralGroupBox.checked == true) {               
            delivery_selfReferralGroupBox.checked = false;                      
            delivery_pregnancyFollowUpGroupBox.checked = false;                 
        }                                                                       
        else {                                                                  
            delivery_selfReferralGroupBox.checked = true;                       
            delivery_pregnancyFollowUpGroupBox.checked = false;                 
        }
    }

    function delivery_onSelfReferralGroupBoxToggled() {

        //if ((delivery_referralGroupBox.checked == false) &&                     
        //    (delivery_selfReferralGroupBox.checked == false )) {                 
        //    print("return");                                                    
        //    return;
        //}     
                                                                                
        print("selfReferral");                                                  
         if (delivery_selfReferralGroupBox.checked == true) {                       
            delivery_referralGroupBox.checked = false;                      
            delivery_pregnancyFollowUpGroupBox.checked = false;                 
        }                                                                       
        else {                                                                  
            delivery_referralGroupBox.checked = true;                       
            delivery_pregnancyFollowUpGroupBox.checked = false;                 
        }                                                                       
    }

    function delivery_defaultHideFetusGroupBox() {
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = false;                                        
            delivery_fetusGroup3.visible = false;                                        
            delivery_fetusGroup4.visible = false;                                        
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                        
        }

    function delivery_hideFetusGroupBox() {
        if (delivery_fetusNumber.value == 0) {
            delivery_fetusGroup1.visible = false;
            delivery_fetusGroup2.visible = false;
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                        
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;
        }
        else if (delivery_fetusNumber.value == 1) {
            delivery_fetusGroup1.visible = true;                                      
            delivery_fetusGroup2.visible = false;                                      
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;
        }
        else if (delivery_fetusNumber.value == 2) {
            delivery_fetusGroup1.visible = true;                                       
            delivery_fetusGroup2.visible = true;                                   
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                      
        }  
        else if (delivery_fetusNumber.value == 3) {
            delivery_fetusGroup1.visible = true;                                       
            delivery_fetusGroup2.visible = true;                                      
            delivery_fetusGroup3.visible = true;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                     
        }
        else if (delivery_fetusNumber.value == 4) {                                      
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = true;                                         
            delivery_fetusGroup3.visible = true;
            delivery_fetusGroup4.visible = true;
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                         
        }
        else if (delivery_fetusNumber.value == 5) {                                      
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = true;                                         
            delivery_fetusGroup3.visible = true;                                         
            delivery_fetusGroup4.visible = true;                                         
            delivery_fetusGroup5.visible = true;
            delivery_fetusGroup6.visible = false;                                        
        }
        else if (delivery_fetusNumber.value == 6) {                             
            delivery_fetusGroup1.visible = true;                                
            delivery_fetusGroup2.visible = true;                                
            delivery_fetusGroup3.visible = true;                                
            delivery_fetusGroup4.visible = true;                                
            delivery_fetusGroup5.visible = true;                                
            delivery_fetusGroup6.visible = true;                               
        }
        else {
            print("not coded yet sorry");
        }
    }

});

namespace.com.freemedforms.obstetrics.delivery.delivery_setupUi();
