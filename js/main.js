var colors_by_rol = {
	'pm': 	 '#2c9ab1',
	'sm': 	 '#c0d653',
	'tl': 	 '#499c75',
	'ba': 	 '#86a1c9',
	'dev': 	 '#32b44a',
	'dev_op':'#ee3d5f',
	'qcl': 	 '#c54d57',
	'qca': 	 '#f9c74b',
	'qcm': 	 '#f2994e',
	'ux_vd': '#5bcbbf',
	'mngmt': '#6b4099'
}

function create_pod(config) {
	// First lets create our drawing surface out of existing SVG element
	// If you want to create new surface just provide dimensions
	// like s = Snap(800, 600);
	var s = Snap(config.id);
	// So, lets start with an empty circle.
	// It’s important that it will not have any attributes set
	var bigCircle = s.circle(150, 150, 10);

	if (config.type == 'pod') {
		var c = s.image("img/circle-red.png", 90, 90, 120, 120);
	} else if(config.type == 'team') {
		var c = s.image("img/circle-blue.png", 90, 90, 120, 120);
	};

	//-----------------------------------------------------
	// ANIMACIÓN
	//-----------------------------------------------------
	bigCircle.animate({r: 50}, 3000, mina.elastic);
}

function create_people(config){
	var cant_people = (config.roles[0].pm + config.roles[1].sm + config.roles[2].tl + config.roles[3].ba + config.roles[4].dev + config.roles[5].dev_op + config.roles[6].qcl + config.roles[7].qca + config.roles[8].qcm + config.roles[9].ux_vd + config.roles[10].mngmt);
	var deg_per_person = Number(360/cant_people);
	var color = '';
	var actual_deg = 0;
	var half_circle = 180;

	for (var i = 0; i < config.roles.length; i++) {
		var rol = Object.keys(config.roles[i])[0];
		var value = config.roles[i][rol];
		var pod_resources = new Array();

		// Set color
		color = colors_by_rol[rol];
		for (var q = 0; q < value; q++) {
			var resource_id = i + '_' + q;
			pod_resources["resource_" + resource_id] = $("#resource_base", config.id).clone();

			//Create resource circle
			pod_resources["resource_" + resource_id].attr({
				"id":"resource_" + resource_id,
				"style":"display:block",
				"transform":"rotate("+actual_deg+")"
			}).children().attr({
				"transform":"translate(0,100), rotate("+ Math.ceil(half_circle - actual_deg)+")"
			}).children().attr({
				"fill": color
			});
			//console.log(i, q, resource_id, pod_resources["resource_" + resource_id]);
			actual_deg += deg_per_person;
			if (actual_deg > 360) {
				actual_deg = 0;
			};
			$("#content_resources", config.id).append(pod_resources["resource_" + resource_id ]);
		}
	};
}

var dregreesToRadian = function (deg) {
    return deg * Math.PI / 180;
};

$(document).ready(function(){
	var config_pod_1 = {
		id:"#Svg1",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		2},
			{'dev': 	5},
			{'dev_op': 	1},
			{'qcl': 	1},
			{'qca': 	1},
			{'qcm': 	1},
			{'ux_vd': 	1},
			{'mngmt': 	1}
		],
		type:'team'
	};
	var config_pod_2 = {
		id:"#Svg2",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		2},
			{'dev': 	0},
			{'dev_op': 	5},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		type:'team'
	};

	var config_pod_3 = {
		id:"#Svg3",
		roles: [
			{'pm': 		0},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	7},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		type:'team'
	};

	var config_pod_4 = {
		id:"#Svg4",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	5},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	var config_pod_5 = {
		id:"#Svg5",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		0},
			{'ba': 		1},
			{'dev': 	5},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	3},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	var config_pod_6 = {
		id:"#Svg6",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		2},
			{'dev': 	7},
			{'dev_op': 	0},
			{'qcl': 	1},
			{'qca': 	1},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	3}
		],
		type:'pod'
	};

	var config_pod_7 = {
		id:"#Svg7",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	5},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	var config_pod_8 = {
		id:"#Svg8",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	5},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	var config_pod_9 = {
		id:"#Svg9",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	5},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	var config_pod_10 = {
		id:"#Svg10",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	5},
			{'mngmt': 	0}
		],
		type:'pod'
	};

	create_pod(config_pod_1);
	create_pod(config_pod_2);
	create_pod(config_pod_3);
	create_pod(config_pod_4);
	create_pod(config_pod_5);
	create_pod(config_pod_6);
	create_pod(config_pod_7);
	create_pod(config_pod_8);
	create_pod(config_pod_9);
	create_pod(config_pod_10);

	create_people(config_pod_1);
	create_people(config_pod_2);
	create_people(config_pod_3);
	create_people(config_pod_4);
	create_people(config_pod_5);
	create_people(config_pod_6);
	create_people(config_pod_7);
	create_people(config_pod_8);
	create_people(config_pod_9);
	create_people(config_pod_10);
})