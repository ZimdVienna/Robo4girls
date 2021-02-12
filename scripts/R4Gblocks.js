/**
 * Blocks created with Blockly blockfactor
 * Blocks Library: 
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ohkyip
 */

// Delimiter for messages to micro:bit
var delimiter = ':';
var float_delimiter = '.0:';
var fullVelocity = 'Gb31';

// Movement combinations
var combinations = [
	['Bv0.3','W0.1','Bz0.3','W0.1','BL0.3','W0.1','BR0.6','W0.1','BL0.6'
	 ,'W0.1','BR0.6','W0.1','BL0.6','W0.1','BR0.3'],	// dance
	['BL0.1','W0.1','Bv0.3','W0.1','BR0.2','W0.1','Bv0.3','W0.1','BL0.2'],	// ziczac
	['BL0.1','BR0.2','BL0.2','BR0.2','BL0.1']	// shake
];

// HELPER FUNCTIONS
function send_combination(index=0, repetitions=1, intensity) {
	/* send comination various times */
	var code = 'Gb14' + delimiter;
	if(intensity == 'middle'){
		code = 'Gb21' + delimiter
	}
	if(intensity == 'strong'){
		code = 'Gb29' + delimiter
	}
	for (var l = 0; l < repetitions; l++) {
		for (var k = 0; k < combinations[index].length; k++) {
			code += combinations[index][k] + delimiter;
		}
	}
	return code;
}

function strip(str) {
	/* Remove unwanted whitespaces */
	return str.replace(/^\s+|\s+$/g, '');
}

// MOVEMENTS 'B'
// Forward 'v'
Blockly.Blocks['forward'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Vorwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "forward_duration")
			.appendField("Sekunden")
