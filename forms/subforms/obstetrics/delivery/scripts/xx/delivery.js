namespace.module('com.freemedforms.obstetrics.delivery', function (exports, require) {

    exports.extend({
        'delivery_setupUi': delivery_setupUi,
        //'delivery_hideFetusGroupBox': delivery_hideFetusGroupBox,
        'delivery_entryModeReferredCheckBox' : delivery_entryModeReferredCheckBox,
        'delivery_entryModeSpontaneousCheckBox' : delivery_entryModeSpontaneousCheckBox,
        'delivery_followedInThisInstitutionCheckBox' : delivery_followedInThisInstitutionCheckBox,
        'delivery_notFollowedInThisInstitutionCheckBox' : delivery_notFollowedInThisInstitutionCheckBox
    });

//    var delivery_fetusNumber, delivery_fetusGroup1, delivery_fetusGroup2, delivery_fetusGroup3, delivery_fetusGroup4, delivery_fetusGroup5, delivery_fetusGroup6;

    var delivery_entryModeReferredCheckBox, delivery_referralGroupBox, delivery_entryModeSpontaneousCheckBox;
    var delivery_selfReferralGroupBox, delivery_followedInThisInstitutionCheckBox, delivery_notFollowedInThisInstitutionCheckBox;
    var delivery_pregnancyFollowUpGroupBox;

    function delivery_setupUi() {

        print("com.freemedforms.obstetrics.delivery Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var delivery_formItem = freemedforms.forms.item("Maternity::Obstetrics::Delivery");   
        print(delivery_formItem);                                                        
        delivery_formUi = delivery_formItem.ui();

        // fetus                                                 
        //delivery_fetusNumber = delivery_formUi.findChild("fetusNumberSpinBox");                                      
        //delivery_fetusGroup1 = delivery_formUi.findChild("fetus1GroupBox"); 
        //delivery_fetusGroup2 = delivery_formUi.findChild("fetus2GroupBox");
        //delivery_fetusGroup3 = delivery_formUi.findChild("fetus3GroupBox");                                   
        //delivery_fetusGroup4 = delivery_formUi.findChild("fetus4GroupBox");
        //delivery_fetusGroup5 = delivery_formUi.findChild("fetus5GroupBox");
        //delivery_fetusGroup6 = delivery_formUi.findChild("fetus6GroupBox");
        //delivery_defaultHideFetusGroupBox();

        // entryMode
        delivery_entryModeReferredCheckBox = delivery_formUi.findChild("entryModeReferredCheckBox");
        delivery_entryModeSpontaneousCheckBox = delivery_formUi.findChild("entryModeSpontaneousCheckBox");
        delivery_referralGroupBox = delivery_formUi.findChild("referralGroupBox");


        delivery_selfReferralGroupBox = delivery_formUi.findChild("selfReferralGroupBox");
        delivery_followedInThisInstitutionCheckBox = delivery_formUi.findChild("followedInThisInstitutionCheckBox");
        delivery_notFollowedInThisInstitutionCheckBox = delivery_formUi.findChild("notFollowedInThisInstitutionCheckBox");

        delivery_pregnancyFollowUpGroupBox = delivery_formUi.findChild("pregnancyFollowUpGroupBox");
        // fetus connection
        //delivery_fetusNumber['valueChanged(int)'].connect(this, delivery_hideFetusGroupBox);
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

    /* function delivery_defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = false;                                        
            delivery_fetusGroup3.visible = false;                                        
            delivery_fetusGroup4.visible = false;                                        
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                        
        }
    */
    
    /*function delivery_hideFetusGroupBox() {
            print("fetusNumber = " + delivery_fetusNumber.value);
        if (delivery_fetusNumber.value == 0) {
            print("if = 0");
            delivery_fetusGroup1.visible = false;
            delivery_fetusGroup2.visible = false;
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                        
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;
        }
        else if (delivery_fetusNumber.value == 1) {
            print("if = 1");
            delivery_fetusGroup1.visible = true;                                      
            delivery_fetusGroup2.visible = false;                                      
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;
        }
        else if (delivery_fetusNumber.value == 2) {
            print("if = 2");                                                
            delivery_fetusGroup1.visible = true;                                       
            delivery_fetusGroup2.visible = true;                                   
            delivery_fetusGroup3.visible = false;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                      
        }  
        else if (delivery_fetusNumber.value == 3) {
            print("if = 3");                                                
            delivery_fetusGroup1.visible = true;                                       
            delivery_fetusGroup2.visible = true;                                      
            delivery_fetusGroup3.visible = true;
            delivery_fetusGroup4.visible = false;                                         
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                     
        }
        else if (delivery_fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = true;                                         
            delivery_fetusGroup3.visible = true;
            delivery_fetusGroup4.visible = true;
            delivery_fetusGroup5.visible = false;
            delivery_fetusGroup6.visible = false;                                         
        }
        else if (delivery_fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            delivery_fetusGroup1.visible = true;                                         
            delivery_fetusGroup2.visible = true;                                         
            delivery_fetusGroup3.visible = true;                                         
            delivery_fetusGroup4.visible = true;                                         
            delivery_fetusGroup5.visible = true;
            delivery_fetusGroup6.visible = false;                                        
        }
        else if (delivery_fetusNumber.value == 6) {                             
            print("if = 6");                                                    
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
    */

});

namespace.com.freemedforms.obstetrics.delivery.delivery_setupUi();
