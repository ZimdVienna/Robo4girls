// Get references to UI elements
let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('input');

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

//Selected device object cache
let deviceCache = null;

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
                                                       name: 'BBC micro:bit[tepup]'
                                                       }]
                                             })
    .then(device => {
          log('"' + device.name + '" bluetooth device selected');
          deviceCache = device;
          
          return deviceCache;
          });
}

//Characteristic object cache
let characteristicCache = null;

//Connect to speccified device, get service and characteristic
function connectDeviceAndCacheCharacteristic(device){
    if(device.gatt.connected && characteristicCache) {
        return Promise.resolve(characteristicCache);
    }
    
    log('Connecting to GATT Server...');
    
    return device.gatt.connect().
    then(server => {
         log('GATT server connected, getting service...');
         
         return server.getPrimaryService('6e400001b5a3f393e0a9e50e24dcca9e');
         }).
    then(service => {
         log('Service found, getting characteristic...');
         return service.getCharacteristic('6e400003b5a3f393e0a9e50e24dcca9e');
         }).
    then(characteristic => {
         log('Characteristic found');
         characteristicCache = characteristic;
         
         return characteristicCache;
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
