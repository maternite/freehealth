namespace.module('com.freemedforms.anesthesiology', function (exports, require) {

    exports.extend({
                       'anesthesiology_setupUi': anesthesiology_setupUi,
                       'anesthesiology_computePulsePressure': anesthesiology_computePulsePressure,
	               'anesthesiology_computeBMI' : anesthesiology_computeBMI,
                       'anesthesiology_printComboChange' : anesthesiology_printComboChange
                   });

    // Ui vars (retrieved from the ui)
    var syst, diast, pulse;
    var weight, weightUnit, weightUnitItem, height, heightUnit, heightUnitItem, bmiValueLabel, bmiValueLineEdit;

    (function () {                                                              
    var x = "*******************Anesthesiology********************************";                                  
    print(x);      // I will invoke myself                                      
    anesthesiology_setupUi();                                                       
    //anesthesiology_hideBmiLineEdit();                                                     
    })();

    function anesthesiology_setupUi() {
        print("com.freemedforms.anesthesiology Setup UI");
        freemedforms.forms.namespaceInUse = "";
        var formItem = freemedforms.forms.item("Maternity::Anesthesiology::Consultation");
        print(formItem);
        formUi = formItem.ui();
        syst = formUi.findChild("bloodPressureSystolicValue");
        diast = formUi.findChild("bloodPressureDiastolicValue");
        pulse = formUi.findChild("bloodPressurePulseValue");
        bmiValueLabel = formUi.findChild("bmiValueLabel");
        bmiValueLineEdit = formUi.findChild("bmiValueLineEdit");
        weight = formUi.findChild("weightValue");
        weightUnit = formUi.findChild("weightUnit");
        weightUnitItem = freemedforms.forms.item("Maternity::Anesthesiology::Consultation::ObjectiveGroup::Weight::Value");
        height = formUi.findChild("heightValue");
        heightUnit = formUi.findChild("heightUnit");
        heightUnitItem = freemedforms.forms.item("Maternity::Anesthesiology::Consultation::ObjectiveGroup::Height::Value");

        //populateCombos();

        // connect data changed on spins
        syst['valueChanged(int)'].connect(this, anesthesiology_computePulsePressure);
        diast['valueChanged(int)'].connect(this, anesthesiology_computePulsePressure);

        weight['valueChanged(double)'].connect(this, anesthesiology_computeBMI);
        height['valueChanged(double)'].connect(this, anesthesiology_computeBMI);
        weightUnit['currentIndexChanged(int)'].connect(this, anesthesiology_computeBMI);
        heightUnit['currentIndexChanged(int)'].connect(this, anesthesiology_computeBMI);
        // hide bmiValueLineEdit                                                
        bmiValueLineEdit.visible = false;

    }

//    function retranslateUi() {
//        var lang = freemedforms.forms.currentLanguage;
//    }

//    function populateCombos() {
        // TODO: add weight and height units
//        freemedforms.uiTools.addItems(cholCombo, totalCholRanges);
//        freemedforms.uiTools.addItems(hdlCombo, hdlCholRanges);
//        freemedforms.uiTools.addItems(systCombo, systolicRanges);
//    }

//    function prepareSlider() {
//
//    }

    function anesthesiology_computePulsePressure() {
        var text = syst.value - diast.value;
        pulse.setText(text);
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

    function anesthesiology_computeBMI() {
        //print("Combo has changed");        
        //var textbmi  = (weight.value) / ((height.value) * (height.value));
        //bmiValueLabel.setText(textbmi);
        //bmiValueLineEdit.setText(textbmi);
        // weight unit kilogram                                                 
        // height unit meter                                                    
        var weightUnit = weightUnitItem.currentText;                            
        var weightValue = Number(weight.value);                                 
        var weightKilogram = weightToKilogram(weightUnit, weightValue);             
                                                                                
        var heightUnit = heightUnitItem.currentText;                            
        var heightValue = Number(height.value);                                 
        var heightMeter = heightToMeter(heightUnit, heightValue);                   
                                                                                
        var bmi  = (weightKilogram) / ((heightMeter) * (heightMeter));          
        bmi = roundToOne(bmi);                                                  
        var textbmi = bmi.toString();                                           
        if (!isNaN(bmi)) {                                                      
        bmiValueLineEdit.setText(textbmi);                                      
        bmiValueLabel.setText(textbmi);                                         
        } else {                                                                
        bmiValueLineEdit.setText("");                                           
        bmiValueLabel.setText("");                                              
        }
    }

    function anesthesiology_printComboChange() {

    print("Combo has changed");
    }
});

namespace.com.freemedforms.anesthesiology.anesthesiology_setupUi();
