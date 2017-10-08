var cfg = require('config');

/*
 * Controls the worker minions during peace and war time.
 */

//TODO create separate doctrines for both peace and war-time.
runPeace = function() { run(); };
runWar = function() { run(); };

/*
 * Run the peace time work tasks and functions
 */
run = function() {
	//var construct = sort.construct();
	//var sources = sort.sources();
	//var toRepair = sort.toRepair();
	//var dropSpot = sort.getDrop();
	//var container = sort.container();

	/*for (creep in Game.creeps) {
		if (needEnergy(creep)) {
			getEnergy(creep, container, sources);
		} else {
			runJob(creep, construct, toRepair, dropSpot);
		}
	}*/
};

/*
 * Only gather energy when capacity is 0, otherwise work with available energy.
 */
needEnergy = function(creep) {
	if (creep.carry.energy == 0) {
		creep.memory.gather = true;
	} else if (creep.carry.energy == creep.carryCpacity) {
		creep.memory.gather = false;
	}
	return creep.memory.gather;
};

/*
 * Gather energy based on whether the creep is a designated gatherer or a regular worker.
 */
getEnergy = function(creep, container, sources) {
	if (creep.memory.role == gatherer) {
		jobGather(creep, sources);
	} else {
		jobWithdrawy(creep, container);
	}
};

/*
 * Run each indvidual minions job
 */
runJob = function(creep, construct, toRepair, dropSpot) {
	if (creep.memory.role == 'transporter') {
		jobTransport(creep, dropSpot);
	} else if (creep.memory.role == 'upgrader') {
		jobUpgrade(creep);
	} else if (creep.memory.role == 'builder') {
		jobBuild(creep, construct, toRepair);
	}
};

/*
 * Transfer energy or move to container.
 */
jobTransport = function(creep, dropSpot) {
	if (creep.transfer(dropSpot, RESOURCE_ENERGY, creep.carry) == ERR_NOT_IN_RANGE) {
		creep.moveTo(dropSpot, {visualizePathStyle : {stroke: cfg.getColorWorker()}});
	}
};

/*
 * Upgrade or move to the controller.
 */
jobUpgrade = function(creep) {
	if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
		creep.moveTo(creep.room.controller, {visualizePathStyle : {stroke: cfg.getColorWorker()}});
	}
};

/*
 * Construct or move to construction site. If there are no available construction sites repair base.
 */
jobBuild = function(creep, construct, toRepair) {
	if (construct) {
		if (creep.build(construct[0] == ERR_NOT_IN_RANGE)) {
			creep.moveTo(construct[0], {visualizePathStyle : {stroke: cfg.getColorWorker()}});
		}
	} else {
		if (creep.repair(toRepair[0] == ERR_NOT_IN_RANGE)) {
			creep.moveTo(toRepair[0], {visualizePathStyle : {stroke: cfg.getColorWorker()}});
		}
	}
};

/*
 * Harvest or move to sources.
 */
jobGather = function(creep, sources, peace) {
	if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
		creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: cfg.getColorWorker()}});
	}
};

/*
 * Withdraw or move to container.
 */
jobWithdraw = function(creep, container) {
	if (creep.withdraw(container, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry)) == ERR_NOT_IN_RANGE) {
		creep.moveTo(container, {visualizePathStyle : {stroke: cfg.getColorWorker()}});
	}
};

module.exports = { runPeace, runWar };
