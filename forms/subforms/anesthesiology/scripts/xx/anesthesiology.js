namespace.module('com.freemedforms.generic.pediatrics', function (exports, require) {

    exports.extend({
                       'setupUi': setupUi,
                       'computePulsePressure': computePulsePressure,
	               'computeBMI' : computeBMI
                   });

    // Ui vars (retrieved from the ui)
    var syst, diast, pulse;
    var weight, weightUnit, height, heightUnit, bmi;

    function setupUi() {
        print("com.freemedforms.generic.pediatrics Setup UI");
        freemedforms.forms.namespaceInUse = "";
        var formItem = freemedforms.forms.item("Maternity::Pediatrics::Consultation");
        print(formItem);
        formUi = formItem.ui();
        syst = formUi.findChild("bloodPressureSystolicValue");
        diast = formUi.findChild("bloodPressureDiastolicValue");
        pulse = formUi.findChild("bloodPressurePulseValue");
        bmi = formUi.findChild("bmiValue");
        weight = formUi.findChild("weightValue");
        weightUnit = formUi.findChild("weightUnit");
        height = formUi.findChild("heightValue");
        heightUnit = formUi.findChild("heightUnit");

        populateCombos();

        // connect data changed on spins
        syst['valueChanged(int)'].connect(this, computePulsePressure);
        diast['valueChanged(int)'].connect(this, computePulsePressure);

        weight['valueChanged(double)'].connect(this, computeBMI);
        height['valueChanged(double)'].connect(this, computeBMI);
        weightUnit['currentIndexChanged(int)'].connect(this, computeBMI);
        heightUnit['currentIndexChanged(int)'].connect(this, computeBMI);

    }

    function retranslateUi() {
        var lang = freemedforms.forms.currentLanguage;
    }

    function populateCombos() {
        // TODO: add weight and height units
//        freemedforms.uiTools.addItems(cholCombo, totalCholRanges);
//        freemedforms.uiTools.addItems(hdlCombo, hdlCholRanges);
//        freemedforms.uiTools.addItems(systCombo, systolicRanges);
    }

    function prepareSlider() {

    }

    function computePulsePressure() {
        var text = syst.value - diast.value;
        pulse.setText(text);
    }

    function computeBMI() {
        var textbmi  = (weight.value) / ((height.value) * (height.value));
        bmi.setText(textbmi);
    }

});

namespace.com.freemedforms.generic.pediatrics.setupUi();
