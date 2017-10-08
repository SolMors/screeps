var architect = require('architect');
var strategy = require('strategy');
var ccc = require('creepControlCenter');

/* 
 * Execute higher brain functionings.
 */
run = function() {
	try {
		strategy.run();
		//console.log('brain run');
		for (roomName in Game.rooms) {
			initializeRoom(roomName);
			ccc.run(roomName);
			if (!Game.rooms[roomName].memory.updated) {
				architect.run(roomName);
				Game.rooms[roomName].memory.updated = true;
			}
			checkUpgrade(roomName);
		}
		checkCPU();
	} catch(error) {
		console.log(error.message + " at " + Game.time);
	}
};

/*
 * Notify when CPU exceeds CPU limit.
 */
checkCPU = function() {
	if (Game.cpu.getUsed() > Game.cpu.tickLimit) {
		console.log("CPU spiked to " + Game.cpu.getUsed() + " at " + Game.time);
	}
};

/*
 * Clean up memory.
 */
cleanMem = function() {
	for (let i in Memory.creeps) {
		if (!Game.creeps[i]) {
			Memory.creeps[i].room.memory.pop[creeps[i].memory.role] -= 1;
			delete Memory.creeps[i];
		}
	}
};

/*
 * Check whether this is a new room, if it is initialize it.
 */
initializeRoom = function(roomName) {
	const roomMem = Memory.rooms[roomName];
	//Memory.rooms[roomName].init = undefined;
	if (roomMem.init == 0) {
		roomMem.init = 1;
		roomMem.roomLevel = 0;
		roomMem.updated = false;
		roomMem.pop = {'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0};
		roomMem.sources = [];
		roomMem.sourceSlots = 0;
		for (count in Game.rooms[roomName].find(FIND_SOURCES)) {
		    var source = Game.rooms[roomName].find(FIND_SOURCES)[count];
			roomMem.sources.push(source.id);
			//setAvailable(src, roomName);
			//roomMem.sourceSlots += src.memory.available;
			let avail = setAvailable(source, roomName);
			//console.log(avail);
			roomMem.sourceSlots += avail;
		}
	}
};

/*
 * Find the amount of squares adjacent to the source whose terrain is not Wall.
 */
setAvailable = function(src, roomName) {
	var available = 0;
	let checkX = src.pos.x - 1;
	while (checkX <= src.pos.x + 1) {
	    let checkY = src.pos.y - 1;
		while (checkY <= src.pos.y + 1) {
		    //console.log('check wall' + checkY + ', ' + checkX);
			if (Game.map.getTerrainAt(checkX, checkY, roomName) != 'wall') {
				available++;
				//console.log('no wall');
			}
			checkY++;
		}
		checkX++;
	}
	//console.log('available:' + available);
	return available;
};

/*
 * Check whether the room needs to be upgraded.
 */
checkUpgrade = function(roomName) {
	if (Game.rooms[roomName].controller.level > Game.rooms[roomName].memory.roomLevel) {
		Game.rooms[roomName].memory.updated = false;
		Game.rooms[roomName].memory.roomLevel = Game.rooms[roomName].controller.level;
	}
};

module.exports = { run };
