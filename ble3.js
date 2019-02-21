
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


//connect
function onConnectButtonClick() {
    return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
    .then(device => connectDeviceAndCacheCharacteristic(device))
    .then(characteristic => startNotifications(characteristic))
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

function connectDeviceAndCacheCharacteristic(device){
    // if already connected
    if(device.gatt.connected && characteristicCache_tx) {
        return Promise.resolve(characteristicCache_tx);
    }
    
    log("Connecting to GATT Server...");
    return device.gatt.connect()
    .then(server => {
        log("GATT Server connected, getting service...");
        return server.getPrimaryService(uart_service);
    })
    .then(service => {
        log("Service found, get rx characteristic...");
        return service.getCharacteristic(uart_characteristic_tx);
    })
    .then(characteristic => {
        log("Characteristic found");
        characteristicCache_tx = characteristic;
        return characteristicCache_tx;
    })
    .catch(error => {
        log(error);
    });
}

function startNotifications(characteristic){
    log('Starting notifications...');
    
    return characteristic.startNotifications()
    .then(() => {
         log('Notifications started');
    });
}



