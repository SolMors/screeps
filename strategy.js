/*
 * Strategy to implement, depending on peace or war-time implement various doctrines.
 */

/*
 * Decide on current strategy to apply.
 */
run = function() {
	if (Memory.peace) {
		checkHostile();
	} else {
		checkPeace();
	}
};

/*
 * Check for hostiles, declare war.
 */
checkHostile = function() {
	for (roomName in Game.rooms) {
		if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).legnth > 0) {
			Memory.peace = false;
			Memory.lastHostileContact = Game.time;
		}
	}
};

/*
 * Check whether enough time has elapsed to declare peace.
 */
checkPeace = function() {
    //console.log('checking peace');
	for (roomName in Game.rooms) {
	    //console.log('peace for');
		if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS).length > 0) {
			Memory.lastHostileContact = Game.time;
		}
	}
	if (Game.time - Memory.lastHostileContact > 50) {
		Memory.peace = true;
	}
};

module.exports = { run };
