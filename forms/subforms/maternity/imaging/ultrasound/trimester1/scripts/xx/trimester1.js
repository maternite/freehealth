namespace.module('com.freemedforms.imaging.ultrasound.trimester1', function (exports, require) {

    exports.extend({
        'trimester1_setupUi': trimester1_setupUi,
        'trimester1_setDefaults': trimester1_setDefaults,
        'trimester1_hideFetusGroupBox': trimester1_hideFetusGroupBox,
        'trimester1_chooseDateToUse': trimester1_chooseDateToUse,
        'trimester1_computeEstimatedDueDate': trimester1_computeEstimatedDueDate,
        'trimester1_computeGestationalAge': trimester1_computeGestationalAge,
        'trimester1_setLmp': trimester1_setLmp,
        'trimester1_setDateOfConception': trimester1_setDateOfConception,
        'trimester1_setLmpDefault': trimester1_setLmpDefault
    });

    var trimester1_fetusNumber, trimester1_fetusGroup1, trimester1_fetusGroup2, trimester1_fetusGroup3, trimester1_fetusGroup4, trimester1_fetusGroup5, trimester1_fetusGroup6;
    var trimester1_gestationalAge, trimester1_dateToUse, trimester1_estimatedDueDate, trimester1_lastMenstrualPeriodUi, trimester1_lastMenstrualPeriodItem, trimester1_conceptionDateUi, trimester1_conceptionDateItem, trimester1_useLmp, trimester1_useLmpItem, trimester1_useDateOfConception, trimester1_useDateOfConceptionItem;

    function trimester1_setupUi() {

        print("com.freemedforms.imaging.utrasound.trimester1 Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var trimester1_formItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester1");   
        print(trimester1_formItem);                                                        
        trimester1_formUi = trimester1_formItem.ui();

        // fetus                                                 
        trimester1_fetusNumber = trimester1_formUi.findChild("fetusNumberSpinBox");                                      
        trimester1_fetusGroup1 = trimester1_formUi.findChild("fetus1GroupBox"); 
        trimester1_fetusGroup2 = trimester1_formUi.findChild("fetus2GroupBox");
        trimester1_fetusGroup3 = trimester1_formUi.findChild("fetus3GroupBox");                                   
        trimester1_fetusGroup4 = trimester1_formUi.findChild("fetus4GroupBox");
        trimester1_fetusGroup5 = trimester1_formUi.findChild("fetus5GroupBox");
        trimester1_fetusGroup6 = trimester1_formUi.findChild("fetus6GroupBox");
        trimester1_defaultHideFetusGroupBox();

        // obstetrical calendar
        trimester1_lastMenstrualPeriodUi = trimester1_formUi.findChild("lastMenstrualPeriodDateEdit");
        trimester1_lastMenstrualPeriodItem = freemedforms.forms.item("Trimester1::ObstetricalCalendar::LastMenstrualPeriod");
        trimester1_conceptionDateUi = trimester1_formUi.findChild("conceptionDateDateEdit");
        trimester1_conceptionDateItem = freemedforms.forms.item("Trimester1::ObstetricalCalendar::ConceptionDate");
        trimester1_useLmp = trimester1_formUi.findChild("useLmpCheck");
        trimester1_useLmpItem = freemedforms.forms.item("Trimester1::ObstetricalCalendar::UseLMP::Check");
        trimester1_useDateOfConception = trimester1_formUi.findChild("useDateOfConceptionCheck");
        trimester1_useDateOfConceptionItem = freemedforms.forms.item("Trimester1::ObstetricalCalendar::UseConceptionDate::Check");        
        trimester1_currentWeeksAmenorrhoeaWeeksValue = trimester1_formUi.findChild("trimester1CurrentWeeksAmenorrhoeaWeeksValueLabel");        
        trimester1_currentWeeksAmenorrhoeaDaysValue = trimester1_formUi.findChild("trimester1CurrentWeeksAmenorrhoeaDaysValueLabel");       
        trimester1_estimatedDueDate = trimester1_formUi.findChild("eddValueLabel");
        trimester1_setDefaults();
        trimester1_setLmpDefault();

        // fetus connection
        trimester1_fetusNumber['valueChanged(int)'].connect(this, trimester1_hideFetusGroupBox);

        // obstetrical calendar connection
        //useLmp['stateChanged(int)'].connect(this, chooseDateToUse);
        //useDateOfConception['stateChanged(int)'].connect(this, chooseDateToUse);
        //lastMenstrualPeriod['dateChanged(int)'].connect(this, chooseDateToUse);  
        //conceptionDate['dateChanged()'].connect(this, chooseDateToUse);

    }
    
    // fetus functions

    function trimester1_defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            trimester1_fetusGroup1.visible = true;                                         
            trimester1_fetusGroup2.visible = false;                                        
            trimester1_fetusGroup3.visible = false;                                        
            trimester1_fetusGroup4.visible = false;                                        
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;                                        
        }

    function trimester1_hideFetusGroupBox() {
            print("trimester1_fetusNumber = " + trimester1_fetusNumber.value);
        if (trimester1_fetusNumber.value == 0) {
            print("if = 0");
            trimester1_fetusGroup1.visible = false;
            trimester1_fetusGroup2.visible = false;
            trimester1_fetusGroup3.visible = false;
            trimester1_fetusGroup4.visible = false;                                        
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;
        }
        else if (trimester1_fetusNumber.value == 1) {
            print("if = 1");
            trimester1_fetusGroup1.visible = true;                                      
            trimester1_fetusGroup2.visible = false;                                      
            trimester1_fetusGroup3.visible = false;
            trimester1_fetusGroup4.visible = false;                                         
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;
        }
        else if (trimester1_fetusNumber.value == 2) {
            print("if = 2");                                                
            trimester1_fetusGroup1.visible = true;                                       
            trimester1_fetusGroup2.visible = true;                                   
            trimester1_fetusGroup3.visible = false;
            trimester1_fetusGroup4.visible = false;                                         
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;                                      
        }  
        else if (trimester1_fetusNumber.value == 3) {
            print("if = 3");                                                
            trimester1_fetusGroup1.visible = true;                                       
            trimester1_fetusGroup2.visible = true;                                      
            trimester1_fetusGroup3.visible = true;
            trimester1_fetusGroup4.visible = false;                                         
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;                                     
        }
        else if (trimester1_fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            trimester1_fetusGroup1.visible = true;                                         
            trimester1_fetusGroup2.visible = true;                                         
            trimester1_fetusGroup3.visible = true;
            trimester1_fetusGroup4.visible = true;
            trimester1_fetusGroup5.visible = false;
            trimester1_fetusGroup6.visible = false;                                         
        }
        else if (trimester1_fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            trimester1_fetusGroup1.visible = true;                                         
            trimester1_fetusGroup2.visible = true;                                         
            trimester1_fetusGroup3.visible = true;                                         
            trimester1_fetusGroup4.visible = true;                                         
            trimester1_fetusGroup5.visible = true;
            trimester1_fetusGroup6.visible = false;                                        
        }
        else if (trimester1_fetusNumber.value == 6) {                                      
            print("if = 6");                                                    
            trimester1_fetusGroup1.visible = true;                                         
            trimester1_fetusGroup2.visible = true;                                         
            trimester1_fetusGroup3.visible = true;                                         
            trimester1_fetusGroup4.visible = true;                                         
            trimester1_fetusGroup5.visible = true;
            trimester1_fetusGroup6.visible = true;                                         
        }    
        else {
            print("not coded yet sorry");
        }
    }


    // obstetrical calendar functions

    function trimester1_chooseDateToUse() {
        print("trimester1_chooseDateToUse()");
        var trimester1_empty = "";
        trimester1_estimatedDueDate.setText(trimester1_empty);

        if (!trimester1_useLmpItem.checked && !trimester1_useDateOfConceptionItem.checked) {
        trimester1_setLmpDefault();
        return;
        }
        trimester1_computeEstimatedDueDate();
        trimester1_computeGestationalAge();
        return;
    }

    function trimester1_computeEstimatedDueDate() {
        var trimester1_empty = "";
        trimester1_estimatedDueDate.setText(trimester1_empty);
        trimester1_currentWeeksAmenorrhoeaWeeksValue.setText(trimester1_empty);                     
        trimester1_currentWeeksAmenorrhoeaDaysValue.setText(trimester1_empty);
        if (freemedforms.tools.dateToString(trimester1_lastMenstrualPeriodItem.currentValue, "dd MM yyyy") == "01 01 1900") {
            print("inside trimester1_computeEstimatedDueDate()-> lmp=01/01/1900 -> return");
            return;
        }
        print("trimester1_computeEstimatedDueDate()");
        var trimester1_edd = freemedforms.tools.addWeeks(trimester1_lastMenstrualPeriodItem.currentValue, 40);                   
        var trimester1_edd = freemedforms.tools.dateToString(trimester1_edd, "ddd dd MMM yyyy");
        var trimester1_eddText = "<b>";
        trimester1_eddText += trimester1_edd;
        trimester1_eddText += "</b>";
        trimester1_estimatedDueDate.setText(trimester1_eddText);        

    }

    function trimester1_computeGestationalAge() {
        var trimester1_emptyGA = "";
        trimester1_currentWeeksAmenorrhoeaWeeksValue.setText(trimester1_emptyGA);                     
        trimester1_currentWeeksAmenorrhoeaDaysValue.setText(trimester1_emptyGA);
        if (freemedforms.tools.dateToString(trimester1_lastMenstrualPeriodItem.currentValue, "dd MM yyyy") == "01 01 1900") {
            print("inside trimester1_computeGestationalAge()-> lmp=01/01/1900 -> return");
            return;                                                             
        }                                        
        print("computeGestationalAge()");
        var trimester1_edd = freemedforms.tools.addWeeks(trimester1_lastMenstrualPeriodItem.currentValue, 40);
        var trimester1_days = freemedforms.tools.daysTo(new Date(), trimester1_edd);
        var trimester1_GAdays = (280 - trimester1_days);
        var trimester1_GAweeks = (trimester1_GAdays - trimester1_GAdays%7) / 7;
        var trimester1_GAdays = trimester1_GAdays%7;
        var trimester1_GAweeksText = "<b>";
        trimester1_GAweeksText += trimester1_GAweeks;
        trimester1_GAweeksText += "</b>";
        var trimester1_GAdaysText = "<b>";                                                
        trimester1_GAdaysText += trimester1_GAdays;                                                 
        trimester1_GAdaysText += "</b>";
        trimester1_currentWeeksAmenorrhoeaWeeksValue.setText(trimester1_GAweeksText);
        trimester1_currentWeeksAmenorrhoeaDaysValue.setText(trimester1_GAdaysText);
    }

    function trimester1_setLmpDefault() {
        print("trimester1_setLmpDefault");
        trimester1_useLmpItem.checked = true;
        return;
    }

    function trimester1_setDefaults() {                                                  
        print("trimester1_setDefaults");                                                 
        trimester1_lastMenstrualPeriodItem.currentValue = (new Date());                    
        trimester1_estimatedDueDate.setText("");                                           
        return;                                                                 
    }

    function trimester1_setLmp() {
        if (trimester1_useLmpItem.checked && !trimester1_useDateOfConceptionItem.checked) return;
        
        print("trimester1_setLmp()");
        
        if (trimester1_useLmpItem.checked && trimester1_useDateOfConceptionItem.checked) {
        trimester1_useDateOfConceptionItem.checked = false;
        }
        if (!trimester1_useLmpItem.checked && !trimester1_useDateOfConceptionItem.checked) {            
        trimester1_useDateOfConceptionItem.checked = true;                                
        }
        
        trimester1_computeEstimatedDueDate();
        trimester1_computeGestationalAge();
    }

    function trimester1_setDateOfConception() {
        if (trimester1_useDateOfConception.checked && !trimester1_useLmpItem.checked) return;                                                         
        if (trimester1_useLmpItem.checked && trimester1_useDateOfConceptionItem.checked) {
            trimester1_useLmpItem.checked = false;
        }
        if (!trimester1_useLmpItem.checked && !trimester1_useDateOfConceptionItem.checked) {            
            trimester1_useLmpItem.checked = true;                                         
        }                                                                                  
     
        trimester1_computeEstimatedDueDate();                                              
        trimester1_computeGestationalAge();                         
    }

});

namespace.com.freemedforms.imaging.ultrasound.trimester1.trimester1_setupUi();
namespace.com.freemedforms.imaging.ultrasound.trimester1.trimester1_setDefaults();
