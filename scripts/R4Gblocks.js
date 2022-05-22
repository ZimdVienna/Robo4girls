/**
 * Blocks created with Blockly blockfactor
 * Blocks Library: 
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ohkyip
 */
// Delimiter for messages to micro:bit
const delimiter = ':';
const float_delimiter = '.0:';
const fullVelocity = 'Gb31';
let motorVelocity = {1:'31',2:'31'};

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
	var code = 'Gb7' + delimiter;
	if(intensity == 'middle'){
		code = 'Gb14' + delimiter
	}
	if(intensity == 'strong'){
		code = 'Gb21' + delimiter
	}
	for (var l = 0; l < repetitions; l++) {
		for (var k = 0; k < combinations[index].length; k++) {
			code += combinations[index][k] + delimiter;
		}
	}
	// reset motor velocity to latest value before combination
	code += 'G1' + motorVelocity['1'] + delimiter;
	code += 'G2' + motorVelocity['2'] + delimiter;
	return code;
}

function strip(str) {
	/* Remove unwanted whitespaces */
	return str.replace(/^\s+|\s+$/g, '');
}

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
		this.setTooltip("Schreibe einen Text in das Eingabefeld, er wird dann am Display angezeigt.");
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
		this.setTooltip("Zeigt das ausgewählte Bild für die angegebene Sekundenanzahl an.");
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
// ASYNC Picture
Blockly.Blocks['show_picture_async'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zeige");
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Fröhlich","1"],["Herz","2"],["Herz klein","3"],["Traurig","4"], ["Böse","5"],["Müde","6"],["Überrascht","7"],["Richtig","8"],["Falsch","9"]]), "picture")
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip("Zeigt das ausgewählte Bild während das Programm weiterläuft. Hört nicht von alleine auf!");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['show_picture_async'] = function (block) {
	var pic = block.getFieldValue('picture');
	if(pic == 'Wähle ein Bild'){
		alert('Bitte wähle ein Bild aus');
		return '?' + delimiter;
	}
	var code = 'A' + pic + '0' + delimiter;
	return code;
};
// LEDs off
Blockly.Blocks['leds_off'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Schalte Display aus");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip("Schaltet das Display aus.");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['leds_off'] = function(block) {
   var code = 'A0' + delimiter;
   return code;
};
// block with input field for number or text
Blockly.Blocks['show_value'] = {
		init: function() {
		this.appendValueInput("VALUE")
			.setCheck(null)
			.appendField("Zeige Wert von");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip("Der Wert den du diesem Baustein fütterst wird am Display angezeigt");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['show_value'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	value = value_name.replace('(','').replace(')','');
	return value + delimiter;
};

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
		this.setTooltip("Der Roboter fährt Vorwärts für die Dauer der Eingabe.");
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
		this.setTooltip("Der Roboter fährt rückwärts für die Dauer der Eingabe.");
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
		this.setTooltip("Der Roboter biegt nach lins ab für die Dauer der Eingabe.");
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
		this.setTooltip("Der Roboter biegt nach rechts ab für die Dauer der Eingabe.");
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
		this.setTooltip("Der Roboter dreht sich um sich selbst gegen den Uhrzeigersinn für die Dauer der Eingabe.");
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
		this.setTooltip("Der Roboter dreht sich um sich selbst im Uhrzeigersinn für die Dauer der Eingabe.");
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
		this.setColour(290);
		this.setTooltip("Der Roboter führt einen kleinen Tanz auf.");
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
		this.setColour(290);
		this.setTooltip("Der Roboter fährt einmal im Zick-Zack.");
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
		this.setColour(290);
		this.setTooltip("Der Roboter schüttelt sich.");
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
		this.setColour(290);
		this.setTooltip("Der Roboter dreht sich eine Sekunde lang im Kreis.");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['pirouette'] = function (block) {
	var number_repetition = block.getFieldValue('repeat');
	var dropdown_direction = block.getFieldValue('direction');
	var code = fullVelocity + delimiter;
	for(var r = 0; r < number_repetition; r++){
		if(dropdown_direction == 'Links' || dropdown_direction == 'left')
			code += 'BL1.0' + delimiter;
		else
			code += 'BR1.0' + delimiter;
	}
	return code;
};

// LOGIC
// Condition
Blockly.defineBlocksWithJsonArray([ {
    type: "c_if", 
	message0: "%{BKY_CONTROLS_IF_MSG_IF} %1", 
	args0: [{ 
		type: "input_value", 
		name: "IF0", 
		check: "Boolean" 
	}], 
	message1: "%{BKY_CONTROLS_IF_MSG_THEN} %1", 
	args1: [{
        type: "input_statement",
        name: "DO0"
    }], 
	previousStatement: null, 
	nextStatement: null, 
	style: "logic_blocks", 
	helpUrl: "%{BKY_CONTROLS_IF_HELPURL}", 
	mutator: "controls_if_mutator", 
	extensions: ["controls_if_tooltip"]
}])
Blockly.JavaScript['c_if'] = function(block) {
	// If/elseif/else condition.
	var n = 0;
	var code = '', branchCode, conditionCode;
	if (Blockly.JavaScript.STATEMENT_PREFIX) {
		// Automatic prefix insertion is switched off for this block.  Add manually.
		code += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
			block);
	}
	do {
		conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n,
			Blockly.JavaScript.ORDER_NONE) || 'false';
		branchCode = 'result = "'+Blockly.JavaScript.statementToCode(block, 'DO' + n)+'"';
		if (Blockly.JavaScript.STATEMENT_SUFFIX) {
		branchCode = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
			block), Blockly.JavaScript.INDENT) + branchCode;
		}
		code += (n > 0 ? ' else ' : '') +
			'if (' + conditionCode + ') {\n' + branchCode + '}';
		++n;
	} while (block.getInput('IF' + n));

	if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
		branchCode = 'result = "' + Blockly.JavaScript.statementToCode(block, 'ELSE') + '"';
		if (Blockly.JavaScript.STATEMENT_SUFFIX) {
		branchCode = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
			block), Blockly.JavaScript.INDENT) + branchCode;
		}
		code += ' else {\n' + branchCode + '}';
	}
	try {
		var result = '';
		eval(code);
		return strip(result);
	} catch(e) {
		console.log(e);
	}
};
// Number
Blockly.defineBlocksWithJsonArray([{ 
	type: "math_number", 
	message0: "%1", 
	args0: [{ 
		type: "field_number", 
		name: "NUM", value: 0 
	}], 
	output: "Number", 
	helpUrl: "%{BKY_MATH_NUMBER_HELPURL}", 
	style: "logic_blocks", 
	tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}", 
	extensions: ["parent_tooltip_when_inline"] 
}])

