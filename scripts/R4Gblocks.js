/******** Movements (Bewegungen B) **********/

//forward	LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8p8mh
Blockly.Blocks['forward'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Vorwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "forward_duration")
			.appendField("Sekunden")
			.appendField(new Blockly.FieldImage("./media/forward.gif", 20, 20, "*"));
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
	// TODO: Assemble JavaScript into code variable.
	// Checking if a number is a float
	if (number_forward_duration % 1 != 0) {
		var code = "Bv" + number_forward_duration + ": ";
		console.log("forward block duration:" + code);
	} else {
		var code = "Bv" + number_forward_duration + ".0: ";
		console.log("forward block duration:" + code);
	}
	return code;
};

// backwards	LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xf4grh
Blockly.Blocks['back'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rückwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "back_duration")
			.appendField("Sekunden")
			.appendField(new Blockly.FieldImage("./media/back.gif", 20, 20, "*"));
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
	// TODO: Assemble JavaScript into code variable.
	if (number_back_duration % 1 != 0) {
		var code = "Bz" + number_back_duration + ": ";

	} else {
		var code = "Bz" + number_back_duration + ".0: ";

	}
	console.log("back block duration:" + code);
	return code;
};


//Left  LINK : https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2g3h6f
Blockly.Blocks['left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Links")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "left_duration")
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
	// TODO: Assemble JavaScript into code variable.
	if (number_left_duration % 1 != 0) {
		var code = "Bl" + number_left_duration + ": ";

	} else {
		var code = "Bl" + number_left_duration + ".0: ";

	}
	console.log("left block duration:" + code);
	return code;
};
//Right  LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qgqs5i
Blockly.Blocks['right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "right_duration")
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
	// TODO: Assemble JavaScript into code variable.
	if (number_right_duration % 1 != 0) {
		var code = "Br" + number_right_duration + ": ";

	} else {
		var code = "Br" + number_right_duration + ".0: ";

	}
	console.log("right block duration:" + code);
	return code;
};
//Linkskehre (L) LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ofugw8
Blockly.Blocks['turn_left'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Linkskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "turn_left_duration")
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
	// TODO: Assemble JavaScript into code variable.
	if (number_turn_left_duration % 1 != 0) {
		var code = "BL" + number_turn_left_duration + ": ";

	} else {
		var code = "BL" + number_turn_left_duration + ".0: ";

	}
	console.log("turn left block duration:" + code);
	return code;
};
// Rechtskehre (R) LINK :https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ttnvhb
Blockly.Blocks['turn_right'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Rechtskehre")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "turn_right_duration")
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
	// TODO: Assemble JavaScript into code variable.
	if (number_turn_right_duration % 1 != 0) {
		var code = "BR" + number_forward_duration + ": ";

	} else {
		var code = "BR" + number_turn_right_duration + ".0: ";

	}
	console.log("turn right block duration:" + code);
	return code;
};
// Stopp (s)

/******* Combinations (Kombinationen K) **********/

//Dance LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tvm4by
Blockly.Blocks['dance'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Tanze")
			.appendField(new Blockly.FieldNumber(1, 0, 9), "Repetition")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "itensity");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

Blockly.JavaScript['dance'] = function (block) {
	var number_repetition = block.getFieldValue('Repetition');
	var dropdown_itensity = block.getFieldValue('itensity');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

//Zigzag LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#q7rnrx
Blockly.Blocks['zigzag'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zickzack")
			.appendField(new Blockly.FieldNumber(1, 0, 9), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "itensity");
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
	var dropdown_itensity = block.getFieldValue('itensity');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};
//Shake LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#77ndmh
Blockly.Blocks['shake'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Schütteln")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["sanft", "easy"], ["mittel", "middle"], ["stark", "strong"]]), "itensity");
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
	var dropdown_itensity = block.getFieldValue('itensity');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};

//pirouette LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2imkdz
Blockly.Blocks['pirouette'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Pirouette")
			.appendField(new Blockly.FieldNumber(1, 0, 9, 1), "Repetition")
			.appendField("mal")
			.appendField(new Blockly.FieldDropdown([["Links", "left"], ["Rechts", "right"]]), "itensity");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(330);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.JavaScript['pirouette'] = function (block) {
	var number_repetition = block.getFieldValue('Repetition');
	var dropdown_itensity = block.getFieldValue('itensity');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};
/********* Melody (Melodie M) ****************/
//LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5zmrse
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
	// TODO: Assemble JavaScript into code variable.
	
	var code = dropdown_melody + ':';
	console.log(code);
	return code;
};
/*********Settings (Einstellungen G)*****************/
//LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6rdmxe
Blockly.Blocks['motor'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Motor")
			.appendField(new Blockly.FieldDropdown([["1", "motor1"], ["2", "motor2"], ["option", "OPTIONNAME"]]), "motor")
			.appendField("Leistung:")
			.appendField(new Blockly.FieldNumber(400, 400, 1024, 400), "velocity");
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
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};
/****************LED-Display */
//Write a text LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kt997q
Blockly.Blocks['show_text'] = {
	init: function () {
		this.appendValueInput("scroll_text")
			.setCheck("String")
			.appendField("Schreibe");
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
	var value_scroll_text = Blockly.JavaScript.valueToCode(block, 'scroll_text', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};
// Show a picture LINK.https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kbbzas
Blockly.Blocks['show_picture'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("Zeige");
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Smiley", "happy_face"], ["Trauriges Smiley", "sad_face"], ["Herz", "heart"]]), "pic");
		this.appendDummyInput()
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0, 0, 10, 1), "show_duration");
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
	var number_show_duration = block.getFieldValue('show_duration');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
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
Blockly.JavaScript['repetition'] = function (block) {
	var number_repetition = block.getFieldValue('repetition');
	var statements_repeat = Blockly.JavaScript.statementToCode(block, 'repeat');
	// TODO: Assemble JavaScript into code variable.
	var code = '...;\n';
	return code;
};