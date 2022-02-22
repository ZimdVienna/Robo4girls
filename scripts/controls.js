// Global scope variables
const select = document.getElementById('generate');
const delimiter_microbit = ':';
const PATH_TO_HEX_FILE = 'https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/makkelaig/Robo4earth/tree/master/microbit';
var storage_items = [];

function hideDropdowns() {
	/**
	 * Close all dropdown contents
	 */
	var dropdowns = document.getElementsByClassName('dropdown-content');
	for (var i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
	}
}

function showMenu(element='myDropdown') {
	/**
	 * Toggle Dropdown Menu visibility
	 */
	if (document.getElementById(element).classList.contains('show')) {
		hideDropdowns();
	} else {
		hideDropdowns();
		document.getElementById(element).classList.toggle('show');
	}
}

window.onclick = function(event) {
	/**
	 * Hide Dropdown when user clicks anywhere else on screen
	 */
	if (!event.target.matches('.dropbtn')) {
		hideDropdowns();
	}
}

function handlePlay(event) {
	/**
	 * Get code from blockly workspace and run it on Start button pressed
	 * @param {event} event Reacts on Start button pressed
	 */
	Blockly.JavaScript.addReservedWords('code');
	var programs = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()).split('\n');
	var activePrograms = programs.filter(word => word.startsWith('start:'));
	if (activePrograms.length === 0) {
		alert('Füge einen Start-Block hinzu um ein Programm abzuspielen.\nDiesen findest du unter Steuerung -> Wenn Start gedrückt');
	}
	// reset display and motor settings at program start
	var code = fullVelocity + delimiter_microbit; // fullVelocity is a constant from script R4Gblocks.js
	for (let program of activePrograms) {
		program.replace('start','');
		code += program;
	}
	var commands = code.split(delimiter_microbit);
	commands = commands.filter(word => word != 'start');
	// micro:bit can only receive a maximum of 20 characters at once
	var max_length = 19;
	for (const i in commands) {
		if (commands[i].length > max_length) {
			commands[i] = commands[i].substring(0, max_length);
		}
		commands[i] += delimiter_microbit;
	}
	return sendData(commands);
}

// PROGRAM DROPDOWN
function createMenu() {
	/** 
	 * Create program select options - get all saved R4G programs
	 */
	storage_items = [];
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).includes('R4G_')) {
			let key_i = localStorage.key(i).replace('R4G_', '');
			storage_items.push(key_i);
		}
	}
	if (storage_items.length === 0) {
		alert('Keine gespeicherten Programme vorhanden');
		return 1;
	}
	updateMenu();
}

function updateMenu() {
	/* Update program select options */
	for (item of storage_items) {
		var duplicate = false;
		for (child of select.children) {
			if (child.value === item) {
				duplicate = true;
			}
		}
		if (!duplicate) {
			const option = document.createElement('option');
			option.value = item;
			option.text = item;
			select.prepend(option);
		}
	}
}

function validateUserInput(eingabe) {
	if (eingabe === null || eingabe === '') {return 0;}
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).includes('R4G_' + eingabe)) {
			if (!confirm('Das Programm "'+ eingabe + '" ist bereits vorhanden.\nSoll es überschrieben werden?\n')) {
				return 0;
			}
		}
	}
	return 1;
}

function writeToLocalStorage(eingabe) {
	/**
	 * writes a blockly program on the local storage of the device and updates selected program
	 */
	if(eingabe !== null) {
		if (confirm('Programm "'+ eingabe +'" speichern?')) {
			var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
			localStorage.setItem('R4G_' + eingabe, xmlText);
			createMenu();
		}
		select.value = eingabe;
	}
}

function save() {
	/**
	 * quick save for program changes
	 */
	var selectElement = document.querySelector('#generate');
	var eingabe = selectElement.value;
	if (eingabe == '') {
		while (validateUserInput(eingabe) !== 1 && eingabe !== null) {
			eingabe = prompt('Bitte Programm benennen:', '');
		}
	}
	writeToLocalStorage(eingabe);
}

function saveNew() {
	/**
	 * save program under new name
	 */
	var eingabe='';
	while(validateUserInput(eingabe) !== 1 && eingabe !== null) {
		eingabe = prompt('Bitte Programm benennen:', '');
	}
	writeToLocalStorage(eingabe);
}

function restore() {
	/**
	 * Load a blockly program into the workspace
	 */
	var ret_val = createMenu();
	if (ret_val === 1) {
		return;
	}
	var selectElement = document.querySelector('#generate');
	var eingabe = selectElement.value;
	if (eingabe !== null) {
		if (!storage_items.includes(eingabe)) {
			alert('Kein Programm mit Namen "' + eingabe + '" vorhanden');
			return 1;
		}
		if (confirm('Programm mit Namen "' + eingabe + '" laden?')){
			workspace.clear();
			var xmlText = localStorage.getItem('R4G_' + eingabe);
			var xmlDom = Blockly.Xml.textToDom(xmlText);
			Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
		}
	}
}

function deleteItem() {
	/**
	 *  Delete selected blockly program from local storage
	 */
	if (storage_items.length === 0) {
		alert('Keine gespeicherten Programme vorhanden');
		return;
	}
	var selectElement = document.querySelector('#generate');
	var eingabe = selectElement.value;
	if (eingabe != null) {
		if (!storage_items.includes(eingabe)) {
			alert('Kein Programm mit Namen "' + eingabe + '" vorhanden');
			return;
		}
		if (confirm('Bist du sicher, dass du das Programm "' + eingabe + '" löschen willst?')) {
			localStorage.removeItem('R4G_' + eingabe);
			for (child of select.children) {
				if (child.value === eingabe) {
					select.removeChild(child);
				}
			}
			createMenu();
		}
	}
}

// MENU DROPDOWN
function deleteAll() {
	/**
	 * Delete all blockly programs from local storage
	 */
	if (storage_items.length === 0) {
		alert('Keine gespeicherten Programme vorhanden');
	} else {
		if (confirm('Achtung! Alle R4G Programme werden gelöscht! Bist du sicher dass du fortfahren willst?')) {
			for (key in localStorage) {
				if (key.includes('R4G_')) {
					let programName = key.replace('R4G_', '');
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

function end_program() {
	/**
	 * Clear workspace and disconnect micro:bit
	 */
	var confirmed = confirm('Willst du das Programm wirklich beenden?');
	if (confirmed) {
		workspace.clear();
		onDisconnectButtonClick();
	}
}

function hexFileDownload() {
	var confirmed = confirm('Willst du die R4g hex Datei auf deinen Computer laden?');
	if(confirmed) {
		downloadFile(PATH_TO_HEX_FILE);
	}
}

function downloadFile(filePath){
    var downloadFrame = document.createElement('iframe');
	downloadFrame.setAttribute('src',filePath);
	downloadFrame.setAttribute('class', 'screenReaderText');
	document.body.appendChild(downloadFrame);
}
