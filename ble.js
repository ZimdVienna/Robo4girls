// Get references to UI elements
let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('input');
var service_uart = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
var microbit_name = "BBC micro:bit [gotuv]";
var name_prefix = "BBC micro:bit";
var uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
var uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
//Selected device object cache
let deviceCache = null;
//Characteristic object cache
let characteristicCache_tx = null;
let characteristicCache_rx = null;

//connect the device on connect button click
connectButton.addEventListener('click',function(){connect();});

//Disconnect from the device on disconnect button click
disconnectButton.addEventListener('click',function(){disconnect();});

//Handle form submit event
sendForm.addEventListener('submit',function(event){
                          event.preventDefault();   //Prevent from sending
                          send(inputField.value);   //send text field content
                          inputField.value = '';    //zero text field
                          inputField.focus();       //focus on text field
                          });

//Launch Bluetooth device chooser and connect to the selected device
function connect(){
    return (deviceCache ? Promise.resolve(deviceCache) :
            requestBluetoothDevice()).
    then(device => connectDeviceAndCacheCharacteristic(device)).
    then(characteristic => startNotifications(characteristic)).
    catch(error => log(error));
}

function requestBluetoothDevice(){
    log('Requesting Bluetooth device...');
    
    return navigator.bluetooth.requestDevice({
                                             filters: [{
                                                       "namePrefix" : name_prefix
                                                       }],
                                             optionalServices: [service_uart]          
                                             })
    .then(device => {
          log('"' + device.name + '" bluetooth device selected');
          deviceCache = device;
          
          return deviceCache;
          });
}

//Connect to speccified device, get service and characteristic
function connectDeviceAndCacheCharacteristic(device){
    if(device.gatt.connected && characteristicCache) {
        return Promise.resolve(characteristicCache);
    }
    
    log('Connecting to GATT Server...');
    
    return device.gatt.connect().
    then(server => {
         log('GATT server connected, getting service...');
         
         return server.getPrimaryService(service_uart);
         }).
    then(service => {
         log('Service found, getting characteristic...');
         return service.getCharacteristic(uart_characteristic_tx);
         }).
    then(characteristic => {
         log('TX Characteristic found: ');
         characteristicCache_tx = characteristic;
         
         return characteristicCache_tx;
         });
    then(service => {
         return service.getCharacteristic(uart_characteristic_rx);
    }).
    then(characteristic => {
         log('Rx Characteristic found: ');
         characteristicCache_rx = characteristic;
         
         return characteristicCache_rx;
         });
}

function startNotifications(characteristic){
    log('Starting notifications...');
    
    return characteristic.startNotifications().
    then(() => {
         log('Notifications started');
         });
}

//Output to terminal
function log(data, type=''){
    terminalContainer.insertAdjacentHTML('beforeend', '<div' + (type ? 'class="' + type + '"' : '') + '>' + data + '</div>');
}

//Disconnect from device
function disconnect(){
    //
}

//Send data to the connected device
function send(data){
    //
}
