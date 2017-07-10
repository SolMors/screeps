/*Configuration of commonly used variables*/

	/* Pathcolors */
	var colorWorker = '#00c5ff';
	var colorAttack = '#ff6700';
	var colorRetreat = '#ff00c1';

	/* RCL doctrines */
	var rclDoctrine = {
		'1': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'2': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'3': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'4': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'5': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'6': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'7': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		},
		'8': {'pop': 
			{'gatherer':0, 'transporter':0, 'builder':0, 'upgrader':0}
		}
	};

module.exports = {
	getColorWorker: function() {
		return colorWorker;
	};
	getColorAttack: function() {
		return colorAttack;
	}
	getColoRetreat: function() {
		return colorRetreat;
	}
	getRclDoctrine: function(roomRcl) {
		return rclDoctrine[roomRcl];
	}
};
