/**
 * Script to handle Bluetooth connection and communication with micro:bit
 */

const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const terminalContainer = document.getElementById('terminal');
const stopButton = document.getElementById('stop');
const name_prefix = 'BBC micro:bit';
const uart_service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const uart_characteristic_tx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';	// Messages from micro:bit
const uart_characteristic_rx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';	// Messages to the micro:bit

const temp_service = 'e95d6100-251d-470a-a062-fa1922dfa9a8';
const temp_characteristic = 'e95d9250-251d-470a-a062-fa1922dfa9a8';

var deviceCache = null;	// save bluetooth device for reconnection
var characteristicCache_tx = null;
var characteristicCache_rx = null;
var characteristicCache_temp = null;
var stopButtonClicked = false;
var currentTemperature = 0;

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

function onConnectButtonClick() {
	/** 
		Connect to device and start notifications for characteristic changes
	*/
	return (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
	.then(device => connectDeviceAndCacheCharacteristic(device))
	.then(() => {
		return Promise.all([startUartNotifications(characteristicCache_tx),startTemperatureNotifications(characteristicCache_temp)])
	})
	.catch(error => {
		console.log(error);
	});
}

function onDisconnectButtonClick(){
	/** 
		Disconnect device if connected 
	*/
	if (!deviceCache) {
	alert('Kein Bluetooth Gerät verbunden');
		return;
	}
	var confirmed = confirm('Willst du die Verbindung wirklich trennen?');
	if (confirmed) {
		console.log('Disconnecting from Bluetooth device...');
		if(deviceCache.gatt.connected){
			deviceCache.gatt.disconnect();
		} else {
			alert('Kein Bluetooth Gerät verbunden');
		}
	}
}

function timeout(ms) {
	/** Create a timeout promise 
	 * @param {number} ms Time to wait in milliseconds
	*/
	return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForConfirmation(counter) {
	return new Promise(async function(resolve,reject){
		/**
			Create a promise that awaits confirmation from micro:bit
			If successfull increase counter to send next command
			@param {number} counter number of sent commands from command list
		*/
		characteristicCache_tx.addEventListener('characteristicvaluechanged',function(event){
			let decoder = new TextDecoder();
			let value = decoder.decode(event.target.value).replace(/\r?\n|\r/,'');
			console.log(`received: "${value}"`);
			if (value == 'OK'){
				resolve(counter + 1);
			} else {
				reject(new Error('Received wrong confirmation value: ' + value));
			}
		});
	})
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
		alert('Kein Bluetooth Gerät verbunden');
		return;
	}
	let encoder = new TextEncoder('utf-8');
	let data = encoder.encode(commands[counter]);
	characteristicCache_rx.writeValue(data);
	console.log('sending: "' + commands[counter] + '"');

	Promise.race([
		/**
		 * Wait for confirmation from micro:bit that command has been executed
		 * Trow timeout error if the micro:bit does not confirm action within 15 seconds
		 * (longest possible action is 9 seconds)
		 */
		waitForConfirmation(counter),
		timeout(15000).then(() => {
			throw new Error('No confirmation from micro:bit received within 15 seconds');
		})
	])
	.then(function(counter){
		/* Call self if not reached end of command list and stop button not clicked */
		// console.log('success ' + counter);
		if(counter < commands.length-1){
			if(stopButtonClicked){
				stopButtonClicked = false;
				console.log('Program stopped');
				return;
			}
			sendData(commands, counter);
		}
	})
	.catch(error => {
		alert(error);
		console.log(error);
	});
}

function onDisconnected() {
	/** 
	 * Alert user when connection to device is lost 
	 */
	console.log('Bluetooth Device disconnected');
	alert('Verbindung zu Bluetooth Gerät getrennt');
	deviceCache = null;
	connectButton.innerHTML = 'Verbinden';
	connectButton.className = 'button blue';
}

function requestBluetoothDevice() {
	/**
	 * Find all Bluetooth devices with name prefix 'BBC micro:bit and return user choice
	 * @returns {object}	Bluetooth device object
	 */
	let options = {
		filters: [{namePrefix: name_prefix}],
		optionalServices: [uart_service,temp_service] 
	}
	console.log('Requesting Bluetooth device...');
	return navigator.bluetooth.requestDevice(options)
	.then(device => {
		deviceCache = device;
		deviceCache.addEventListener('gattserverdisconnected', onDisconnected);
		console.log(deviceCache.name);
		return deviceCache;
	})
	.catch(error => {
		console.log(error);
	});
}

function getUartCharacteristics(server) {
	return new Promise(async function(resolve){
		/**
		 * Get the characteristics (tx/rx) for uart via BLE communication with micro:bit
		 * @param {number} server connected gatt server
		 * @returns {array} array of characteristics
		*/
		return server.getPrimaryService(uart_service)
		.then(service => {
			return service.getCharacteristics();
		})
		.then(characteristics => {
			characteristicCache_tx = characteristics[0];
			characteristicCache_rx = characteristics[1];
			resolve(characteristics);
		})
		.catch(error => {
			console.log(error);
		})
	})
}

function getTemperatureCharacteristic(server) {
	return new Promise(async function(resolve){
		/**
		 * Get the characteristics for the temperature service from micro:bit
		 * @param {number} server connected gatt server
		 * @returns {array} array of characteristics
		*/
		return server.getPrimaryService(temp_service)
		.then(service => {
			return service.getCharacteristics(temp_characteristic);
		})
		.then(characteristics => {
			characteristicCache_temp = characteristics[0];
			resolve(characteristics);
		})
		.catch(error => {
			console.log(error);
		})
	})
}

function connectDeviceAndCacheCharacteristic(device){
	/**
	 * Connect to-, and get service and characteristics rx/tx from device
	 * @param {object}	device Bluetooth device to connect to
	 */
	if(device.gatt.connected && characteristicCache_rx) {
		return Promise.resolve(characteristicCache_rx);
	}
	return device.gatt.connect()
	.then(server => {
		return Promise.all([getUartCharacteristics(server), getTemperatureCharacteristic(server)])
		.then(values => console.log(values))
	})
	.catch(error => {
		console.log(error);
	});

}

function startUartNotifications(characteristic){
	/**
	 * Confirm device connected and start notifications
	 */
	return characteristic.startNotifications()
	.then(() => {
		console.log('Notifications started');
		alert('Bluetooth Gerät ' + deviceCache.name + ' verbunden');
		// sendData(['C:']);
		connectButton.innerHTML = 'Verbunden';
		connectButton.className = 'button green';
	})
	.catch(error => {
		console.log(error);
	});
}

function startTemperatureNotifications(characteristic) {
	return characteristic.startNotifications()
	.then(() => {
		characteristic.addEventListener('characteristicvaluechanged',function(event) {
			currentTemperature = event.target.value.getUint8(0);
			console.log(`Temperature service: "${currentTemperature}"`);
		})
	})
	.catch(error => {
		console.log(error);
	})
}
