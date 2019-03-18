/******** Movements (Bewegungen B) **********/

	//forward	LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8p8mh
	Blockly.Blocks['forward'] = {
		init: function() {
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
	

	Blockly.JavaScript['forward'] = function(block) {
	  var number_forward_duration = block.getFieldValue('forward_duration');
		// TODO: Assemble JavaScript into code variable.
		// Checking if a number is a float
		if (number_forward_duration %1 != 0) {
			var code = "Bv" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "Bv" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
	  return code;
	};

	//backwards
	Blockly.Blocks['back'] = {
		init: function() {
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
	Blockly.JavaScript['back'] = function(block) {
		var number_back_duration = block.getFieldValue('back_duration');
		// TODO: Assemble JavaScript into code variable.
		if (number_forward_duration %1 != 0) {
			var code = "Bz" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "Bz" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
		return code;
	};
	//Left 
	Blockly.Blocks['left'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("Links")
					.appendField("für")
					.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "left_duration")
					.appendField("Sekunden")
					.appendField(new Blockly.FieldImage("./media/left.gif", 20, 20, "*"));
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	Blockly.JavaScript['left'] = function(block) {
		var number_left_duration = block.getFieldValue('left_duration');
		// TODO: Assemble JavaScript into code variable.
		if (number_forward_duration %1 != 0) {
			var code = "Bl" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "Bl" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
		return code;
	};
	 //Right 
	 Blockly.Blocks['right'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("Rechts")
					.appendField("für")
					.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "right_duration")
					.appendField("Sekunden")
					.appendField(new Blockly.FieldImage("./media/right.gif", 20, 20, "*"));
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	Blockly.JavaScript['right'] = function(block) {
		var number_right_duration = block.getFieldValue('right_duration');
		// TODO: Assemble JavaScript into code variable.
		if (number_forward_duration %1 != 0) {
			var code = "Br" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "Br" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
		return code;
	};
	 //Linkskehre (L)
	 Blockly.Blocks['turn_left'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("Linkskehre")
					.appendField("für")
					.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "turn_left_duration")
					.appendField("Sekunden")
					.appendField(new Blockly.FieldImage("./media/turn_left.gif", 20, 20, "*"));
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	 Blockly.JavaScript['turn_left'] = function(block) {
		var number_turn_left_duration = block.getFieldValue('turn_left_duration');
		// TODO: Assemble JavaScript into code variable.
		if (number_forward_duration %1 != 0) {
			var code = "BL" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "BL" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
		return code;
	};
	// Rechtskehre (R)
	Blockly.Blocks['turn_right'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("Rechtskehre")
					.appendField("für")
					.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "turn_right_duration")
					.appendField("Sekunden")
					.appendField(new Blockly.FieldImage("./media/turn_right.gif", 20, 20, "*"));
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	Blockly.JavaScript['turn_right'] = function(block) {
		var number_turn_right_duration = block.getFieldValue('turn_right_duration');
		// TODO: Assemble JavaScript into code variable.
		if (number_forward_duration %1 != 0) {
			var code = "BR" + number_forward_duration +": ";
			console.log("forward block duration:"+ code);	
		}	else {
			var code = "BR" + number_forward_duration +".0: ";
			console.log("forward block duration:"+ code);	
		}
		return code;
	};
	 // Stopp (s)

/******* Combinations (Kombinationen K) **********/
//Dance
Blockly.Blocks['dance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tanze")
        .appendField(new Blockly.FieldNumber(1, 0, 9), "Repetition")
        .appendField("mal")
        .appendField(new Blockly.FieldDropdown([["sanft","easy"], ["mittel","middle"], ["stark","strong"]]), "itensity");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['dance'] = function(block) {
  var number_repetition = block.getFieldValue('Repetition');
  var dropdown_itensity = block.getFieldValue('itensity');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

//Zigzag
Blockly.Blocks['zigzag'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Zickzack")
        .appendField(new Blockly.FieldNumber(1, 0, 9), "repeat")
        .appendField("mal")
        .appendField(new Blockly.FieldDropdown([["sanft","easy"], ["mittel","middle"], ["stark","strong"]]), "itensity");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['zigzag'] = function(block) {
  var number_repeat = block.getFieldValue('repeat');
  var dropdown_itensity = block.getFieldValue('itensity');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

//shake
Blockly.Blocks['shake'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Schütteln")
        .appendField(new Blockly.FieldNumber(1, 0, 9, 1), "repeat")
        .appendField("mal")
        .appendField(new Blockly.FieldDropdown([["sanft","easy"], ["mittel","middle"], ["stark","strong"]]), "itensity");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['shake'] = function(block) {
  var number_repeat = block.getFieldValue('repeat');
  var dropdown_itensity = block.getFieldValue('itensity');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
 //Pirouette
 Blockly.Blocks['pirouette'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pirouette")
        .appendField(new Blockly.FieldNumber(1, 0, 9, 1), "Repetition")
        .appendField("mal")
        .appendField(new Blockly.FieldDropdown([["Links","left"], ["Rechts","right"]]), "itensity");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['pirouette'] = function(block) {
  var number_repetition = block.getFieldValue('Repetition');
  var dropdown_itensity = block.getFieldValue('itensity');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
/*********** Melody (Melodie M) ********************/
Blockly.Blocks['melody'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Melodie  abspielen")
        .appendField(new Blockly.FieldDropdown([["Tusch","M1"], ["Romantisch","M2"], ["Star Wars","M3"]]), "melody");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['melody'] = function(block) {
  var dropdown_melody = block.getFieldValue('melody');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};







/******* Repeat (Wiederholung Wh) **********/
Blockly.Blocks['repetition'] = {
  init: function() {
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
Blockly.JavaScript['repetition'] = function(block) {
  var number_repetition = block.getFieldValue('repetition');
  var statements_repeat = Blockly.JavaScript.statementToCode(block, 'repeat');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};