var brain = require('brain');

module.exports.loop = function () {
	brain.run();
	if (Memory.peace == undefined) {
		Memory.peace = true;
		Memory.lastHostileContact = 0;
	};
};
