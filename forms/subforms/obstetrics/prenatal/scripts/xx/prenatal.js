namespace.module('com.freemedforms.obstetrics.prenatal', function (exports, require) {

    exports.extend({
        'prenatal_setupUi': prenatal_setupUi,
        'prenatal_setDefaults': prenatal_setDefaults,
        'prenatal_hideFetusGroupBox': prenatal_hideFetusGroupBox,
        'prenatal_computePulsePressure': prenatal_computePulsePressure,
        'prenatal_computeWeightGain': prenatal_computeWeightGain,
        'prenatal_computeFatigueScore': prenatal_computeFatigueScore,
        'prenatal_chooseDateToUse': prenatal_chooseDateToUse,
        'prenatal_computeEstimatedDueDate': prenatal_computeEstimatedDueDate,
        'prenatal_computeGestationalAge': prenatal_computeGestationalAge,
        'prenatal_setLmp': prenatal_setLmp,
        'prenatal_setDateOfConception': prenatal_setDateOfConception,
        'prenatal_setLmpDefault': prenatal_setLmpDefault,
        'prenatal_computeBMI': prenatal_computeBMI
    });

    var prenatal_fetusNumber, prenatal_fetusGroup1, prenatal_fetusGroup2, prenatal_fetusGroup3, prenatal_fetusGroup4, prenatal_fetusGroup5, prenatal_fetusGroup6;
    var prenatal_syst, prenatal_diast, prenatal_pulse;
    var prenatal_weight, prenatal_weightPrePregnancy, prenatal_weightGain, prenatal_weightGainLineEdit;
    var prenatal_fatigueScore, prenatal_fatigueScoreLineEdit, prenatal_standing, prenatal_industrial, prenatal_repetitive, prenatal_physical, prenatal_hardness;
    var prenatal_gestationalAge, prenatal_dateToUse, prenatal_estimatedDueDate, prenatal_lastMenstrualPeriodUi, prenatal_lastMenstrualPeriodItem, prenatal_conceptionDateUi, prenatal_conceptionDateItem, prenatal_useLmp, prenatal_useLmpItem, prenatal_useDateOfConception, prenatal_useDateOfConceptionItem, defaultDate;
    // BMI variables
    var prenatal_weightUnit, prenatal_weightUnitItem, prenatal_height, prenatal_heightUnit, prenatal_heightUnitItem, prenatal_bmiValueLabel, prenatal_bmiValueLineEdit;

    function prenatal_setupUi() {

        print("com.freemedforms.obstetrics.prenatal Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var prenatal_formItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal");   
        print(prenatal_formItem);                                                        
        prenatal_formUi = prenatal_formItem.ui();

        // fetus                                                 
        prenatal_fetusNumber = prenatal_formUi.findChild("fetusNumberSpinBox");                                      
        prenatal_fetusGroup1 = prenatal_formUi.findChild("fetus1GroupBox"); 
        prenatal_fetusGroup2 = prenatal_formUi.findChild("fetus2GroupBox");
        prenatal_fetusGroup3 = prenatal_formUi.findChild("fetus3GroupBox");                                   
        prenatal_fetusGroup4 = prenatal_formUi.findChild("fetus4GroupBox");
        prenatal_fetusGroup5 = prenatal_formUi.findChild("fetus5GroupBox");
        prenatal_fetusGroup6 = prenatal_formUi.findChild("fetus6GroupBox");
        prenatal_defaultHideFetusGroupBox();

        // pulse
        prenatal_syst = prenatal_formUi.findChild("bloodPressureSystolicValue");                                      
        prenatal_diast = prenatal_formUi.findChild("bloodPressureDiastolicValue");                                    
        prenatal_pulse = prenatal_formUi.findChild("bloodPressurePulseValue");

        // weight
        prenatal_weight = prenatal_formUi.findChild("weightValue");
        prenatal_weightPrePregnancy = prenatal_formUi.findChild("prePregnancyWeightValue");
        prenatal_weightGain = prenatal_formUi.findChild("weightGainValue");
        prenatal_weightGainLineEdit = prenatal_formUi.findChild("weightGainValueLineEdit");

        // fatigue score
        prenatal_standing = prenatal_formUi.findChild("standingCheck");
        prenatal_industrial = prenatal_formUi.findChild("industrialCheck");
        prenatal_repetitive = prenatal_formUi.findChild("repetitiveCheck");
        prenatal_physical = prenatal_formUi.findChild("physicalCheck");
        prenatal_hardness = prenatal_formUi.findChild("hardnessCheck");
        prenatal_fatigueScoreLineEdit = prenatal_formUi.findChild("fatigueScoreTotalLineEdit");

        // obstetrical calendar
        defaultDate = "01011900";
        prenatal_lastMenstrualPeriodUi = prenatal_formUi.findChild("lastMenstrualPeriodDateEdit");
        prenatal_lastMenstrualPeriodItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObstetricalCalendar::LastMentrualPeriod");
        prenatal_conceptionDateUi = prenatal_formUi.findChild("conceptionDateDateEdit");
        prenatal_conceptionDateItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObstetricalCalendar::ConceptionDate");
        prenatal_useLmp = prenatal_formUi.findChild("useLmpCheck");
        prenatal_useLmpItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObstetricalCalendar::UseLMP::Check");
        prenatal_useDateOfConception = prenatal_formUi.findChild("useDateOfConceptionCheck");
        prenatal_useDateOfConceptionItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObstetricalCalendar::UseConceptionDate::Check");        
        prenatal_currentWeeksAmenorrhoeaWeeksValue = prenatal_formUi.findChild("currentWeeksAmenorrhoeaWeeksValueLabel");        
        prenatal_currentWeeksAmenorrhoeaDaysValue = prenatal_formUi.findChild("currentWeeksAmenorrhoeaDaysValueLabel");       
        prenatal_estimatedDueDate = prenatal_formUi.findChild("eddValueLabel");
        prenatal_setDefaults();
        prenatal_setLmpDefault();
        prenatal_computeGestationalAge();

        // BMI
        prenatal_bmiValueLabel = formUi.findChild("bmiValueLabel");                      
        prenatal_bmiValueLineEdit = formUi.findChild("bmiValueLineEdit");                
        //weight = formUi.findChild("weightValue");                               
        prenatal_weightUnit = formUi.findChild("weightUnit");                            
        prenatal_weightUnitItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObjectiveGroup::Weight::Value");
        prenatal_height = formUi.findChild("heightValue");                               
        prenatal_heightUnit = formUi.findChild("heightUnit");                            
        prenatal_heightUnitItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::ObjectiveGroup::Height::Value");

        // fetus connection
        prenatal_fetusNumber['valueChanged(int)'].connect(this, prenatal_hideFetusGroupBox);

        // pulse connection
        prenatal_syst['valueChanged(int)'].connect(this, prenatal_computePulsePressure);          
        prenatal_diast['valueChanged(int)'].connect(this, prenatal_computePulsePressure);
        
        // weight connection
        prenatal_weight['valueChanged(double)'].connect(this, prenatal_computeWeightGain);          
        prenatal_weightPrePregnancy['valueChanged(double)'].connect(this, prenatal_computeWeightGain);
        
        // fatigue score connection
        prenatal_standing['stateChanged(int)'].connect(this, prenatal_computeFatigueScore);
        prenatal_industrial['stateChanged(int)'].connect(this, prenatal_computeFatigueScore);
        prenatal_repetitive['stateChanged(int)'].connect(this, prenatal_computeFatigueScore);
        prenatal_physical['stateChanged(int)'].connect(this, prenatal_computeFatigueScore);
        prenatal_hardness['stateChanged(int)'].connect(this, prenatal_computeFatigueScore);

        // obstetrical calendar connection
        //useLmp['stateChanged(int)'].connect(this, chooseDateToUse);
        //useDateOfConception['stateChanged(int)'].connect(this, chooseDateToUse);
        //lastMenstrualPeriod['dateChanged(int)'].connect(this, chooseDateToUse);  
        //conceptionDate['dateChanged()'].connect(this, chooseDateToUse);

        //BMI connections
        prenatal_weight['valueChanged(double)'].connect(this, prenatal_computeBMI);
        prenatal_height['valueChanged(double)'].connect(this, prenatal_computeBMI);
        prenatal_weightUnit['currentIndexChanged(int)'].connect(this, prenatal_computeBMI);
        prenatal_heightUnit['currentIndexChanged(int)'].connect(this, prenatal_computeBMI);
        // hide bmiValueLineEdit                                                
        prenatal_bmiValueLineEdit.visible = false;

        // hide prenatal_weightGainLineEdit
        prenatal_weightGainLineEdit.visible = false;

    }
    
    // fetus functions

    function prenatal_defaultHideFetusGroupBox() {
            print("default to 1 visible fetusGroup");                                                    
            prenatal_fetusGroup1.visible = true;                                         
            prenatal_fetusGroup2.visible = false;                                        
            prenatal_fetusGroup3.visible = false;                                        
            prenatal_fetusGroup4.visible = false;                                        
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;                                        
        }

    function prenatal_hideFetusGroupBox() {
            print("fetusNumber = " + prenatal_fetusNumber.value);
        if (prenatal_fetusNumber.value == 0) {
            print("if = 0");
            prenatal_fetusGroup1.visible = false;
            prenatal_fetusGroup2.visible = false;
            prenatal_fetusGroup3.visible = false;
            prenatal_fetusGroup4.visible = false;                                        
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;
        }
        else if (prenatal_fetusNumber.value == 1) {
            print("if = 1");
            prenatal_fetusGroup1.visible = true;                                      
            prenatal_fetusGroup2.visible = false;                                      
            prenatal_fetusGroup3.visible = false;
            prenatal_fetusGroup4.visible = false;                                         
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;
        }
        else if (prenatal_fetusNumber.value == 2) {
            print("if = 2");                                                
            prenatal_fetusGroup1.visible = true;                                       
            prenatal_fetusGroup2.visible = true;                                   
            prenatal_fetusGroup3.visible = false;
            prenatal_fetusGroup4.visible = false;                                         
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;                                      
        }  
        else if (prenatal_fetusNumber.value == 3) {
            print("if = 3");                                                
            prenatal_fetusGroup1.visible = true;                                       
            prenatal_fetusGroup2.visible = true;                                      
            prenatal_fetusGroup3.visible = true;
            prenatal_fetusGroup4.visible = false;                                         
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;                                     
        }
        else if (prenatal_fetusNumber.value == 4) {                                      
            print("if = 4");                                                    
            prenatal_fetusGroup1.visible = true;                                         
            prenatal_fetusGroup2.visible = true;                                         
            prenatal_fetusGroup3.visible = true;
            prenatal_fetusGroup4.visible = true;
            prenatal_fetusGroup5.visible = false;
            prenatal_fetusGroup6.visible = false;                                         
        }
        else if (prenatal_fetusNumber.value == 5) {                                      
            print("if = 5");                                                    
            prenatal_fetusGroup1.visible = true;                                         
            prenatal_fetusGroup2.visible = true;                                         
            prenatal_fetusGroup3.visible = true;                                         
            prenatal_fetusGroup4.visible = true;                                         
            prenatal_fetusGroup5.visible = true;
            prenatal_fetusGroup6.visible = false;                                        
        }
        else if (prenatal_fetusNumber.value == 6) {                             
            print("if = 6");                                                    
            prenatal_fetusGroup1.visible = true;                                
            prenatal_fetusGroup2.visible = true;                                
            prenatal_fetusGroup3.visible = true;                                
            prenatal_fetusGroup4.visible = true;                                
            prenatal_fetusGroup5.visible = true;                                
            prenatal_fetusGroup6.visible = true;                               
        }
        else {
            print("not coded yet sorry");
        }
    }

    // pulse function

    function prenatal_computePulsePressure() {                                           
        var prenatal_text = prenatal_syst.value - prenatal_diast.value;                                    
        prenatal_pulse.setText(prenatal_text);                                                    
    }

    // weight gain function

    function prenatal_computeWeightGain() {
        var prenatal_text = prenatal_weight.value - prenatal_weightPrePregnancy.value;                                    
        prenatal_weightGain.setText(prenatal_text);
        prenatal_weightGainLineEdit.setText(prenatal_text);
    }

    // fatigue score function

    function prenatal_computeFatigueScore() {
        print("computeFatigueScore()");
        prenatal_fatigueScore = (prenatal_standing.checked == true) + (prenatal_industrial.checked == true) + (prenatal_repetitive.checked == true) + (prenatal_physical.checked == true) + (prenatal_hardness.checked == true);
        prenatal_fatigueScoreLineEdit.setText(prenatal_fatigueScore);
    }

    // obstetrical calendar functions

    function prenatal_chooseDateToUse() {
        print("prenatal_chooseDateToUse()");
        var prenatal_empty = "";
        prenatal_estimatedDueDate.setText(prenatal_empty);
        prenatal_currentWeeksAmenorrhoeaWeeksValue.setText(prenatal_empty);
        prenatal_currentWeeksAmenorrhoeaDaysValue.setText(prenatal_empty);
        if (!prenatal_useLmpItem.checked && !prenatal_useDateOfConceptionItem.checked) {
        prenatal_setLmpDefault();
        }
        prenatal_computeEstimatedDueDate();
        prenatal_computeGestationalAge();
    }

    function prenatal_computeEstimatedDueDate() {
        var prenatal_empty = "";
        prenatal_estimatedDueDate.setText(prenatal_empty);
        prenatal_currentWeeksAmenorrhoeaWeeksValue.setText(prenatal_empty);                     
        prenatal_currentWeeksAmenorrhoeaDaysValue.setText(prenatal_empty);
        if (freemedforms.tools.dateToString(prenatal_lastMenstrualPeriodItem.currentValue, "ddMMyyyy") == defaultDate) {
            print("inside computeEstimatedDueDate()-> lmp=01/01/1900 -> return");
            return;
        }
        print("prenatal_computeEstimatedDueDate()");
        var prenatal_edd = freemedforms.tools.addWeeks(prenatal_lastMenstrualPeriodItem.currentValue, 40);                   
        var prenatal_edd = freemedforms.tools.dateToString(prenatal_edd, "ddd dd MMM yyyy");
        var prenatal_eddText = "<b>";
        prenatal_eddText += prenatal_edd;
        prenatal_eddText += "</b>";
        prenatal_estimatedDueDate.setText(prenatal_eddText);        

    }

    function prenatal_computeGestationalAge() {
        var prenatal_emptyGA = "";
        prenatal_currentWeeksAmenorrhoeaWeeksValue.setText(prenatal_emptyGA);                     
        prenatal_currentWeeksAmenorrhoeaDaysValue.setText(prenatal_emptyGA);
        if (freemedforms.tools.dateToString(prenatal_lastMenstrualPeriodItem.currentValue, "ddMMyyyy") == defaultDate) {
            print("inside prenatal_computeGestationalAge()-> lmp=01/01/1900 -> return");
            return;                                                             
        }                                        
        print("prenatal_computeGestationalAge()");
        var prenatal_edd = freemedforms.tools.addWeeks(prenatal_lastMenstrualPeriodItem.currentValue, 40);
        var prenatal_days = freemedforms.tools.daysTo(new Date(), prenatal_edd);
        var prenatal_GAdays = (280 - prenatal_days);
        var prenatal_GAweeks = (prenatal_GAdays - prenatal_GAdays%7) / 7;
        var prenatal_GAdays = prenatal_GAdays%7;
        var prenatal_GAweeksText = "<b>";
        prenatal_GAweeksText += prenatal_GAweeks;
        prenatal_GAweeksText += "</b>";
        var prenatal_GAdaysText = "<b>";                                                
        prenatal_GAdaysText += prenatal_GAdays;                                                 
        prenatal_GAdaysText += "</b>";
        prenatal_currentWeeksAmenorrhoeaWeeksValue.setText(prenatal_GAweeksText);
        prenatal_currentWeeksAmenorrhoeaDaysValue.setText(prenatal_GAdaysText);
         print("prenatal_ComputeGestationalAge() end");
    }

    function prenatal_setLmpDefault() {
        print("prenatal_setLmpDefault");
        prenatal_useLmpItem.checked = true;
        return;
    }

    function prenatal_setDefaults() {                                                  
        print("prenatal_setDefaults");                                                 
        prenatal_lastMenstrualPeriodItem.currentValue = (new Date());                    
        prenatal_estimatedDueDate.setText("");                                           
        return;                                                                 
    }

    function prenatal_setLmp() {
        if (prenatal_useLmpItem.checked && !prenatal_useDateOfConceptionItem.checked) return;
        
        if (prenatal_useLmpItem.checked && prenatal_useDateOfConceptionItem.checked) {
            prenatal_useDateOfConceptionItem.checked = false;
        }
        if (!prenatal_useLmpItem.checked && !prenatal_useDateOfConceptionItem.checked) {            
            prenatal_useDateOfConceptionItem.checked = true;
        }
        
        prenatal_computeEstimatedDueDate();
        prenatal_computeGestationalAge();
    }

    function prenatal_setDateOfConception() {
        if (prenatal_useDateOfConception.checked && !prenatal_useLmpItem.checked) return;                                                         
                
        if (prenatal_useLmpItem.checked && prenatal_useDateOfConceptionItem.checked) {
            prenatal_useLmpItem.checked = false;
        }
        if (!prenatal_useLmpItem.checked && !prenatal_useDateOfConceptionItem.checked) {            
            prenatal_useLmpItem.checked = true;
        }                                                                                  
        prenatal_computeEstimatedDueDate();                                              
        prenatal_computeGestationalAge();
    }

    function roundToOne(num) {                                                  
        return +(Math.round(num + "e+1")  + "e-1");                             
    }

    function weightToKilogram(weightUnit, weightValue) {                        
        print(weightUnit, weightValue);                                          
        var ounceToKilogram = 0.028349523125; //International avoirdupois ounce 
        var poundToKilogram = 0.45359237; //International avoirdupois pound     
        var gramToKilogram = 0.001;                                             
        var kilogram = "Kilogram";                                              
        var gram = "Gram";                                                      
        var ounce = "Ounce";                                                    
        var pound = "Pound";                                                    
        if (~weightUnit.indexOf(gram)) {                                        
            print("gram to kg", weightValue*gramToKilogram);                    
            return weightValue*gramToKilogram;                                  
        } else if (~weightUnit.indexOf(kilogram)) {                             
            return weightValue;                                                 
        } else if (~weightUnit.indexOf(ounce)) {                                
            return weightValue*ounceToKilogram;                                 
        } else if (~weightUnit.indexOf(pound)) {                                
            return weightValue*poundToKilogram;                                 
        }                                                                       
    }

    function heightToMeter(heightUnit, heightValue) {
        print(heightUnit, heightValue);                           
        var centimeterToMeter = 0.01;                                           
        var inchToMeter = 0.0254;                                               
        var footToMeter = 0.3048;                                               
        var centimeter = "Centimeter";                                          
        var meter = "Meter";                                                    
        var inch = "Inch";                                                      
        var foot = "Foot";                                                      
        if (~heightUnit.indexOf(centimeter)) {                                  
            return heightValue*centimeterToMeter;                               
        } else if (~heightUnit.indexOf(meter)) {                                
            return heightValue;                                                 
        } else if (~heightUnit.indexOf(inch)) {                                 
            return heightValue*inchToMeter;                                     
        } else if (~heightUnit.indexOf(foot)) {                                 
            return heightValue*footToMeter;                                     
        }                                                                       
    }

    function prenatal_computeBMI() {
        print("Combo has changed");        
        //var textbmi  = (weight.value) / ((height.value) * (height.value));
        //bmiValueLabel.setText(textbmi);
        //bmiValueLineEdit.setText(textbmi);
        // weight unit kilogram                                                 
        // height unit meter                                                    
        var weightUnit = prenatal_weightUnitItem.currentText;                            
        var weightValue = Number(prenatal_weight.value);                                 
        var weightKilogram = weightToKilogram(weightUnit, weightValue);             
                                                                                
        var heightUnit = prenatal_heightUnitItem.currentText;                            
        var heightValue = Number(prenatal_height.value);                                 
        var heightMeter = heightToMeter(heightUnit, heightValue);                   
                                                                                
        var bmi  = (weightKilogram) / ((heightMeter) * (heightMeter));          
        bmi = roundToOne(bmi);                                                  
        var textbmi = bmi.toString();                                           
        if (!isNaN(bmi)) {                                                      
        prenatal_bmiValueLineEdit.setText(textbmi);                                      
        prenatal_bmiValueLabel.setText(textbmi);                                         
        } else {                                                                
        prenatal_bmiValueLineEdit.setText("");                                           
        prenatal_bmiValueLabel.setText("");                                              
        }
    }
});

namespace.com.freemedforms.obstetrics.prenatal.prenatal_setupUi();
namespace.com.freemedforms.obstetrics.prenatal.prenatal_setDefaults();
