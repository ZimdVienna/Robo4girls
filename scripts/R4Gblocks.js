//Global variables needed in different functions
var delimiter = ":";
var float_delimiter = ".0:";
var dance_array = ["Bv0.5:", "Bz0.5:", "BL0.5:", "BR1.0:", "BL1.0:", "BR1.0:", "BL0.5:"];
var shake_array = ["BL0.5:", "BR1.0:", "BL1.0:", "BR1.0:", "BL0.5:"];
var zigzag_array = ["BL0.5:", "Bv1.0:", "BR1.0:", "Bv1.0:", "BL0.5:"];
var combinations = [dance_array, zigzag_array, shake_array];

/*************Functions*************/

function send_combination(index, repetitions, intensity){
	var code = "Gb05:";	//slow	
	if(intensity == "strong")
		code = "Gb16:";
	if(intensity == "middle")
		code = "Gb10:";
	// send comination various times
	for(var l = 0; l < repetitions; l++){
		for(var k = 0; k < combinations[index].length; k++){
			code += combinations[index][k];
		}
	}
	return code;
}

/******** MOVEMENTS B (Bewegungen) **********/

//forward 
Blockly.Blocks['forward'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Vorwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "forward_duration")
			.appendField("Sekunden")
			//.appendField(new Blockly.FieldImage("./media/forward.gif", 20, 20, "*"))
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

	var code = "Bv" + number_forward_duration + (number_forward_duration % 1 == 0 ? float_delimiter : delimiter);

	return code;
};

// backwards	
Blockly.Blocks['back'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rückwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "back_duration")
			.appendField("Sekunden")
			//.appendField(new Blockly.FieldImage("./media/back.gif", 20, 20, "*"))
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
	var code = "Bz" + number_back_duration + (number_back_duration % 1 == 0 ? float_delimiter : delimiter);
	console.log("back block duration:" + code);
	return code;
};

//Left  
Blockly.Blocks['left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Links")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "left_duration")
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
	var code = "Bl" + number_left_duration + (number_left_duration % 1 == 0 ? float_delimiter : delimiter);
	return code;
};

//Right  
Blockly.Blocks['right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "right_duration")
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
	var code = "Br" + number_right_duration + (number_right_duration % 1 == 0 ? float_delimiter : delimiter);

	return code;
};

//Left-turn (L) 
Blockly.Blocks['turn_left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Linkskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "turn_left_duration")
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

	var code = "BL" + number_turn_left_duration + (number_turn_left_duration % 1 == 0 ? float_delimiter : delimiter);

	return code;
};

// Right-turn (R) 
Blockly.Blocks['turn_right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechtskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9), "turn_right_duration")
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

	var code = "BR" + number_turn_right_duration + (number_turn_right_duration % 1 == 0 ? float_delimiter : delimiter);

	return code;
};

/******* COMBINATIONS K (Kombinationen) **********/

//Dance
Blockly.Blocks['dance'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Tanze")
			.appendField(new Blockly.FieldNumber(1, 0, 9), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "intensity"); // the 2nd option is written in xml code when saved
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
	console.log(dropdown_intensity);
	return send_combination(0,number_repeat,dropdown_intensity);
};

//Zigzag 
Blockly.Blocks['zigzag'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zickzack")
			.appendField(new Blockly.FieldNumber(1, 0, 9), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "intensity");
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
	return send_combination(1,number_repeat,dropdown_intensity);
};

//Shake 
Blockly.Blocks['shake'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Schütteln")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "intensity");
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
	return send_combination(2,number_repeat,dropdown_intensity);
};


//Pirouette 
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
	var code = "Gb14:";
	for(var r = 0; r < number_repetition; r++){
		if(dropdown_direction == "Links")
			code += "BL4.3:";
		else
			code += "BR4.3:";
	}
	return code;
};


/********* MELODY (Melodie M) ****************/

//Play Melody 
Blockly.Blocks['melody'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Melodie abspielen")
			.appendField(new Blockly.FieldDropdown([["Tusch", "M1"], ["Romantisch", "M2"], ["Star Wars", "M3"]]), "melody");
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
	var code = dropdown_melody + ':';
	console.log(code);
	return code;
};

/********* SETTINGS G (Einstellungen) *****************/

Blockly.Blocks['motor'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Motor")
			.appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["1+2", "b"]]), "motor")
			.appendField("Leistung:")
			.appendField(new Blockly.FieldNumber(12, 1, 16), "velocity");
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
	//number must have two digits: 01 to 16
	let velocity = number_velocity < 10 ? '0' + number_velocity : number_velocity;
	var code = 'G' + dropdown_motor + velocity + delimiter;
	console.log(code);
	return code;
};

/**************** LED-Display A (Anzeige) *************/

//Write a text LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kt997q
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

// Show a picture LINK.https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kbbzas
Blockly.Blocks['show_picture'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zeige");
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Fröhlich", "1"], ["Herz", "2"], ["Herz klein", "3"], ["Traurig", "4"], ["Böse", "5"], ["Müde", "6"], ["Überrascht", "7"], ["Richtig", "8"], ["Falsch", "9"]]), "pic")
		this.appendDummyInput()
			.appendField("für")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "show_duration");
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
	var dropdown_pic = block.getFieldValue("pic");
	if(dropdown_pic == "Wähle ein Bild"){
		alert("Bitte wähle ein Bild aus");
		return "?" + delimiter;
	}
	var number_show_duration = block.getFieldValue('show_duration');
	var code = "A" + dropdown_pic + number_show_duration + delimiter;
	return code;
};

/******* Repeat (Wiederholung Wh) **********/
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

function strip(str) {
	//remove unwanted whitespaces
    return str.replace(/^\s+|\s+$/g, '');
}

Blockly.JavaScript['repetition'] = function (block) {
	var number_repetition = block.getFieldValue('repetition');
	var statements_repeat = strip(Blockly.JavaScript.statementToCode(block, 'repeat'));
	var code = statements_repeat;
	for(var n = 1; n < number_repetition; n++){
		code += statements_repeat;
	}
	return code;
};