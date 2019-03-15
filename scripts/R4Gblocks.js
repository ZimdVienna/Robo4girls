/******** Movements (Bewegungen B) **********/

	//forward	LINK: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8p8mh
	Blockly.Blocks['forward'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField("Vorwärts")
			.appendField("für")
			.appendField(new Blockly.FieldNumber(0.1, 0.1, 9.9, 0.1), "forward_duration")
			.appendField("Sekunden");
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
	  var code = "Bv" + number_forward_duration +":";
	  console.log("forward block duration:"+ code);	
	  return code;
	};

	//backwards


/******* Combinations (Kombinationen K) **********/