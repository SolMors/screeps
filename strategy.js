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
		if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);) {
			Memory.peace = false;
			Memory.lastHostileContact = Game.time();
		}
	}
};

/*
 * Check whether enough time has elapsed to declare peace.
 */
checkPeace = function() {
	for (roomName in Game.rooms) {
		if (Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);) {
			const Game.Memory.lastHostileContact = Game.time();
		}
	}
	if (Game.time() - Game.Memory.lastHostileContact > 50) {
		const Game.Memory.peace = true;
	}
};

module.exports = { run };
