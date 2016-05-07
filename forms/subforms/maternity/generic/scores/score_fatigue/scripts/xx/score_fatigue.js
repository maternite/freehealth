namespace.module('com.freemedforms.obstetrics.score.fatigue', function (exports, require) {

  // Ui vars (retrieved from the ui)
  var scoreFatigue;
  var showDrawing;
  var clearButton;
  var buttonText = [ "fr" , "xx" ];

  exports.extend({
    'setupUi': setupUi
  });

                     function setupUi() {
                         getUiElements();
                         createVariableContent();
                         connectUiElements();
                         retranslateUi();
                     }

                     function getUiElements() {
                         freemedforms.forms.namespaceInUse = "";
                         scoreFatigue = freemedforms.forms.item("Maternity::Obstetrics::Prenatal::Score::Fatigue");
                         freemedforms.forms.namespaceInUse = "Maternity::Obstetrics::Prenatal::Score::Fatigue";
                         var ui = scoreFatigue.ui();
                         clearButton = ui.findChild("clearButton");
                     }

                     function createVariableContent() {
                         // Two options :
                         buttonText["fr"] = [ "Tout effacer" ];
                         buttonText["xx"] = [ "Clear all" ];
                     }

                     function connectUiElements() {
                         freemedforms.forms.languageChanged.connect(this, retranslateUi);
                         clearButton.clicked.connect(this, clearCheckboxes);
                     }

                     function retranslateUi() {
                         print("retranslateUi()");
                         // Find the optionsText language
                         var lang = freemedforms.forms.currentLanguage;
                         if (buttonText[lang].length <= 0) {
                             lang = "xx";
                             print("lang = " + lang);
                         }
                         for(var i=0; i < buttonText[lang].length; i++) {
                             print("buttonText[lang][i] = " + buttonText[lang][i]);
                             clearButton.setText(buttonText[lang][i]);
                         }
                     }

                     function clearCheckboxes() {
                         var checked = false;
                         freemedforms.forms.namespaceInUse = "";
                         var items = scoreFatigue.childrenUuid();

                         for(var i=0; i < items.length; i++) {
                             freemedforms.forms.item(items[i]).checked = checked;
                         }
                     }
});

namespace.com.freemedforms.obstetrics.score.fatigue.setupUi();
