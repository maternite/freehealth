namespace.module('com.freemedforms.anesthesiology', function (exports, require) {

    exports.extend({
                       'anesthesiology_setupUi': anesthesiology_setupUi,
                       'anesthesiology_computePulsePressure': anesthesiology_computePulsePressure,
	               'anesthesiology_computeBMI' : anesthesiology_computeBMI,
                       'anesthesiology_printComboChange' : anesthesiology_printComboChange
                   });

    // Ui vars (retrieved from the ui)
    var syst, diast, pulse;
    var weight, weightUnit, height, heightUnit, bmiValueLabel, bmiValueLineEdit;

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
        height = formUi.findChild("heightValue");
        heightUnit = formUi.findChild("heightUnit");

        //populateCombos();

        // connect data changed on spins
        syst['valueChanged(int)'].connect(this, computePulsePressure);
        diast['valueChanged(int)'].connect(this, computePulsePressure);

        weight['valueChanged(double)'].connect(this, computeBMI);
        height['valueChanged(double)'].connect(this, computeBMI);
        weightUnit['currentIndexChanged(int)'].connect(this, computeBMI);
        heightUnit['currentIndexChanged(int)'].connect(this, computeBMI);
//        weightUnit['currentIndexChanged(int)'].connect(this, printComboChange);

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

    function anesthesiology_computeBMI() {
        //print("Combo has changed");        
        var textbmi  = (weight.value) / ((height.value) * (height.value));
        bmiValueLabel.setText(textbmi);
        //bmiValueLineEdit.setText(textbmi);
    }

    function anesthesiology_printComboChange() {

    print("Combo has changed");
    }
});

namespace.com.freemedforms.anesthesiology.anesthesiology_setupUi();
