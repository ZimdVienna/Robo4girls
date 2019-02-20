
// Get references to UI elements
let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('input');

//Output to terminal
function log(data, type=''){
    terminalContainer.insertAdjacentHTML('beforeend', '<div' + (type ? 'class="' + type + '"' : '') + '>' + data + '</div>');
}
//connectButton.addEventListener('click',function(){connect();});

class Microbit {

constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  request() {
    let options = {
      "filters": [{
        "namePrefix": "BBC micro:bit"
      }],
      "optionalServices": ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    });
  }
  
  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    log("Connected");
    return this.device.gatt.connect();
    
  }
  
  writeUartRx(data) {
   return this.device.gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")
   
    .then(service => service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e"))
    
    .then(characteristic => characteristic.writeValue(data))
    .then(log());
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}

var microbit = new Microbit();
var buffer = new ArrayBuffer(8);
buffer = "BR2.0:";
connectButton.addEventListener('click', event => {
  microbit.request()
  
  .then(_ => microbit.connect())
  
  .then(_ => {microbit.writeUartRx(new TextEncoder().encode(buffer)})
  .then(log(buffer))
  .catch(error => { console.log(error) });
});


