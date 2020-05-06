var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv', {
	media: 'media/',
	toolbox: document.getElementById('toolbox')
})


var onresize = function(e) {
	// Compute the absolute coordinates and dimensions of blocklyArea.
	var element = blocklyArea;
	var x = 0;
	var y = 0;
	do {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	} while (element);

	// Position blocklyDiv over blocklyArea.
	blocklyDiv.style.left = x + 'px';
	blocklyDiv.style.top = y + 'px';
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	Blockly.svgResize(workspace);
};


window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

// An href with #key trigers an AJAX call to retrieve saved blocks.
if ('BlocklyStorage' in window && window.location.hash.length > 1) {
	BlocklyStorage.retrieveXml(window.location.hash.substring(1));
}
