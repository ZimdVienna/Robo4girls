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

/*
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
*/

// backwards	LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xf4grh
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
  if (number_back_duration %1 != 0) {
	var code = "Bz" + number_back_duration +": ";
	console.log("back block duration:"+ code);	
	} else {
		var code = "Bz" + number_back_duration +".0: ";
		console.log("back block duration:"+ code);	
	}
  return code;
};

/*
	//backwards
	Blockly.Blocks['back'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("Rückwärts")
					.appendField("für")
					.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "back_duration")
					.appendField("Sekunden");
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
					.appendField("Sekunden");
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
					.appendField("Sekunden");
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
					.appendField("Sekunden");
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	 // Rechtskehre (R) 
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
					.appendField("Sekunden");
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