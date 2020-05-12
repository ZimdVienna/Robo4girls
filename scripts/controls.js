/* Toggle to show/hide the dropdown content */
function showMenu(element="myDropdown") {
	document.getElementById(element).classList.toggle("show");
}


/* Hide dropdown contents if user clicks somewhere else in the window */
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


/* On Start button clicked */
function handlePlay(event) {
	let delimiter_microbit = ":";
	Blockly.JavaScript.addReservedWords('code');
	/*
	var code = "Gb31" + delimiter_microbit + "T0" + delimiter_microbit + Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	console.log(code);
	*/
	
	// get program blocks in workspace
	var programs = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()).split('\n');
	var activePrograms = programs.filter(word => word.startsWith("start:"));
	log(activePrograms);
	if (activePrograms.length === 0) {
		alert("Füge einen Start-Block hinzu um ein Programm abzuspielen.\n Diesen findest du unter Steuerung -> Wenn Start gedrückt");
	}
	
	var code = "Gb31" + delimiter_microbit + "T0" + delimiter_microbit;
	for (let program of activePrograms) {
		program.replace('start','');
		code += program;
	}
	
	log(code);
	
	var commands = code.split(delimiter_microbit);
	commands = commands.filter(word => word != "start");
	
	// console.log(commands);
	var max_length = 19;
	for (const i in commands) {
		if (commands[i].length > max_length) {
			commands[i] = commands[i].substring(0, max_length);
		}
		commands[i] += delimiter_microbit;
	}
	log(commands);
	return sendData(commands);
}



/* PROGRAM DROPDOWN */


/* Global scope variables */
const select = document.getElementById("generate");
var storage_items = [];


/* Create program select options - get all saved R4G programs */
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
	}
	updateMenu();
}


/* Update program select options */
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


/* Save a blockly program */
function save() {
	var eingabe = "";
	var selectElement = document.querySelector("#generate");
	var eingabe = selectElement.value;
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
	if (eingabe !== null) {
		if (confirm("Programm '"+ eingabe +"' speichern?")) {
			var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
			localStorage.setItem("R4G_" + eingabe, xmlText);
			createMenu();
		}
	}
}


/* Load a blockly program into workspace */
function restore() {
	createMenu();
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
		return 1;
	}
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


/* Delete selected blockly program from local storage */
function deleteItem() {
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
		return 1;
	}
	var selectElement = document.querySelector("#generate");
	var eingabe = selectElement.value;
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



/* MENU DROPDOWN */


/* Delete all blockly programs from local storage */
function deleteAll() {	
	if (storage_items.length === 0) {
		alert("Keine gespeicherten Programme vorhanden");
	} else {
		if (confirm('Achtung! Alle R4G Programme werden gelöscht! Bist du sicher dass du fortfahren willst?')) {
			for (key in localStorage) {
				if (key.includes("R4G_")) {
					let programName = key.replace("R4G_", "");
					localStorage.removeItem(key);
					for (child of select.children) {
						if (child.value === programName) {
							select.removeChild(child);
						}
					}
				}
			}
			createMenu();
		}
	}
}


/* Clear workspace and disconnect micro:bit */
function end_program() {
	var confirmed = confirm("Willst du das Programm wirklich beenden?");
	if (confirmed) {
		workspace.clear();
		onDisconnectButtonClick();
	}
}