namespace.module('com.freemedforms.imaging.ultrasound.trimester3', function (exports, require) {

    exports.extend({
        'trimester3_setupUi': trimester3_setupUi,
        'trimester3_setDefaults': trimester3_setDefaults,
        'trimester3_hideFetusGroupBox': trimester3_hideFetusGroupBox,
        'trimester3_chooseDateToUse': trimester3_chooseDateToUse,
        'trimester3_computeEstimatedDueDate': trimester3_computeEstimatedDueDate,
        'trimester3_computeGestationalAge': trimester3_computeGestationalAge,
        'trimester3_setLmp': trimester3_setLmp,
        'trimester3_setDateOfConception': trimester3_setDateOfConception,
        'trimester3_setLmpDefault': trimester3_setLmpDefault,
        'trimester3_hideCalendarLineEdit': trimester3_hideCalendarLineEdit
    });

    var trimester3_fetusNumber, trimester3_fetusGroup1, trimester3_fetusGroup2, trimester3_fetusGroup3, trimester3_fetusGroup4, trimester3_fetusGroup5, trimester3_fetusGroup6;
    var trimester3_gestationalAge, trimester3_dateToUse, trimester3_estimatedDueDate, trimester3_lastMenstrualPeriodUi, trimester3_lastMenstrualPeriodItem, trimester3_conceptionDateUi, trimester3_conceptionDateItem, trimester3_useLmp, trimester3_useLmpItem, trimester3_useDateOfConception, trimester3_useDateOfConceptionItem, trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit, trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit, defaultDate;

    (function () {
    var x = "Hello!!!!!!!!!!!!!!!!!!!!!!!!!!";
    print(x);      // I will invoke myself
    trimester3_setupUi();
    trimester3_hideCalendarLineEdit();
    })();

    function trimester3_setupUi() {

        print("com.freemedforms.imaging.utrasound.trimester3 Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var trimester3_formItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester3");   
        print(trimester3_formItem);                                                        
        trimester3_formUi = trimester3_formItem.ui();

        // fetus                                                 
        trimester3_fetusNumber = trimester3_formUi.findChild("fetusNumberSpinBox");                                      
        trimester3_fetusGroup1 = trimester3_formUi.findChild("fetus1GroupBox"); 
        trimester3_fetusGroup2 = trimester3_formUi.findChild("fetus2GroupBox");
        trimester3_fetusGroup3 = trimester3_formUi.findChild("fetus3GroupBox");                                   
        trimester3_fetusGroup4 = trimester3_formUi.findChild("fetus4GroupBox");
        trimester3_fetusGroup5 = trimester3_formUi.findChild("fetus5GroupBox");
        trimester3_fetusGroup6 = trimester3_formUi.findChild("fetus6GroupBox");
        trimester3_defaultHideFetusGroupBox();

        // obstetrical calendar
        defaultDate = "01011900";
        trimester3_lastMenstrualPeriodUi = trimester3_formUi.findChild("lastMenstrualPeriodDateEdit");
        trimester3_lastMenstrualPeriodItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester3::ObstetricalCalendar::LastMenstrualPeriod");
        trimester3_conceptionDateUi = trimester3_formUi.findChild("conceptionDateDateEdit");
        trimester3_conceptionDateItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester3::ObstetricalCalendar::ConceptionDate");
        trimester3_useLmp = trimester3_formUi.findChild("useLmpCheck");
        trimester3_useLmpItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester3::ObstetricalCalendar::UseLMP::Check");
        trimester3_useDateOfConception = trimester3_formUi.findChild("useDateOfConceptionCheck");
        trimester3_useDateOfConceptionItem = freemedforms.forms.item("Maternity::Imaging::Ultrasound::Trimester3::ObstetricalCalendar::UseConceptionDate::Check");        
        trimester3_currentWeeksAmenorrhoeaWeeksValue = trimester3_formUi.findChild("trimester3CurrentWeeksAmenorrhoeaWeeksValueLabel");
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit = trimester3_formUi.findChild("trimester3CurrentWeeksAmenorrhoeaWeeksValueLineEdit");
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit = trimester3_formUi.findChild("trimester3CurrentWeeksAmenorrhoeaDaysValueLineEdit");  
        trimester3_currentWeeksAmenorrhoeaDaysValue = trimester3_formUi.findChild("trimester3CurrentWeeksAmenorrhoeaDaysValueLabel");       
        trimester3_estimatedDueDate = trimester3_formUi.findChild("eddValueLabel");
        trimester3_estimatedDueDateLineEdit = trimester3_formUi.findChild("eddValueLineEdit");
        trimester3_setDefaults();
        trimester3_setLmpDefault();

        // fetus connection
        trimester3_fetusNumber['valueChanged(int)'].connect(this, trimester3_hideFetusGroupBox);

        // obstetrical calendar connection
        //useLmp['stateChanged(int)'].connect(this, chooseDateToUse);
        //useDateOfConception['stateChanged(int)'].connect(this, chooseDateToUse);
        //lastMenstrualPeriod['dateChanged(int)'].connect(this, chooseDateToUse);  
        //conceptionDate['dateChanged()'].connect(this, chooseDateToUse);

        // hide LineEdit widgets used to print and record dynamic data:
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit.visible = false;   
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit.visible = false;
        trimester3_estimatedDueDateLineEdit.visible = false;
    }
    
    function trimester3_hideCalendarLineEdit() {
        // hide LineEdit widgets used to print and record dynamic data:         
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit.visible = false;   
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit.visible = false;    
        trimester3_estimatedDueDateLineEdit.visible = false;
    }

    // fetus functions

    function trimester3_defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            trimester3_fetusGroup1.visible = true;                                         
            trimester3_fetusGroup2.visible = false;                                        
            trimester3_fetusGroup3.visible = false;                                        
            trimester3_fetusGroup4.visible = false;                                        
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;                                        
        }

    function trimester3_hideFetusGroupBox() {
            print("trimester3_fetusNumber = " + trimester3_fetusNumber.value);
        if (trimester3_fetusNumber.value == 0) {
            print("if = 0");
            trimester3_fetusGroup1.visible = false;
            trimester3_fetusGroup2.visible = false;
            trimester3_fetusGroup3.visible = false;
            trimester3_fetusGroup4.visible = false;                                        
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;
        }
        else if (trimester3_fetusNumber.value == 1) {
            print("if = 1");
            trimester3_fetusGroup1.visible = true;                                      
            trimester3_fetusGroup2.visible = false;                                      
            trimester3_fetusGroup3.visible = false;
            trimester3_fetusGroup4.visible = false;                                         
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;
        }
        else if (trimester3_fetusNumber.value == 2) {
            print("if = 2");                                                
            trimester3_fetusGroup1.visible = true;                                       
            trimester3_fetusGroup2.visible = true;                                   
            trimester3_fetusGroup3.visible = false;
            trimester3_fetusGroup4.visible = false;                                         
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;                                      
        }  
        else if (trimester3_fetusNumber.value == 3) {
            print("if = 3");                                                
            trimester3_fetusGroup1.visible = true;                                       
            trimester3_fetusGroup2.visible = true;                                      
            trimester3_fetusGroup3.visible = true;
            trimester3_fetusGroup4.visible = false;                                         
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;                                     
        }
        else if (trimester3_fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            trimester3_fetusGroup1.visible = true;                                         
            trimester3_fetusGroup2.visible = true;                                         
            trimester3_fetusGroup3.visible = true;
            trimester3_fetusGroup4.visible = true;
            trimester3_fetusGroup5.visible = false;
            trimester3_fetusGroup6.visible = false;                                         
        }
        else if (trimester3_fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            trimester3_fetusGroup1.visible = true;                                         
            trimester3_fetusGroup2.visible = true;                                         
            trimester3_fetusGroup3.visible = true;                                         
            trimester3_fetusGroup4.visible = true;                                         
            trimester3_fetusGroup5.visible = true;
            trimester3_fetusGroup6.visible = false;                                        
        }
        else if (trimester3_fetusNumber.value == 6) {                                      
            print("if = 6");                                                    
            trimester3_fetusGroup1.visible = true;                                         
            trimester3_fetusGroup2.visible = true;                                         
            trimester3_fetusGroup3.visible = true;                                         
            trimester3_fetusGroup4.visible = true;                                         
            trimester3_fetusGroup5.visible = true;
            trimester3_fetusGroup6.visible = true;                                         
        }    
        else {
            print("not coded yet sorry");
        }
    }


    // obstetrical calendar functions

    function trimester3_hideCalendarLineEdit() {                                           
        // hide LineEdit widgets used to print and record dynamic data:         
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit.visible = false;   
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit.visible = false;    
        trimester3_estimatedDueDateLineEdit.visible = false;                    
    }

    function isDateDefault(date) {
        
    }

    function trimester3_emptyEdd() {
        var trimester3_empty = "";                                              
        trimester3_estimatedDueDate.setText(trimester3_empty);
    }

    function trimester3_emptyGa() {
        var trimester3_emptyGA = "";                                            
        trimester3_currentWeeksAmenorrhoeaWeeksValue.setText(trimester3_emptyGA);
        trimester3_currentWeeksAmenorrhoeaDaysValue.setText(trimester3_emptyGA);
    }

    function trimester3_chooseDateToUse() {
        print("trimester3_chooseDateToUse()");
        trimester3_emptyEdd();

        if (!trimester3_useLmpItem.checked && !trimester3_useDateOfConceptionItem.checked) {
        trimester3_setLmpDefault();
        trimester3_computeGestationalAge();
        trimester3_computeEstimatedDueDate()
        }
        trimester3_computeEstimatedDueDate();
        trimester3_computeGestationalAge();
        return;
    }

    function trimester3_computeEstimatedDueDate() {
        trimester3_hideCalendarLineEdit();
        trimester3_emptyEdd();        
        //trimester3_currentWeeksAmenorrhoeaWeeksValue.setText(trimester3_empty);                     
        //trimester3_currentWeeksAmenorrhoeaDaysValue.setText(trimester3_empty);
        if (trimester3_useLmpItem.checked) {
            trimester3_computeEddFromLmp();
        } else {
            trimester3_computeEddFromCd();
        }
    }

    function trimester3_computeEddFromLmp() {

        // If date is defaultDate, do nothing
        if (freemedforms.tools.dateToString(trimester3_lastMenstrualPeriodItem.currentValue, "ddMMyyyy") == defaultDate) {
            print("inside trimester3_computeEstimatedDueDate()-> lmp=01/01/1900 -> return");
            return;
        }
        print("trimester3_computeEddFromLmp()");
        var trimester3_edd = freemedforms.tools.addWeeks(trimester3_lastMenstrualPeriodItem.currentValue, 40);                   
        var trimester3_edd = freemedforms.tools.dateToString(trimester3_edd, "ddd dd MMM yyyy");
        var trimester3_eddText = "<b>";
        trimester3_eddText += trimester3_edd;
        trimester3_eddText += "</b>";
        trimester3_estimatedDueDate.setText(trimester3_eddText);        
        trimester3_estimatedDueDateLineEdit.setText(trimester3_eddText);
    }

    function trimester3_computeEddFromCd() {                                   
                                                                                
        // If date is defaultDate, do nothing                                   
        if (freemedforms.tools.dateToString(trimester3_conceptionDateItem.currentValue, "ddMMyyyy") == defaultDate) {
            print("inside trimester3_computeEddFromCd()-> cd=01/01/1900 -> return");
            trimester3_emptyEdd()
            return;                                                             
        }                                                                       
        print("trimester3_computeEddFromCd()");                                
        var trimester3_edd = freemedforms.tools.addDays(trimester3_conceptionDateItem.currentValue, 266);
        var trimester3_edd = freemedforms.tools.dateToString(trimester3_edd, "ddd dd MMM yyyy");
        var trimester3_eddText = "<b>";                                         
        trimester3_eddText += trimester3_edd;                                   
        trimester3_eddText += "</b>";                                           
        trimester3_estimatedDueDate.setText(trimester3_eddText);                
        trimester3_estimatedDueDateLineEdit.setText(trimester3_eddText);        
    }

    function trimester3_computeGestationalAge() {
        trimester3_hideCalendarLineEdit();
        trimester3_emptyGa();    
        
        if (trimester3_useLmpItem.checked) {
            trimester3_computeGaFromLmp();
        } else {
            trimester3_computeGaFromCd();
        }
    }
    
    function trimester3_computeGaFromLmp() {
        if (freemedforms.tools.dateToString(trimester3_lastMenstrualPeriodItem.currentValue, "ddMMyyyy") == defaultDate) {
            return;
        }
        print("computeGaFromLmp()");
        var trimester3_edd = freemedforms.tools.addWeeks(trimester3_lastMenstrualPeriodItem.currentValue, 40);
        var trimester3_days = freemedforms.tools.daysTo(new Date(), trimester3_edd);
        var trimester3_GAdays = (280 - trimester3_days);
        var trimester3_GAweeks = (trimester3_GAdays - trimester3_GAdays%7) / 7;
        var trimester3_GAdays = trimester3_GAdays%7;
        var trimester3_GAweeksText = "<b>";
        trimester3_GAweeksText += trimester3_GAweeks;
        trimester3_GAweeksText += "</b>";
        var trimester3_GAdaysText = "<b>";                                                
        trimester3_GAdaysText += trimester3_GAdays;                                                 
        trimester3_GAdaysText += "</b>";
        trimester3_currentWeeksAmenorrhoeaWeeksValue.setText(trimester3_GAweeksText);
        trimester3_currentWeeksAmenorrhoeaDaysValue.setText(trimester3_GAdaysText);
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit.setText(trimester3_GAweeksText);
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit.setText(trimester3_GAdaysText);
    }

    function trimester3_computeGaFromCd() {                                    
        if (freemedforms.tools.dateToString(trimester3_conceptionDateItem.currentValue, "ddMMyyyy") == defaultDate) {
            return;                                                             
        }                                                                       
        print("computeGaFromCd()");                                            
        var trimester3_edd = freemedforms.tools.addDays(trimester3_conceptionDateItem.currentValue, 266);
        var trimester3_days = freemedforms.tools.daysTo(new Date(), trimester3_edd);
        var trimester3_GAdays = (280 - trimester3_days);                        
        var trimester3_GAweeks = (trimester3_GAdays - trimester3_GAdays%7) / 7; 
        var trimester3_GAdays = trimester3_GAdays%7;                            
        var trimester3_GAweeksText = "<b>";                                     
        trimester3_GAweeksText += trimester3_GAweeks;                           
        trimester3_GAweeksText += "</b>";                                       
        var trimester3_GAdaysText = "<b>";                                      
        trimester3_GAdaysText += trimester3_GAdays;                             
        trimester3_GAdaysText += "</b>";                                        
        trimester3_currentWeeksAmenorrhoeaWeeksValue.setText(trimester3_GAweeksText);
        trimester3_currentWeeksAmenorrhoeaDaysValue.setText(trimester3_GAdaysText);
        trimester3_currentWeeksAmenorrhoeaWeeksValueLineEdit.setText(trimester3_GAweeksText);
        trimester3_currentWeeksAmenorrhoeaDaysValueLineEdit.setText(trimester3_GAdaysText);
    }


    function trimester3_setLmpDefault() {
        print("trimester3_setLmpDefault");
        trimester3_useLmpItem.checked = true;
        return;
    }

    function trimester3_setDefaults() {                                                  
        print("trimester3_setDefaults");                                                 
        //trimester3_lastMenstrualPeriod = (new Date());                    
        trimester3_estimatedDueDate.setText("");                                           
        return;                                                                 
    }

    function trimester3_setLmp() {
        print("inside trimester3_setLmp()");
        if (trimester3_useLmpItem.checked && !trimester3_useDateOfConception.checked) {
            trimester3_computeEstimatedDueDate();                                   
            trimester3_computeGestationalAge();
            return;
        }
        print("trimester3_setLmp()");
        
        if (trimester3_useLmpItem.checked && trimester3_useDateOfConceptionItem.checked) {
        trimester3_useDateOfConceptionItem.checked = false;
        }
        if (!trimester3_useLmpItem.checked && !trimester3_useDateOfConceptionItem.checked) {            
        trimester3_useDateOfConceptionItem.checked = true;                                
        }
        
        trimester3_computeEstimatedDueDate();
        trimester3_computeGestationalAge();
    }

    function trimester3_setDateOfConception() {
        trimester3_emptyEdd();
        
        //if (trimester3_useDateOfConception.checked && !trimester3_useLmpItem.checked) {
        //trimester3_computeEstimatedDueDate();                               
        //trimester3_computeGestationalAge();
        //return;
        //}                                                   
        if (trimester3_useLmpItem.checked && trimester3_useDateOfConceptionItem.checked) {
            trimester3_useLmpItem.checked = false;
        }
        if (!trimester3_useLmpItem.checked && !trimester3_useDateOfConceptionItem.checked) {            
            trimester3_useLmpItem.checked = true;                                         
        }                                                                                  
     
        trimester3_computeEstimatedDueDate();                                              
        trimester3_computeGestationalAge();                         
    }

});

namespace.com.freemedforms.imaging.ultrasound.trimester3.trimester3_setupUi();
namespace.com.freemedforms.imaging.ultrasound.trimester3.trimester3_setDefaults();
