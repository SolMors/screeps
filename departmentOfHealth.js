var cfg = require('config');

/* 
 * Department of Health tracks the current minion population and spawns the appropriate amount of creeps.
 */

runPeace = function(roomName) {
	var currRoom = Game.rooms[roomName];
	checkPopulation(currRoom);
	spawnCreep(currRoom);
};

runWar = function(roomName) {
    var currRoom = Game.rooms[roomName];
	checkPopulation(currRoom);
	spawnCreep(currRoom); 
   
};

checkPopulation = function(currRoom) {
	var rclPop = cfg.getRclDoctrine(currRoom.controller.level)['pop'];
	for (workerType in currRoom.memory.pop) {
		if (currRoom.memory.pop[workerType] < rclPop[workerType]) {
			currRoom.memory.spawnQ.push(workerType);
			currRoom.memory.pop[workerType] += 1;
		}
	}
};

spawnCreep = function(currRoom) {
	var mySpawn = currRoom.find(FIND_MY_SPAWNS)[0];
	if (!mySpawn.spawning) {
		var toSpawn = currRoom.memory.spawnQ.shift();
		var body = cfg.getRclDoctrine(currRoom.controller.level)['body'][toSpawn];
		var cost = calcBodyCost(body);
		if (cost <= currRoom.energyAvailable) {
			var newName = mySpawn.createCreep(body, undefined, {role: toSpawn, source: null});
		} else if (currRoom.memory.pop['gatherer'] == 0) {
			var newName = mySpawn.createCreep([WORK, CARRY, MOVE, MOVE], 
							  undefined, 
							  {role: 'eHarvester', gather: 'true', source: null});
		}
	}
};	
		
module.exports = { runPeace, runWar };
