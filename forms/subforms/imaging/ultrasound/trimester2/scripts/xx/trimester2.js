namespace.module('com.freemedforms.imaging.ultrasound.trimester2', function (exports, require) {

    exports.extend({
        'trimester2_setupUi': trimester2_setupUi,
        'trimester2_setDefaults': trimester2_setDefaults,
        'trimester2_hideFetusGroupBox': trimester2_hideFetusGroupBox,
        'trimester2_chooseDateToUse': trimester2_chooseDateToUse,
        'trimester2_computeEstimatedDueDate': trimester2_computeEstimatedDueDate,
        'trimester2_computeGestationalAge': trimester2_computeGestationalAge,
        'trimester2_setLmp': trimester2_setLmp,
        'trimester2_setDateOfConception': trimester2_setDateOfConception,
        'trimester2_setLmpDefault': trimester2_setLmpDefault
    });

    var trimester2_fetusNumber, trimester2_fetusGroup1, trimester2_fetusGroup2, trimester2_fetusGroup3, trimester2_fetusGroup4, trimester2_fetusGroup5, trimester2_fetusGroup6;
    var trimester2_gestationalAge, trimester2_dateToUse, trimester2_estimatedDueDate, trimester2_lastMenstrualPeriodUi, trimester2_lastMenstrualPeriodItem, trimester2_conceptionDateUi, trimester2_conceptionDateItem, trimester2_useLmp, trimester2_useLmpItem, trimester2_useDateOfConception, trimester2_useDateOfConceptionItem;

    function trimester2_setupUi() {

        print("com.freemedforms.imaging.utrasound.trimester2 Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var trimester2_formItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester2");   
        print(trimester2_formItem);                                                        
        trimester2_formUi = trimester2_formItem.ui();

        // fetus                                                 
        trimester2_fetusNumber = trimester2_formUi.findChild("fetusNumberSpinBox");                                      
        trimester2_fetusGroup1 = trimester2_formUi.findChild("fetus1GroupBox"); 
        trimester2_fetusGroup2 = trimester2_formUi.findChild("fetus2GroupBox");
        trimester2_fetusGroup3 = trimester2_formUi.findChild("fetus3GroupBox");                                   
        trimester2_fetusGroup4 = trimester2_formUi.findChild("fetus4GroupBox");
        trimester2_fetusGroup5 = trimester2_formUi.findChild("fetus5GroupBox");
        trimester2_fetusGroup6 = trimester2_formUi.findChild("fetus6GroupBox");
        trimester2_defaultHideFetusGroupBox();

        // obstetrical calendar
        trimester2_lastMenstrualPeriodUi = trimester2_formUi.findChild("lastMenstrualPeriodDateEdit");
        trimester2_lastMenstrualPeriodItem = freemedforms.forms.item("Trimester2::ObstetricalCalendar::LastMenstrualPeriod");
        trimester2_conceptionDateUi = trimester2_formUi.findChild("conceptionDateDateEdit");
        trimester2_conceptionDateItem = freemedforms.forms.item("Trimester2::ObstetricalCalendar::ConceptionDate");
        trimester2_useLmp = trimester2_formUi.findChild("useLmpCheck");
        trimester2_useLmpItem = freemedforms.forms.item("Trimester2::ObstetricalCalendar::UseLMP::Check");
        trimester2_useDateOfConception = trimester2_formUi.findChild("useDateOfConceptionCheck");
        trimester2_useDateOfConceptionItem = freemedforms.forms.item("Trimester2::ObstetricalCalendar::UseConceptionDate::Check");        
        trimester2_currentWeeksAmenorrhoeaWeeksValue = trimester2_formUi.findChild("trimester2CurrentWeeksAmenorrhoeaWeeksValueLabel");        
        trimester2_currentWeeksAmenorrhoeaDaysValue = trimester2_formUi.findChild("trimester2CurrentWeeksAmenorrhoeaDaysValueLabel");       
        trimester2_estimatedDueDate = trimester2_formUi.findChild("eddValueLabel");
        trimester2_setDefaults();
        trimester2_setLmpDefault();

        // fetus connection
        trimester2_fetusNumber['valueChanged(int)'].connect(this, trimester2_hideFetusGroupBox);

        // obstetrical calendar connection
        //useLmp['stateChanged(int)'].connect(this, chooseDateToUse);
        //useDateOfConception['stateChanged(int)'].connect(this, chooseDateToUse);
        //lastMenstrualPeriod['dateChanged(int)'].connect(this, chooseDateToUse);  
        //conceptionDate['dateChanged()'].connect(this, chooseDateToUse);

    }
    
    // fetus functions

    function trimester2_defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            trimester2_fetusGroup1.visible = true;                                         
            trimester2_fetusGroup2.visible = false;                                        
            trimester2_fetusGroup3.visible = false;                                        
            trimester2_fetusGroup4.visible = false;                                        
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;                                        
        }

    function trimester2_hideFetusGroupBox() {
            print("trimester2_fetusNumber = " + trimester2_fetusNumber.value);
        if (trimester2_fetusNumber.value == 0) {
            print("if = 0");
            trimester2_fetusGroup1.visible = false;
            trimester2_fetusGroup2.visible = false;
            trimester2_fetusGroup3.visible = false;
            trimester2_fetusGroup4.visible = false;                                        
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;
        }
        else if (trimester2_fetusNumber.value == 1) {
            print("if = 1");
            trimester2_fetusGroup1.visible = true;                                      
            trimester2_fetusGroup2.visible = false;                                      
            trimester2_fetusGroup3.visible = false;
            trimester2_fetusGroup4.visible = false;                                         
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;
        }
        else if (trimester2_fetusNumber.value == 2) {
            print("if = 2");                                                
            trimester2_fetusGroup1.visible = true;                                       
            trimester2_fetusGroup2.visible = true;                                   
            trimester2_fetusGroup3.visible = false;
            trimester2_fetusGroup4.visible = false;                                         
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;                                      
        }  
        else if (trimester2_fetusNumber.value == 3) {
            print("if = 3");                                                
            trimester2_fetusGroup1.visible = true;                                       
            trimester2_fetusGroup2.visible = true;                                      
            trimester2_fetusGroup3.visible = true;
            trimester2_fetusGroup4.visible = false;                                         
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;                                     
        }
        else if (trimester2_fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            trimester2_fetusGroup1.visible = true;                                         
            trimester2_fetusGroup2.visible = true;                                         
            trimester2_fetusGroup3.visible = true;
            trimester2_fetusGroup4.visible = true;
            trimester2_fetusGroup5.visible = false;
            trimester2_fetusGroup6.visible = false;                                         
        }
        else if (trimester2_fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            trimester2_fetusGroup1.visible = true;                                         
            trimester2_fetusGroup2.visible = true;                                         
            trimester2_fetusGroup3.visible = true;                                         
            trimester2_fetusGroup4.visible = true;                                         
            trimester2_fetusGroup5.visible = true;
            trimester2_fetusGroup6.visible = false;                                        
        }
        else if (trimester2_fetusNumber.value == 6) {                                      
            print("if = 6");                                                    
            trimester2_fetusGroup1.visible = true;                                         
            trimester2_fetusGroup2.visible = true;                                         
            trimester2_fetusGroup3.visible = true;                                         
            trimester2_fetusGroup4.visible = true;                                         
            trimester2_fetusGroup5.visible = true;
            trimester2_fetusGroup6.visible = true;                                         
        }    
        else {
            print("not coded yet sorry");
        }
    }


    // obstetrical calendar functions

    function trimester2_chooseDateToUse() {
        print("trimester2_chooseDateToUse()");
        var trimester2_empty = "";
        trimester2_estimatedDueDate.setText(trimester2_empty);

        if (!trimester2_useLmpItem.checked && !trimester2_useDateOfConceptionItem.checked) {
        trimester2_setLmpDefault();
        return;
        }
        trimester2_computeEstimatedDueDate();
        trimester2_computeGestationalAge();
        return;
    }

    function trimester2_computeEstimatedDueDate() {
        var trimester2_empty = "";
        trimester2_estimatedDueDate.setText(trimester2_empty);
        trimester2_currentWeeksAmenorrhoeaWeeksValue.setText(trimester2_empty);                     
        trimester2_currentWeeksAmenorrhoeaDaysValue.setText(trimester2_empty);
        if (freemedforms.tools.dateToString(trimester2_lastMenstrualPeriodItem.currentValue, "ddd dd MMM yyyy") == "Sat 01 Jan 2000") {
            print("inside trimester2_computeEstimatedDueDate()-> lmp=01/01/2000 -> return");
            return;
        }
        print("trimester2_computeEstimatedDueDate()");
        var trimester2_edd = freemedforms.tools.addWeeks(trimester2_lastMenstrualPeriodItem.currentValue, 40);                   
        var trimester2_edd = freemedforms.tools.dateToString(trimester2_edd, "ddd dd MMM yyyy");
        var trimester2_eddText = "<b>";
        trimester2_eddText += trimester2_edd;
        trimester2_eddText += "</b>";
        trimester2_estimatedDueDate.setText(trimester2_eddText);        

    }

    function trimester2_computeGestationalAge() {
        var trimester2_emptyGA = "";
        trimester2_currentWeeksAmenorrhoeaWeeksValue.setText(trimester2_emptyGA);                     
        trimester2_currentWeeksAmenorrhoeaDaysValue.setText(trimester2_emptyGA);
        if (freemedforms.tools.dateToString(trimester2_lastMenstrualPeriodItem.currentValue, "ddd dd MMM yyyy") == "Sat 01 Jan 2000") {
            print("inside trimester2_computeGestationalAge()-> lmp=01/01/2000 -> return");
            return;                                                             
        }                                        
        print("computeGestationalAge()");
        var trimester2_edd = freemedforms.tools.addWeeks(trimester2_lastMenstrualPeriodItem.currentValue, 40);
        var trimester2_days = freemedforms.tools.daysTo(new Date(), trimester2_edd);
        var trimester2_GAdays = (280 - trimester2_days);
        var trimester2_GAweeks = (trimester2_GAdays - trimester2_GAdays%7) / 7;
        var trimester2_GAdays = trimester2_GAdays%7;
        var trimester2_GAweeksText = "<b>";
        trimester2_GAweeksText += trimester2_GAweeks;
        trimester2_GAweeksText += "</b>";
        var trimester2_GAdaysText = "<b>";                                                
        trimester2_GAdaysText += trimester2_GAdays;                                                 
        trimester2_GAdaysText += "</b>";
        trimester2_currentWeeksAmenorrhoeaWeeksValue.setText(trimester2_GAweeksText);
        trimester2_currentWeeksAmenorrhoeaDaysValue.setText(trimester2_GAdaysText);
    }

    function trimester2_setLmpDefault() {
        print("trimester2_setLmpDefault");
        trimester2_useLmpItem.checked = true;
        return;
    }

    function trimester2_setDefaults() {                                                  
        print("trimester2_setDefaults");                                                 
        trimester2_lastMenstrualPeriodItem.currentValue = (new Date());                    
        trimester2_estimatedDueDate.setText("");                                           
        return;                                                                 
    }

    function trimester2_setLmp() {
        if (trimester2_useLmpItem.checked && !trimester2_useDateOfConceptionItem.checked) return;
        
        print("trimester2_setLmp()");
        
        if (trimester2_useLmpItem.checked && trimester2_useDateOfConceptionItem.checked) {
        trimester2_useDateOfConceptionItem.checked = false;
        }
        if (!trimester2_useLmpItem.checked && !trimester2_useDateOfConceptionItem.checked) {            
        trimester2_useDateOfConceptionItem.checked = true;                                
        }
        
        trimester2_computeEstimatedDueDate();
        trimester2_computeGestationalAge();
    }

    function trimester2_setDateOfConception() {
        if (trimester2_useDateOfConception.checked && !trimester2_useLmpItem.checked) return;                                                         
        if (trimester2_useLmpItem.checked && trimester2_useDateOfConceptionItem.checked) {
            trimester2_useLmpItem.checked = false;
        }
        if (!trimester2_useLmpItem.checked && !trimester2_useDateOfConceptionItem.checked) {            
            trimester2_useLmpItem.checked = true;                                         
        }                                                                                  
     
        trimester2_computeEstimatedDueDate();                                              
        trimester2_computeGestationalAge();                         
    }

});

namespace.com.freemedforms.imaging.ultrasound.trimester2.trimester2_setupUi();
namespace.com.freemedforms.imaging.ultrasound.trimester2.trimester2_setDefaults();
