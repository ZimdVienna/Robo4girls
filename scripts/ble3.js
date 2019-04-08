
const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const terminalContainer = document.getElementById("terminal");

//const sendButton = document.getElementById("sendData");
//const inputField = document.getElementById("input");

const name_prefix = "BBC micro:bit";
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';  //messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';  //messages to the micro:bit

//save the device for reconnection
var deviceCache = null;
var characteristicCache_tx = null;
var characteristicCache_rx = null;

//var auto_reconnect = true;

//connect to device on button click
connectButton.addEventListener('click', function(){
    onConnectButtonClick();
});

// Disconnect from the device on Disconnect button click
disconnectButton.addEventListener('click', function() {
    onDisconnectButtonClick();
});

/* Send data from input field to device
sendButton.addEventListener('click', function(){
    sendData(inputField.value);
});
*/

/* ******************* FUNCTIONS ******************* */

// Output to terminal
function log(data, type = '') {
    terminalContainer.insertAdjacentHTML('beforeend','<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
    // auto scroll... we always see the last in-/output
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

/* BUTTON FUNCTIONS */

//connect
function onConnectButtonClick() {
	// connect to device and start notifications for characteristic changes
    return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
    .then(device => connectDeviceAndCacheCharacteristic(device))
    .then(characteristics => {
        startNotifications(characteristicCache_tx);
		sendData(["C:"]);
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
    if(deviceCache.gatt.connected){
        deviceCache.gatt.disconnect();
    } else {
        log("Bluetooth device is already disconnected");
    }
}


// write to characteristic
function sendData(commands, counter=0) {
    if (!commands && !characteristicCache_rx) {
        return;
    }
	
	let encoder = new TextEncoder('utf-8');
	let data = encoder.encode(commands[counter]);
	// send pending command
	characteristicCache_rx.writeValue(data);
	log(commands[counter], 'out');

	// wait for status input from microbit
	var promise = new Promise(async function(resolve,reject){
		characteristicCache_tx.addEventListener('characteristicvaluechanged',function(event){
			let decoder = new TextDecoder();
			let value = decoder.decode(event.target.value);
			resolve(counter + 1);	// if successfull prepare to send next command
		});
	})
	.then(function(counter){
		// send_next_command if more commands pending
		log("success " + counter);
		if(counter < commands.length-1){
			sendData(commands, counter);
		}
	});
}

function onDisconnected(event) {
  	log("Bluetooth Device disconnected");
}

function requestBluetoothDevice() {
	//request Bluetooth device with name prefix "BBC micro:bit
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
        log(deviceCache.name);
        return deviceCache;
    })
    .catch(error => {
        log(error);
    });
}

function connectDeviceAndCacheCharacteristic(device){
	//get Service and characteristics rx/tx from device
    if(device.gatt.connected && characteristicCache_rx) {
        return Promise.resolve(characteristicCache_rx);
    }
    // Connect to GATT Server
    return device.gatt.connect()
    .then(server => {
        return server.getPrimaryService(uart_service);
    })
    .then(service => {
        return service.getCharacteristics();
    })
    .then(characteristics => {
        //log('> Characteristics: ' + characteristics.map(c => c.uuid));
        characteristicCache_tx = characteristics[0];
        characteristicCache_rx = characteristics[1];
    })
    .catch(error => {
        log(error);
    });
    
}

function startNotifications(characteristic){
    log('Starting notifications...');
    return characteristic.startNotifications()
    .then(() => {
		// get notified when value in tx characteristic changes
        characteristic.addEventListener('characteristicvaluechanged',handleTxValueChange);
		log('Notifications started');
    })
	.catch(error => {
		log(error);
	});
}

// Data receiving
function handleTxValueChange(event) {
  let value = new TextDecoder().decode(event.target.value);
  log(value, 'in');
}