// MELODY 'M/K
// Play melody 'M'
Blockly.Blocks['melody'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Spiele Melodie")
			.appendField(new Blockly.FieldDropdown([["Tusch","M1"],["Romantisch","M2"],["Star Wars","M3"],["Super Mario","M4"],["Donauwalzer","M5"],["Tango Kriminalis","M6"],["Don't Worry be Happy","M7"],["Somewhere over the Rainbow","M8"],["Harry Potter","M9"]]), "melody");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("Die von dir ausgewählte Melodie wird ganz abgespielt, das Programm pausiert so lange.");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['melody'] = function (block) {
	var dropdown_melody = block.getFieldValue('melody');
	var code = dropdown_melody + delimiter;
	return code;
};
// Play sound 'K'
Blockly.Blocks['sound'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Starte Klang")
			.appendField(new Blockly.FieldDropdown([["Kichern","K01"],["Fröhlich","K02"],["Hallo","K03"],["Mysteriös","K04"],["Traurig","K05"],["Rutschen","K06"],["Aufsteigen","K07"],["Federn","K08"],["Funkeln","K09"],["Gähnen","K10"]]), "sound");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(0);
		this.setTooltip("Der ausgewählte Klang wird abgespielt während das Programm weiterläuft. Dieser Baustein funktioniert nur mit dem Micro:bit V2!");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['sound'] = function (block) {
	var dropdown_melody = block.getFieldValue('sound');
	var code = dropdown_melody + delimiter;
	return code;
};

// SETTINGS
// Motor velocity 'G'
Blockly.Blocks['motor'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Motor")
			.appendField(new Blockly.FieldDropdown([["Links", "2"], ["Rechts", "1"], ["Beide", "b"]]), "motor")
			.appendField("Geschwindigkeit:")
			.appendField(new Blockly.FieldNumber(20, 1, 31, 1), "velocity")
			.appendField("von 31");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(60);
		this.setTooltip("Hiermit kannst du die Motorleistung anpassen wenn der Roboter zu schnell oder langsam fährt oder die Motoren unterschiedlich schnell drehen.");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['motor'] = function (block) {
	var dropdown_motor = block.getFieldValue('motor');
	var number_velocity = block.getFieldValue('velocity');
	// Number must have two digits: 01 to 31
	let velocity = number_velocity < 10 ? '0' + number_velocity : number_velocity;
	var code = 'G' + dropdown_motor + velocity + delimiter;
	if(dropdown_motor == "b"){
		motorVelocity['1'] = velocity;
		motorVelocity['2'] = velocity;
	}else{ 
		motorVelocity[dropdown_motor] = velocity;
	}
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
	  	this.setTooltip("Der Roboter macht eine Pause für die angegebene Sekundenanzahl");
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
		this.setTooltip("Die Kommandos, die innerhalb dieses Bausteins sind, werden so oft wiederholt bis die eingegebene Zahl erreicht ist. Wenn die Zahl 1 ist dann wird alles genau einmal ausgeführt.");
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

// Temperature
Blockly.Blocks['temperature'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Temperatur");
		this.setOutput(true, "Number");
		this.setColour(190);
	this.setTooltip("Eine Variable, die den aktuellen Wert des Temperatursensors enthält.");
	this.setHelpUrl("");
	}
};
Blockly.JavaScript['temperature'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = currentTemperature;
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};

// works only with micro:bit version 1
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
		this.setTooltip("Dreht das Display im Uhrzeigersinn um die angegebenen Grad. Dieser Baustein funktioniert nur mit dem Micro:bit V1!");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['turn_display'] = function(block) {
  	var dropdown_degrees = block.getFieldValue('degrees');
  	var code = 'T' + dropdown_degrees + delimiter;
	return code;
};