namespace.module('com.freemedforms.tools.obstetrics.pregnancycalendar', function (exports, require) {

    exports.extend({
                       'setupUi': setupUi,
                       'retranslateUi': retranslateUi,
                       'lmpDateChanged': lmpDateChanged,
                       'conceptionDateChanged' : conceptionDateChanged,
                       'computeCurrentWA' : computeCurrentWA,
                       'clearLastMenstrualPeriod' : clearLastMenstrualPeriod,
                       'enableLastMenstrualPeriod' : enableLastMenstrualPeriod,
                       'disableLastMenstrualPeriod' : enableLastMenstrualPeriod,
                       'connectUiElements' : connectUiElements
                   });

    // Ui vars (retrieved from the form)
    var lmp, conceptionDate, firstEcho, secondEcho, thirdEcho, currentWeeks, currentDays, term, dateLMPwidget, LMPCheck, ui;
    var termtext_fr = "Terme prévu le (41éme SA) ";
    var termtext_xx = "Estimated due date (41th WA) ";

    function setupUi() {
        print("com.freemedforms.tools.obstetrics.pregnancycalendar Setup UI");
        freemedforms.forms.namespaceInUse = "";
        var formItem = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar");
        //freemedforms.forms.namespaceInUse = "Subs::Tools::Obstetrics::Calendar";
        var ui = formItem.ui();
        print(formItem);
        lmp = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::LastMentrualPeriod");
        conceptionDate = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::ConceptionDate");
        firstEcho = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::FirstUltrasound");
        secondEcho = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::SecondUltrasound");
        thirdEcho = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::ThirdUltrasound");
        currentWeeks = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::CurrentWeeksAmenorrhoeaWeeks");
        currentDays = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::CurrentWeeksAmenorrhoeaDays");
        term = freemedforms.forms.item("Subs::Tools::Obstetrics::Calendar::TermGroup::Term");
        freemedforms.forms.namespaceInUse = "";
        dateLMPwidget = ui.findChild("lastMenstrualPeriodDateEdit");
        LMPCheck = ui.findChild("lastMenstrualPeriodCheckBox");

        // Let's try to put connections here:
        LMPCheck.checked.connect(this, enableLastMenstrualPeriod);              
        LMPCheck.unchecked.connect(this, disableLastMenstrualPeriod);           
        freemedforms.forms.languageChanged.connect(this, reTranslateUi);        
        dateLMPwidget['valueChanged(int)'].connect(this, lmpDateChanged);
    }

    function connectUiElements() {
        print("ConnectUiElements()");
        LMPCheck.checked.connect(this, enableLastMenstrualPeriod);
        LMPCheck.unchecked.connect(this, disableLastMenstrualPeriod);
        freemedforms.forms.languageChanged.connect(this, reTranslateUi);
        dateLMPwidget['valueChanged(int)'].connect(this, lmpDateChanged);
        
    }

    function clearLastMenstrualPeriod() {
        print("clearLastMenstrualPeriod()");
        dateLMPwidget.clear();
        print("LMP current value:" + lmp.currentValue);
        print("LMP current text:" + lmp.currentText);
        print("dateLMPwidget current value:" + dateLMPwidget.currentValue);
        print("dateLMPwidget current text:" + dateLMPwidget.currentText);
    }        

    function disableLastMenstrualPeriod() {
        print("disableLastMenstrualPeriod()");
        dateLMPwidget.enabled = false;
    }

    function enableLastMenstrualPeriod() {
        print("clearLastMenstrualPeriod()");                                     
        dateLMPwidget.enabled = true;                                        
    }

    function retranslateUi() {
        print("retranslateUi()");
        var lang = freemedforms.forms.currentLanguage;
        print("language: " + lang);
    }

    function conceptionDateChanged() {
        if (!conceptionDate.isValid)
            return;
        if (conceptionDate.currentValue.isNull || conceptionDate.currentValue === "")
            return;
        // This member is automatically connected to the button "Compute" next to the conceptionDate dateeditor
        print("Conception date changed: " + conceptionDate.currentValue);
        computeObstetricalCalendar(conceptionDate.currentValue);
    }

    function lmpDateChanged() {
        // unable to access lmp value
        if (!lmp.isValid)
            return;
        if (lmp.currentValue.isNull || lmp.currentValue === "")
            return;
        // This member is automatically connected to the button "Compute" next to the LMP dateeditor
        print("LMP changed: " + lmp.currentValue);
        computeObstetricalCalendar(lmp.currentValue);
    }

    function computeObstetricalCalendar(fromDate) {
        computeCurrentWA(fromDate);

        // Compute echographies
        var firstEchoDate = freemedforms.tools.addWeeks(fromDate, 12);
        var secondEchoDate = freemedforms.tools.addWeeks(fromDate, 22);
        var thirdEchoDate = freemedforms.tools.addWeeks(fromDate, 32);
        firstEcho.currentText = freemedforms.tools.dateToString(firstEchoDate, "ddd dd MMM yyyy");
        secondEcho.currentText = freemedforms.tools.dateToString(secondEchoDate, "ddd dd MMM yyyy");
        thirdEcho.currentText = freemedforms.tools.dateToString(thirdEchoDate, "ddd dd MMM yyyy");

        // term
        if (freemedforms.forms.currentLanguage=="fr") {
            var termtext = termtext_fr;
        }
        else {
            var termtext = termtext_xx;
        }
        var date = freemedforms.tools.addWeeks(fromDate, 41);
        var date = freemedforms.tools.dateToString(date, "ddd dd MMM yyyy");
        term.currentText = termtext;
        term.currentText += date;
    }

    function computeCurrentWA(fromDate)
    {
        if (!fromDate.isValid || fromDate === "") {
            if (conceptionDate.currentValue !== "")
                fromDate = conceptionDate.currentValue;
            else
                fromDate = lmp.currentValue;
        }
        // unable to access lmp value
        var days = freemedforms.tools.daysTo(fromDate, new Date());
        var weeks = (days - days%7) / 7;
        days = days%7;
        currentDays.currentText = days;
        currentWeeks.currentText = weeks;
    }

    function reTranslateUi() {                                 
        if (freemedforms.forms.currentLanguage=="fr") {        
//                  leftCheck.text = "Gauche";                         
//                             rightCheck.text = "Droite";                        
//                             siteCombo.clear();                                 
//                             freemedforms.uiTools.addItems(siteCombo, mainSites["fr"]);
                         } else {                                               
//                             leftCheck.text = "Left";                           
//                             rightCheck.text = "Right";                         
//                             siteCombo.clear();                                 
//                             freemedforms.uiTools.addItems(siteCombo, mainSites["xx"]);
                         }                                                      
        computeObstetricalCalendar(fromDate)          
    }                 

});

namespace.com.freemedforms.tools.obstetrics.pregnancycalendar.setupUi();

