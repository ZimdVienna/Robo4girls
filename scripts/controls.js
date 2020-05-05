
// Global scope variables
const select = document.getElementById("generate");
var storage_items = [];


/* toggle between hiding and showing the dropdown content */
function showMenu(element="myDropdown") {
	// console.log(element);
	document.getElementById(element).classList.toggle("show");
}


/* Close the dropdown menu if the user clicks outside of it*/
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}


function createMenu() {
	
	storage_items = [];
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).includes("R4G_")) {
			let key_i = localStorage.key(i).replace("R4G_", "");
			storage_items.push(key_i);
		}
	}
	console.log(storage_items);
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
	} else {
		updateMenu();
	}
}


function updateMenu() {

	for (item of storage_items) {
		var duplicate = false;
		for (child of select.children) {
			if (child.value === item) {
				duplicate = true;
			}
		}
		if (!duplicate) {
			const option = document.createElement("option");
			option.value = item;
			option.text = item;
			select.appendChild(option);
		}
	}
}


/* on Start button clicked */
function handlePlay(event) {
	
	let delimiter_microbit = ":";
	Blockly.JavaScript.addReservedWords('code');
	var code = "Gb31" + delimiter_microbit + "T0" + delimiter_microbit + Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	var commands = code.split(delimiter_microbit);
	var max_length = 19;
	for (var i = 0; i < commands.length; i++) {
		if (commands[i].length > max_length) {
			commands[i] = commands[i].substring(0, max_length);
		}
		commands[i] += delimiter_microbit;
		console.log(commands[i]);
	}
	return sendData(commands);
}


/* Menu functions */

function verifyUserInput(eingabe) {

	if (eingabe == "") {
		eingabe = prompt('Bitte Programm benennen:', '');
	}
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).includes("R4G_" + eingabe)) {
			if (!confirm("Programm "+ eingabe + " ist bereits vorhanden\nSoll es überschrieben werden?")) {
				eingabe = prompt('Bitte Programm umbenennen:', '');
			}
		}
	}
	return eingabe;
}


function save() {
	var eingabe = "";
	var selectElement = document.querySelector("#generate");
	var eingabe = selectElement.value;
	eingabe = verifyUserInput(eingabe);
	
	//var eingabe = prompt(storage_items + '\nProgramm speichern unter:', '');
	if (eingabe !== null) {
		if (confirm("Programm '"+ eingabe +"' speichern?")) {
			var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
			localStorage.setItem("R4G_" + eingabe, xmlText);
			createMenu();
			alert("Programm '" + eingabe + "' gespeichert");
		}
	}
}


function restore() {
	createMenu();
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
		return 1;
	}
	//var eingabe = prompt(storage_items + '\nProgramm laden:', '');
	
	var selectElement = document.querySelector("#generate");
	var eingabe = selectElement.value;
	console.log(eingabe);
	
	if (eingabe != null) {
		if (eingabe === "" || !storage_items.includes(eingabe)) {
			alert('Kein Programm mit Namen "' + eingabe + '" vorhanden');
			return 1;
		}
		if (confirm('Programm mit Namen "' + eingabe + '" laden?')){
			workspace.clear();
			var xmlText = localStorage.getItem("R4G_" + eingabe);
			var xmlDom = Blockly.Xml.textToDom(xmlText);
			Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
		}
	}
}


function deleteAll() {
	
	var count = 0;
	for (let i = 0; i < localStorage.length; i++) {
		var keyName = localStorage.key(i);
		if (keyName.includes("R4G_")) {
			count++;
			if (confirm('Programm ' + keyName + ' löschen?')) {
				localStorage.removeItem(keyName);
			}
		}
	}
	createMenu();
	if (count == 0) {
		alert("Keine gespeicherten Programme vorhanden");
	}
}


function deleteItem() {
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
		return 1;
	}
	
	var selectElement = document.querySelector("#generate");
	var eingabe = selectElement.value;
	//console.log(eingabe);
	
	// var eingabe = prompt(storage_items + '\nProgramm löschen:', '');
	if (eingabe != null) {
		if (eingabe === "" || !storage_items.includes(eingabe)) {
			alert('Kein Programm mit Namen "' + eingabe + '" vorhanden');
			return 1;
		}
		if (confirm('Bist du sicher, dass du das Programm ' + eingabe + ' löschen willst?')) {
			localStorage.removeItem("R4G_" + eingabe);
			
			for (child of select.children) {
				if (child.value === eingabe) {
					select.removeChild(child);
					console.log(child.value);
				}
			}
			createMenu();
			
		}
	}
}


function end_program() {
	
	var confirmed = confirm("Willst du das Programm wirklich beenden?");
	if (confirmed) {
		workspace.clear();
		onDisconnectButtonClick();
	}
}
