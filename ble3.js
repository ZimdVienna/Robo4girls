
const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const reconnectButton = document.getElementById("reconnect");
const terminalContainer = document.getElementById("terminal");
const sendForm = document.getElementById("send-form");
const inputField = document.getElementById("input");

const name_prefix = "BBC micro:bit";
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';  //messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';  //messages to the micro:bit

//save the device for reconnection
var deviceCache = null;
var characteristicCache_tx = null;
var characteristicCache_rx = null;

var buffer = '';

//connect to device on button click
connectButton.addEventListener('click', function(){
    onConnectButtonClick();
});

// Disconnect from the device on Disconnect button click
disconnectButton.addEventListener('click', function() {
    onDisconnectButtonClick();
});

// Reconnect to last device on Reconnect button click
reconnectButton.addEventListener('click', function(){
    onReconnectButtonClick();
})

// Handle input to form
sendForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form sending
  send(inputField.value); // Send text field contents
  inputField.value = '';  // Zero text field
  inputField.focus();     // Focus on text field
});

/* ******************* FUNCTIONS ******************* */

// Output to terminal
function log(data, type = '') {
    terminalContainer.insertAdjacentHTML('beforeend','<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
}

/* BUTTON FUNCTIONS */

//disconnect
function onDisconnectButtonClick(){
    if (!deviceCache) {
        return;
    }
    log("Disconnecting from Bluetooth device...");
    
    // Remove all event listeners
    //deviceCache.removeEventListener('gattserverdisconnected', onDisconnected);
    uart_characteristic_rx.removeEventListener('characteristicvaluechanged',handleTxValueChange);
    
    // disconnect
    if(deviceCache.gatt.connected){
        deviceCache.gatt.disconnect();
    } else {
        log("Bluetooth device is already disconnected");
    }
}

//reconnect
function onReconnectButtonClick(){
    if (!deviceCache) {
        return;
    }
    if (deviceCache.gatt.connected) {
        log("Bluetooth device is already connected");
        return;
    }
    connect()
    .catch(error => {
        log(error);
    });
}

//connect to device, get all characteristics, listen to tx and write the command "M1:" to rx
function onConnectButtonClick() {
    return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
    .then(device => connectDeviceAndCacheCharacteristic(device))
    .then(characteristics => {
        startNotifications(characteristicCache_tx);
        let encoder = new TextEncoder('utf-8');
        let msg = encoder.encode("M1:");
        characteristicCache_rx.writeValue(msg);
                           
    })
    .catch(error => {
        log(error);
    });
}

/* BLE FUNCTIONS */

//checks for connection loss
function onDisconnected(event) {
  // Object event.target is Bluetooth Device getting disconnected.
  log("Bluetooth Device disconnected");
}

//request Bluetooth device with name prefix "BBC micro:bit
function requestBluetoothDevice() {
    
    let options = {
    filters: [
        {namePrefix: name_prefix}
    ],
    optionalServices: [uart_service] 
    }
    log("Requesting Bluetooth device...");
    
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
        deviceCache = device;
        deviceCache.addEventListener('gattserverdisconnected', onDisconnected); // watch connection
        log('"' + deviceCache.name + '" bluetooth device selected');
        return deviceCache;
    })
    .catch(error => {
        log(error);
    });
}

//get Service and all characteristics rx/tx from device
function connectDeviceAndCacheCharacteristic(device){
    // if already connected
    if(device.gatt.connected && characteristicCache_rx) {
        return Promise.resolve(characteristicCache_rx);
    }
    log("Connecting to GATT Server...");
    return device.gatt.connect()
    .then(server => {
        log("GATT Server connected, getting service...");
        return server.getPrimaryService(uart_service);
    })
    .then(service => {
        log("Service found, get characteristic...");
        return service.getCharacteristics();
    })
    .then(characteristics => {
        log('> Characteristics: ' + characteristics.map(c => c.uuid));
        characteristicCache_tx = characteristics[0];
        characteristicCache_rx = characteristics[1];
        log(characteristicCache_rx);
        log(characteristicCache_tx);
    })
    .catch(error => {
        log(error);
    });
    
}

// get notified when value in tx characteristic changes
function startNotifications(characteristic){
    log('Starting notifications...');
    
    return characteristic.startNotifications()
    .then(() => {
        log('Notifications started');
        characteristic.addEventListener('characteristicvaluechanged',handleTxValueChange);
    });
}

// Data receiving
function handleTxValueChange(event) {
  let value = new TextDecoder().decode(event.target.value);
  log(value, 'in');
}

/* does not work yet:

// Send data to device
function sendData(data){
    if (!data || !characteristicCache_rx) {
        log("Not connected to device or no data to send");
        return;
    }
    if(data.length > 20){
        log("Data too long");
    } else {
        writeToCharacteristic(characteristicCache_rx, data);
        log(data, 'out');
    }
}

//write to characteristic
function writeToCharacteristic(characteristic, data){
    let encoder = new TextEncoder('utf-8');
    let msg = encoder.encode(data);
    return characteristic.writeValue(msg);
    log("data sent");
}
*/

