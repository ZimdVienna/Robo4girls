/**** Bluetooth connection and communication with micro:bit ****/

const connectButton = document.getElementById("connect");
//const disconnectButton = document.getElementById("disconnect");
const terminalContainer = document.getElementById("terminal");
const stopButton = document.getElementById("stop");
const name_prefix = "BBC micro:bit";
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';  //messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';  //messages to the micro:bit

//save the device for reconnection
var deviceCache = null;
var characteristicCache_tx = null;
var characteristicCache_rx = null;
var stopButtonClicked = false;

//event listeners for connect/disconnect button clicks
connectButton.addEventListener('click', function(){
	onConnectButtonClick();
});

disconnectButton.addEventListener('click', function() {
	onDisconnectButtonClick();
});

stopButton.addEventListener('click', function(){
	stopButtonClicked = true;
});

/* ******************* FUNCTIONS ******************* */

function log(data, type = '') {
	console.log(data + type);
}

/* BUTTON FUNCTIONS */

//connect
function onConnectButtonClick() {
	// connect to device and start notifications for characteristic changes
	return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
	.then(device => connectDeviceAndCacheCharacteristic(device))
	.then(characteristics => {
			startNotifications(characteristicCache_tx);
			//sendData(["C:"]);
	})
	.catch(error => {
			log(error);
	});
}

//disconnect
function onDisconnectButtonClick(){
	if (!deviceCache) {
	alert("Kein Bluetooth Gerät verbunden");
			return;
	}
	log("Disconnecting from Bluetooth device...");
	if(deviceCache.gatt.connected){
			deviceCache.gatt.disconnect();
	} else {
			//log("Bluetooth device is already disconnected");
	alert("Verbindung zu Bluetooth Gerät verloren");
	}
}

// write to characteristic
function sendData(commands, counter=0) {
	if (!commands && !characteristicCache_rx) {
			return;
	}
	if(!deviceCache){
		alert("Kein Bluetooth Gerät verbunden");
		return;
	}
	let encoder = new TextEncoder('utf-8');
	let data = encoder.encode(commands[counter]);
	// send pending command
	characteristicCache_rx.writeValue(data);
	log(commands[counter], 'out');

	// wait for status input from microbit
	var promise = new Promise(async function(resolve,reject){
		// subscribe to changes to transceiver characteristic (messages from microbit)
		characteristicCache_tx.addEventListener('characteristicvaluechanged',function(event){
			let decoder = new TextDecoder();
			let value = decoder.decode(event.target.value);
			resolve(counter + 1);	// if successfull prepare to send next command
		});
	})
	.then(function(counter){
		// send_next_command recursively if more commands are pending
		log("success " + counter);
		if(counter < commands.length-1){
			if(stopButtonClicked){
				stopButtonClicked = false;
				log("Program stopped");
				return;
			}
			sendData(commands, counter);
		}
	});
}

function onDisconnected(event) {
	log("Bluetooth Device disconnected");
	alert("Verbindung zu Bluetooth Gerät getrennt");
	deviceCache = null;
	connectButton.innerHTML = "Verbinden";
	connectButton.className = "button blue";
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
		log('Notifications started');
		alert('Bluetooth Gerät ' + deviceCache.name + ' verbunden');
		sendData(["C:"]);
		//change button text and color when connected
		connectButton.innerHTML = "Verbunden";
		connectButton.className = "button green";
	})
	.catch(error => {
		log(error);
	});
}
