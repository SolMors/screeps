var dOl = require('departmentOfLabor');
var dOh = require('departmentOfHealth');
var dOd = require('departmentOfDefense');
var dOc = require('departmentofCommerce');

/*
 * Responsible for all creep production and management.
 */

run = function(roomName) {
	if (Memory.peace) {
		dOl.runPeace(roomName);
		dOh.runPeace(roomName);
		dOd.runPeace(roomName);
	} else {
		dOl.runWar(roomName);
		dOh.runWar(roomName);
		dOd.runWar(roomName);
	}
	//dOc.run();
}

module.exports = { run };
