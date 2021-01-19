/**
 * Handle Bluetooth connection and communication
 */

const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const terminalContainer = document.getElementById("terminal");
const stopButton = document.getElementById("stop");
const name_prefix = "BBC micro:bit";
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';	// Messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';	// Messages to the micro:bit
var deviceCache = null;	// save bluetooth device for reconnection
var characteristicCache_tx = null;
var characteristicCache_rx = null;
var stopButtonClicked = false;

// EVENT LISTENERS
connectButton.addEventListener('click', function(){
	onConnectButtonClick();
});
disconnectButton.addEventListener('click', function() {
	onDisconnectButtonClick();
});
stopButton.addEventListener('click', function(){
	stopButtonClicked = true;
});

// FUNCTIONS
function log(data, type = '') {
	/* Log to browser console */
	console.log(data + type);
}

function onConnectButtonClick() {
	/** 
		Connect to device and start notifications for characteristic changes
	*/
	return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
	.then(device => connectDeviceAndCacheCharacteristic(device))
	.then(characteristics => {
		startNotifications(characteristicCache_tx);
	})
	.catch(error => {
		log(error);
	});
}

function onDisconnectButtonClick(){
	/** 
		Disconnect device if connected 
	*/
	if (!deviceCache) {
	alert("Kein Bluetooth Gerät verbunden");
		return;
	}
	var confirmed = confirm("Willst du die Verbindung wirklich trennen?");
	if (confirmed) {
		log("Disconnecting from Bluetooth device...");
		if(deviceCache.gatt.connected){
			deviceCache.gatt.disconnect();
		} else {
			alert("Kein Bluetooth Gerät verbunden");
		}
	}
}

function sendData(commands, counter=0) {
	/** 
	 * Send commands to micro:bit recursively when Start button is clicked
	 * @param {string[]} commands 	List of commands
	 * @param {number}	 counter	Keeps track of number of recursions (sent commands)
	 */
	if(stopButtonClicked && counter === 0){
		stopButtonClicked = false;
	}
	if (!commands && !characteristicCache_rx) {
		return;
	}
	if(!deviceCache){
		alert("Kein Bluetooth Gerät verbunden");
		return;
	}
	let encoder = new TextEncoder('utf-8');
	let data = encoder.encode(commands[counter]);
	characteristicCache_rx.writeValue(data);
	// log(commands[counter], 'out');
	var promise = new Promise(async function(resolve,reject){
		/**
			Await confirmation from micro:bit
			If successfull increase counter to send next command
		*/
		characteristicCache_tx.addEventListener('characteristicvaluechanged',function(event){
			let decoder = new TextDecoder();
			let value = decoder.decode(event.target.value);
			resolve(counter + 1);
		});
	})
	.then(function(counter){
		/* Call self if not reached end of command list and stop button not clicked */
		// log("success " + counter);
		if(counter < commands.length-1){
			if(stopButtonClicked){
				stopButtonClicked = false;
				log("Program stopped");
				return;
			}
			sendData(commands, counter);
		}
	})
	.catch(error => {
		log(error);
	});
}

function onDisconnected(event) {
	/** 
	 * Alert user when connection to device is lost 
	 */
	log("Bluetooth Device disconnected");
	alert("Verbindung zu Bluetooth Gerät getrennt");
	deviceCache = null;
	connectButton.innerHTML = "Verbinden";
	connectButton.className = "button blue";
}

function requestBluetoothDevice() {
	/**
	 * Find all Bluetooth devices with name prefix "BBC micro:bit and return user choice
	 * @returns {object}	Bluetooth device object
	 */
	let options = {
		filters: [{namePrefix: name_prefix}],
		optionalServices: [uart_service] 
	}
	log("Requesting Bluetooth device...");
	return navigator.bluetooth.requestDevice(options)
	.then(device => {
		deviceCache = device;
		deviceCache.addEventListener('gattserverdisconnected', onDisconnected);
		log(deviceCache.name);
		return deviceCache;
	})
	.catch(error => {
			log(error);
	});
}

function connectDeviceAndCacheCharacteristic(device){
	/**
	 * Connect to-, and get service and characteristics rx/tx from device
	 * @param {object}	Bluetooth device to connect to
	 */
	if(device.gatt.connected && characteristicCache_rx) {
			return Promise.resolve(characteristicCache_rx);
	}
	return device.gatt.connect()
	.then(server => {
			return server.getPrimaryService(uart_service);
	})
	.then(service => {
			return service.getCharacteristics();
	})
	.then(characteristics => {
			// log('> Characteristics: ' + characteristics.map(c => c.uuid));
			characteristicCache_tx = characteristics[0];
			characteristicCache_rx = characteristics[1];
	})
	.catch(error => {
			log(error);
	});

}

function startNotifications(characteristic){
	/**
	 * Confirm device connected and start notifications
	 */
	return characteristic.startNotifications()
	.then(() => {
		log('Notifications started');
		alert('Bluetooth Gerät ' + deviceCache.name + ' verbunden');
		sendData(["C:"]);
		connectButton.innerHTML = "Verbunden";
		connectButton.className = "button green";
	})
	.catch(error => {
		log(error);
	});
}
