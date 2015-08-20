namespace.module('com.freemedforms.obstetrics.prenatal', function (exports, require) {

    exports.extend({
        'setupUi': setupUi,
        'hideFetusGroupBox': hideFetusGroupBox,
        'computePulsePressure': computePulsePressure,
        'computeWeightGain': computeWeightGain,
        'computeFatigueScore': computeFatigueScore
    });

    var fetusNumber, fetusGroup1, fetusGroup2, fetusGroup3, fetusGroup4, fetusGroup5;
    var syst, diast, pulse;
    var weight, weightPrePregnancy, weightGain;
    var fatigueScore, fatigueScoreLineEdit, standing, industrial, repetitive, physical, hardness;

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

    }

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

    function computePulsePressure() {                                           
        var text = syst.value - diast.value;                                    
        pulse.setText(text);                                                    
    }

    function computeWeightGain() {
        print("computeWeightGain()");                                           
        var text = weight.value - weightPrePregnancy.value;                                    
        weightGain.setText(text);
        print("computeWeightGain() gain = " + text);                                                   
    }

    function computeFatigueScore() {
        print("computeFatigueScore()");
        fatigueScore = (standing.checked == true) + (industrial.checked == true) + (repetitive.checked == true) + (physical.checked == true) + (hardness.checked == true);
        fatigueScoreLineEdit.setText(fatigueScore);
    }

});

namespace.com.freemedforms.obstetrics.prenatal.setupUi();
