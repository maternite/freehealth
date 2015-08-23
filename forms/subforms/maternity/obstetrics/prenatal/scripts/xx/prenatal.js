namespace.module('com.freemedforms.obstetrics.prenatal', function (exports, require) {

    exports.extend({
        'setupUi': setupUi,
        'setDefaults': setDefaults,
        'hideFetusGroupBox': hideFetusGroupBox,
        'computePulsePressure': computePulsePressure,
        'computeWeightGain': computeWeightGain,
        'computeFatigueScore': computeFatigueScore,
        'chooseDateToUse': chooseDateToUse,
        'computeEstimatedDueDate': computeEstimatedDueDate,
        'computeGestationalAge': computeGestationalAge,
        'setLmp': setLmp,
        'setDateOfConception': setDateOfConception,
        'setLmpDefault': setLmpDefault
    });

    var fetusNumber, fetusGroup1, fetusGroup2, fetusGroup3, fetusGroup4, fetusGroup5;
    var syst, diast, pulse;
    var weight, weightPrePregnancy, weightGain;
    var fatigueScore, fatigueScoreLineEdit, standing, industrial, repetitive, physical, hardness;
    var gestationalAge, dateToUse, estimatedDueDate, lastMenstrualPeriodUi, lastMenstrualPeriodItem, conceptionDateUi, conceptionDateItem, useLmp, useLmpItem, useDateOfConception, useDateOfConceptionItem;

    function setupUi() {

        print("com.freemedforms.obstetrics.prenatal Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var formItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal");   
        print(formItem);                                                        
        formUi = formItem.ui();

        // fetus                                                 
        fetusNumber = formUi.findChild("fetusNumberSpinBox");                                      
        fetusGroup1 = formUi.findChild("fetus1GroupBox"); 
        fetusGroup2 = formUi.findChild("fetus2GroupBox");
        fetusGroup3 = formUi.findChild("fetus3GroupBox");                                   
        fetusGroup4 = formUi.findChild("fetus4GroupBox");
        fetusGroup5 = formUi.findChild("fetus5GroupBox");
        defaultHideFetusGroupBox();

        // pulse
        syst = formUi.findChild("bloodPressureSystolicValue");                                      
        diast = formUi.findChild("bloodPressureDiastolicValue");                                    
        pulse = formUi.findChild("bloodPressurePulseValue");

        // weight
        weight = formUi.findChild("weightValue");
        weightPrePregnancy = formUi.findChild("prePregnancyWeightValue");
        weightGain = formUi.findChild("weightGainValue");

        // fatigue score
        standing = formUi.findChild("standingCheck");
        industrial = formUi.findChild("industrialCheck");
        repetitive = formUi.findChild("repetitiveCheck");
        physical = formUi.findChild("physicalCheck");
        hardness = formUi.findChild("hardnessCheck");
        fatigueScoreLineEdit = formUi.findChild("fatigueScoreTotalLineEdit");

        // obstetrical calendar
        lastMenstrualPeriodUi = formUi.findChild("lastMenstrualPeriodDateEdit");
        lastMenstrualPeriodItem = freemedforms.forms.item("ObstetricalCalendar::LastMentrualPeriod");
        conceptionDateUi = formUi.findChild("conceptionDateDateEdit");
        conceptionDateItem = freemedforms.forms.item("ObstetricalCalendar::ConceptionDate");
        useLmp = formUi.findChild("useLmpCheck");
        useLmpItem = freemedforms.forms.item("ObstetricalCalendar::UseLMP::Check");
        useDateOfConception = formUi.findChild("useDateOfConceptionCheck");
        useDateOfConceptionItem = freemedforms.forms.item("ObstetricalCalendar::UseConceptionDate::Check");        
        currentWeeksAmenorrhoeaWeeksValue = formUi.findChild("currentWeeksAmenorrhoeaWeeksValueLabel");        
        currentWeeksAmenorrhoeaDaysValue = formUi.findChild("currentWeeksAmenorrhoeaDaysValueLabel");       
        estimatedDueDate = formUi.findChild("eddValueLabel");
        setDefaults();
        setLmpDefault();

        // fetus connection
        fetusNumber['valueChanged(int)'].connect(this, hideFetusGroupBox);

        // pulse connection
        syst['valueChanged(int)'].connect(this, computePulsePressure);          
        diast['valueChanged(int)'].connect(this, computePulsePressure);
        
        // weight connection
        weight['valueChanged(double)'].connect(this, computeWeightGain);          
        weightPrePregnancy['valueChanged(double)'].connect(this, computeWeightGain);
        
        // fatigue score connection
        standing['stateChanged(int)'].connect(this, computeFatigueScore);
        industrial['stateChanged(int)'].connect(this, computeFatigueScore);
        repetitive['stateChanged(int)'].connect(this, computeFatigueScore);
        physical['stateChanged(int)'].connect(this, computeFatigueScore);
        hardness['stateChanged(int)'].connect(this, computeFatigueScore);

        // obstetrical calendar connection
        //useLmp['stateChanged(int)'].connect(this, chooseDateToUse);
        //useDateOfConception['stateChanged(int)'].connect(this, chooseDateToUse);
        //lastMenstrualPeriod['dateChanged(int)'].connect(this, chooseDateToUse);  
        //conceptionDate['dateChanged()'].connect(this, chooseDateToUse);

    }
    
    // fetus functions

    function defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = false;                                        
            fetusGroup3.visible = false;                                        
            fetusGroup4.visible = false;                                        
            fetusGroup5.visible = false;                                        
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
        }
        else if (fetusNumber.value == 1) {
            print("if = 1");
            fetusGroup1.visible = true;                                      
            fetusGroup2.visible = false;                                      
            fetusGroup3.visible = false;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;
        }
        else if (fetusNumber.value == 2) {
            print("if = 2");                                                
            fetusGroup1.visible = true;                                       
            fetusGroup2.visible = true;                                   
            fetusGroup3.visible = false;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;                                      
        }  
        else if (fetusNumber.value == 3) {
            print("if = 3");                                                
            fetusGroup1.visible = true;                                       
            fetusGroup2.visible = true;                                      
            fetusGroup3.visible = true;
            fetusGroup4.visible = false;                                         
            fetusGroup5.visible = false;                                     
        }
        else if (fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = true;                                         
            fetusGroup3.visible = true;
            fetusGroup4.visible = true;
            fetusGroup5.visible = false;                                         
        }
        else if (fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            fetusGroup1.visible = true;                                         
            fetusGroup2.visible = true;                                         
            fetusGroup3.visible = true;                                         
            fetusGroup4.visible = true;                                         
            fetusGroup5.visible = true;                                        
        }
        else {
            print("not coded yet sorry");
        }
    }

    // pulse function

    function computePulsePressure() {                                           
        var text = syst.value - diast.value;                                    
        pulse.setText(text);                                                    
    }

    // weight gain function

    function computeWeightGain() {
        print("computeWeightGain()");                                           
        var text = weight.value - weightPrePregnancy.value;                                    
        weightGain.setText(text);
        print("computeWeightGain() gain = " + text);                                                   
    }

    // fatigue score function

    function computeFatigueScore() {
        print("computeFatigueScore()");
        fatigueScore = (standing.checked == true) + (industrial.checked == true) + (repetitive.checked == true) + (physical.checked == true) + (hardness.checked == true);
        fatigueScoreLineEdit.setText(fatigueScore);
    }

    // obstetrical calendar functions

    function chooseDateToUse() {
        print("chooseDateToUse()");
        var empty = "";
        estimatedDueDate.setText(empty);
        if (!useLmpItem.checked && !useDateOfConceptionItem.checked) {
        setLmpDefault();
        return;
        }
        computeEstimatedDueDate();
        computeGestationalAge();
        return;
    }

    function computeEstimatedDueDate() {
        estimatedDueDate.setText("");
        if (freemedforms.tools.dateToString(lastMenstrualPeriodItem.currentValue, "ddd dd MMM yyyy") == "Sat 01 Jan 2000") {
            return;
        }
        print("computeEstimatedDueDate()");
        var edd = freemedforms.tools.addWeeks(lastMenstrualPeriodItem.currentValue, 40);                   
        var edd = freemedforms.tools.dateToString(edd, "ddd dd MMM yyyy");
        var eddText = "<b>";
        eddText += edd;
        eddText += "</b>";
        estimatedDueDate.setText(eddText);        

    }

    function computeGestationalAge() {                                        
        print("computeGestationalAge()");
        var edd = freemedforms.tools.addWeeks(lastMenstrualPeriodItem.currentValue, 40);
        var days = freemedforms.tools.daysTo(new Date(), edd);
        var GAdays = (280 - days);
        var GAweeks = (GAdays - GAdays%7) / 7;
        var GAdays = GAdays%7;
        currentWeeksAmenorrhoeaWeeksValue.setText(GAweeks);
        currentWeeksAmenorrhoeaDaysValue.setText(GAdays);
    }

    function setLmpDefault() {
        print("setLmpDefault");
        useLmpItem.checked = true;
        return;
    }

    function setDefaults() {                                                  
        print("setDefaults");                                                 
        lastMenstrualPeriodItem.currentValue = (new Date());                    
        estimatedDueDate.setText("");                                           
        return;                                                                 
    }

    function setLmp() {
        if (useLmpItem.checked && !useDateOfConceptionItem.checked) return;
        
        print("setLmp()");
        
        if (useLmpItem.checked && useDateOfConceptionItem.checked) {
        useDateOfConceptionItem.checked = false;
        }
        if (!useLmpItem.checked && !useDateOfConceptionItem.checked) {            
        useDateOfConceptionItem.checked = true;                                
        }
        
        print("useLmpItem.checked = " + useLmpItem.checked);
        print("useDateOfConceptionItem.checked = " + useDateOfConceptionItem.checked);
        
        computeEstimatedDueDate();
        computeGestationalAge();
    }

    function setDateOfConception() {
        if (useDateOfConception.checked && !useLmpItem.checked) return;                                                         
        
        print("useDateOfConception()");
        
        if (useLmpItem.checked && useDateOfConceptionItem.checked) {
            useLmpItem.checked = false;
        }
        if (!useLmpItem.checked && !useDateOfConceptionItem.checked) {            
            useLmpItem.checked = true;                                         
        }                                                                                  
        print("useLmpItem.checked = " + useLmpItem.checked);
        print("useDateOfConceptionItem.checked = " + useDateOfConceptionItem.checked);

        print("LMP current value :" + lastMenstrualPeriodItem.currentValue);
     
        computeEstimatedDueDate();                                              
        computeGestationalAge();                         
    }

});

namespace.com.freemedforms.obstetrics.prenatal.setupUi();
namespace.com.freemedforms.obstetrics.prenatal.setDefaults();
