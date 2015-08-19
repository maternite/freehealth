namespace.module('com.freemedforms.maternity.obstetrics.prenatal.pulse', function (exports, require) {
                                                                                
    exports.extend({                                                            
                       'setupUi_pulse': setupUi_pulse,                                      
                       'computePulsePressure': computePulsePressure             
                   });                                                          
                                                                                
    // Ui vars (retrieved from the ui)                                          
    var syst, diast, pulse;                                                     
                                                                                
    function setupUi_pulse() {                                                        
        print("com.freemedforms.maternity.obstetrics.prenatal.pulse Setup UI");                 
                                                                                
        // Get items to work with                                               
        freemedforms.forms.namespaceInUse = "";                                 
        var formItem = freemedforms.forms.item("Maternity::Obstetrics::Prenatal");   
        print(formItem);                                                        
        formUi = formItem.ui();                                                 
        syst = formUi.findChild("bloodPressureSystolicValue");                                      
        diast = formUi.findChild("bloodPressureDiastolicValue");                                    
        pulse = formUi.findChild("bloodPressurePulseValue");                                    
                                                                                
//      populateCombos();                                                       
                                                                                
        // Connect data changed on spins                                        
        // Spin should use valueChanged(int)                                    
        // DoubleSpin should use valueChanged(double)                           
                                                                                
        syst['valueChanged(int)'].connect(this, computePulsePressure);          
        diast['valueChanged(int)'].connect(this, computePulsePressure);         
    }                                                                           
                                                                                
    function retranslateUi() {                                                  
        var lang = freemedforms.forms.currentLanguage;                          
    }                                                                           
                                                                                
    function computePulsePressure() {
        print("computePulsePressure()");                                           
        var text = syst.value - diast.value;                                    
        pulse.setText(text);                                                    
    }                                                                           
});                                                                             
                                                                                
namespace.com.freemedforms.maternity.obstetrics.prenatal.pulse.setupUi_pulse(); 