//			.appendField(new Blockly.FieldImage("./media/forward.gif", 20, 20, "*")) // Add an icon to block
		;
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['forward'] = function (block) {
	var number_forward_duration = block.getFieldValue('forward_duration');
	var code = 'Bv' + number_forward_duration + (number_forward_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// Backwards 'z'	
Blockly.Blocks['back'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rückwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "back_duration")
			.appendField("Sekunden")
//			.appendField(new Blockly.FieldImage("./media/back.gif", 20, 20, "*"))
		;
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['back'] = function (block) {
	var number_back_duration = block.getFieldValue('back_duration');
	var code = 'Bz' + number_back_duration + (number_back_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// Left 'l'
Blockly.Blocks['left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Links")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "left_duration")
			.appendField("Sekunden");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['left'] = function (block) {
	var number_left_duration = block.getFieldValue('left_duration');
	var code = 'Bl' + number_left_duration + (number_left_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// Right 'r'
Blockly.Blocks['right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "right_duration")
			.appendField("Sekunden");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['right'] = function (block) {
	var number_right_duration = block.getFieldValue('right_duration');
	var code = 'Br' + number_right_duration + (number_right_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// Left-turn 'L' 
Blockly.Blocks['turn_left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Linkskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "turn_left_duration")
			.appendField("Sekunden");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['turn_left'] = function (block) {
	var number_turn_left_duration = block.getFieldValue('turn_left_duration');
	var code = 'BL' + number_turn_left_duration + (number_turn_left_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// Right-turn 'R' 
Blockly.Blocks['turn_right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechtskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0.1, 9.9), "turn_right_duration")
			.appendField("Sekunden");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['turn_right'] = function (block) {
	var number_turn_right_duration = block.getFieldValue('turn_right_duration');
	var code = 'BR' + number_turn_right_duration + (number_turn_right_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

// COMBINATIONS 'K'
// Dance
Blockly.Blocks['dance'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Tanze")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["kurz", "easy"], ["mittel", "middle"], ["groß", "strong"]]), "intensity"); // the 2nd option is written in xml code when saved
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['dance'] = function (block) {
	var number_repeat = block.getFieldValue('repeat');
	var dropdown_intensity = block.getFieldValue('intensity');
	return send_combination(0, number_repeat, dropdown_intensity);
};

// Zigzag 
Blockly.Blocks['zigzag'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zickzack")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["kurz", "easy"], ["mittel", "middle"], ["groß", "strong"]]), "intensity");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['zigzag'] = function (block) {
	var number_repeat = block.getFieldValue('repeat');
	var dropdown_intensity = block.getFieldValue('intensity');
	return send_combination(1, number_repeat, dropdown_intensity);
};

// Shake 
Blockly.Blocks['shake'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Schütteln")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["kurz", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "intensity");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['shake'] = function (block) {
	var number_repeat = block.getFieldValue('repeat');
	var dropdown_intensity = block.getFieldValue('intensity');
	return send_combination(2, number_repeat, dropdown_intensity);
};

// Pirouette 
Blockly.Blocks['pirouette'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Pirouette")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["Links", "left"], ["Rechts", "right"]]), "direction");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['pirouette'] = function (block) {
	var number_repetition = block.getFieldValue('repeat');
	var dropdown_direction = block.getFieldValue('direction');
	var code = fullVelocity + delimiter;
	for(var r = 0; r < number_repetition; r++){
		if(dropdown_direction == 'Links' || dropdown_direction == 'left')
			code += 'BL2.9' + delimiter;
		else
			code += 'BR2.9' + delimiter;
	}
	return code;
};

// MELODY 'M'
Blockly.Blocks['melody'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Melodie abspielen")
			.appendField(new Blockly.FieldDropdown([["Tusch","M1"],["Romantisch","M2"],["Star Wars","M3"],["Super Mario","M4"],["Donauwalzer","M5"],["Tango Kriminalis","M6"],["Don't Worry be Happy","M7"],["Somewhere over the Rainbow","M8"]]), "melody");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['melody'] = function (block) {
	var dropdown_melody = block.getFieldValue('melody');
	var code = dropdown_melody + delimiter;
	return code;
};

// SETTINGS
// Motor velocity 'G'
Blockly.Blocks['motor'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Motor")
			.appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["1+2", "b"]]), "motor")
			.appendField("Leistung:")
			.appendField(new Blockly.FieldNumber(20, 1, 31, 1), "velocity");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(60);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['motor'] = function (block) {
	var dropdown_motor = block.getFieldValue('motor');
	var number_velocity = block.getFieldValue('velocity');
	// Number must have two digits: 01 to 31
	let velocity = number_velocity < 10 ? '0' + number_velocity : number_velocity;
	var code = 'G' + dropdown_motor + velocity + delimiter;
	return code;
};

// Turn display 'T'
Blockly.Blocks['turn_display'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Drehe die Anzeige auf")
			.appendField(new Blockly.FieldDropdown([["90","90"],["180","180"],["270","270"],["0","0"]]), "degrees")
			.appendField("Grad");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(65);
		this.setTooltip("Dreht die Anzeige im Uhrzeigersinn");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['turn_display'] = function(block) {
  	var dropdown_degrees = block.getFieldValue('degrees');
  	var code = 'T' + dropdown_degrees + delimiter;
	return code;
};


// DISPLAY 'A'
// Write text
Blockly.Blocks['show_text'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Schreibe");
		this.appendDummyInput()
			.appendField(new Blockly.FieldTextInput("..."), "led_text");
		this.appendDummyInput()
			.appendField("am Display");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['show_text'] = function (block) {
	var text_led_text = block.getFieldValue('led_text');
	var code = text_led_text + delimiter;
	return code;
};

// Show picture
Blockly.Blocks['show_picture'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zeige");
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Fröhlich","1"],["Herz","2"],["Herz klein","3"],["Traurig","4"], ["Böse","5"],["Müde","6"],["Überrascht","7"],["Richtig","8"],["Falsch","9"]]), "pic")
		this.appendDummyInput()
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 1, 9, 1), "show_duration");
		this.appendDummyInput()
			.appendField("Sekunden");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['show_picture'] = function (block) {
	var dropdown_pic = block.getFieldValue('pic');
	if(dropdown_pic == 'Wähle ein Bild'){
		alert('Bitte wähle ein Bild aus');
		return '?' + delimiter;
	}
	var number_show_duration = block.getFieldValue('show_duration');
	var code = 'A' + dropdown_pic + number_show_duration + delimiter;
	return code;
};


// PROGRAM CONTROL
// Wait 'W'
Blockly.Blocks['wait_seconds'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Warte für")
			.appendField(new Blockly.FieldNumber(1,0.1,9.9), "seconds")
			.appendField("Sekunden");
		this.setInputsInline(true);
	  	this.setPreviousStatement(true, null);
	  	this.setNextStatement(true, null);
	  	this.setColour(120);
	  	this.setTooltip("");
	  	this.setHelpUrl("");
  	}
};
Blockly.JavaScript['wait_seconds'] = function(block) {
  	var number_seconds_to_wait = block.getFieldValue('seconds');
	//console.log(number_seconds_to_wait);
  	var code = 'W'+ number_seconds_to_wait + (number_seconds_to_wait % 1 == 0 ? float_delimiter : delimiter);
  	return code;
};

// Repeat
Blockly.Blocks['repetition'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Wiederhole")
			.appendField(new Blockly.FieldNumber(1, 1, 9, 1), "repetition")
			.appendField("mal:");
		this.appendStatementInput("repeat")
			.setCheck(null)
			.appendField("mache");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(120);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['repetition'] = function (block) {
	// Send commands to micro:bit repetition-times
	var number_repetition = block.getFieldValue('repetition');
	var statements_repeat = strip(Blockly.JavaScript.statementToCode(block, 'repeat'));
	var code = statements_repeat;
	for(var n = 1; n < number_repetition; n++){
		code += statements_repeat;
	}
	return code;
};

// Start
Blockly.Blocks['start_block'] = {
 	init: function() {
    	this.appendDummyInput()
        	.appendField("Wenn Start gedrückt");
    	this.setInputsInline(true);
    	this.setNextStatement(true, null);
    	this.setColour(120);
 		this.setTooltip("Programme, die nicht mit diesem Block anfangen, werden beim Drücken von Start ignoriert");
 		this.setHelpUrl("");
  	}
};
Blockly.JavaScript['start_block'] = function(block) {
	var code = 'start' + delimiter;
	return code;
};