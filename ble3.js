
const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
//const reconnectButton = document.getElementById("reconnect");
const terminalContainer = document.getElementById("terminal");

const sendButton = document.getElementById("sendData");
const inputField = document.getElementById("input");

const name_prefix = "BBC micro:bit";
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';  //messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';  //messages to the micro:bit

//save the device for reconnection
var deviceCache = null;
var characteristicCache_tx = null;
var characteristicCache_rx = null;


//connect to device on button click
connectButton.addEventListener('click', function(){
    onConnectButtonClick();
});

// Disconnect from the device on Disconnect button click
disconnectButton.addEventListener('click', function() {
    onDisconnectButtonClick();
});

/*
// Reconnect to last device on Reconnect button click
reconnectButton.addEventListener('click', function(){
    onReconnectButtonClick();
});
*/

// Send data to device
sendButton.addEventListener('click', function(){
    sendData(inputField.value);
});

/* ******************* FUNCTIONS ******************* */

// Output to terminal
function log(data, type = '') {
    terminalContainer.insertAdjacentHTML('beforeend','<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
    // auto scroll... we always see the last in-/out-put
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

/* BUTTON FUNCTIONS */

//connect
function onConnectButtonClick() {
    return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
    .then(device => connectDeviceAndCacheCharacteristic(device))
    .then(characteristics => {
        startNotifications(characteristicCache_tx);
    })
    .catch(error => {
        log(error);
    });
}

//disconnect
function onDisconnectButtonClick(){
    if (!deviceCache) {
        return;
    }
    log("Disconnecting from Bluetooth device...");
    
    // disconnect
    if(deviceCache.gatt.connected){
        deviceCache.gatt.disconnect();
    } else {
        log("Bluetooth device is already disconnected");
    }
}

// write to characteristic
function sendData(msg) {
    if (!msg && !uart_characteristic_rx) {
        return;
    }
    let max_length = 19;
    //check if input is longer than 20 byte and trim
    if (msg.length > max_length) {
        msg = msg.substring(0, max_length);
        msg = msg + ':';
    }
    let encoder = new TextEncoder('utf-8');
    let data = encoder.encode(msg);
    characteristicCache_rx.writeValue(data);
    log(msg, 'out');
    inputField.value = "";
}

/*
//reconnect
function onReconnectButtonClick(){
    
    if (!deviceCache){
        return;
    }
    if (deviceCache.gatt.connected) {
        log("Bluetooth device is already connected");
        return;
    }
    onConnectButtonClick()
    .catch(error => {
        log(error);
    });
}
*/

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
