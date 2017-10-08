var brain = require('brain');

module.exports.loop = function () {
	brain.run();
	//console.log('main ok');
	if (Memory.peace == undefined) {
		Memory.peace = true;
		Memory.lastHostileContact = 0;
	};
};
