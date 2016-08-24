function create_pod(config, defaults) {
	// First lets create our drawing surface out of existing SVG element
	// If you want to create new surface just provide dimensions
	// like s = Snap(800, 600);
	var s = Snap(config.id);
	// So, lets start with an empty circle.
	// It’s important that it will not have any attributes set
	var bigCircle = s.circle(150, 150, 80);

	//Put the flag in the middle of the pod
	var flag = config.pod.flag;
	if (flag != '') {
		var c = s.image('img/' + flag , 90, 90, 120, 120);
	};

	//Fill circle with a special config color.
	var fill = config.pod.color || defaults.pod.color;

	//Draw the circle with the attributes.
	bigCircle.attr({
		fill: fill,
		stroke: "#FFF",
		strokeWidth: 5,
		filter: s.filter(Snap.filter.shadow(1, 1, 1, 'black', 1)) //dropshadow
	});

	//-----------------------------------------------------
	// ANIMACIÓN
	//-----------------------------------------------------
	bigCircle.animate({r: 60}, 3000, mina.elastic);
}

function create_people(config, defaults){
	var cant_people = (config.roles[0].pm + config.roles[1].sm + config.roles[2].tl + config.roles[3].ba + config.roles[4].dev + config.roles[5].dev_op + config.roles[6].qcl + config.roles[7].qca + config.roles[8].qcm + config.roles[9].ux_vd + config.roles[10].mngmt);
	var deg_per_person = Number(360/cant_people);
	var color = '';
	var actual_deg = 0;
	var half_circle = 180;

	for (var i = 0; i < config.roles.length; i++) {
		var role = Object.keys(config.roles[i])[0];
		var role_color = config.roles[i].color || defaults.roles[i].color;
		var value = config.roles[i][role];
		var pod_resources = new Array();

		// Set color
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
				"fill": role_color
			});


			actual_deg += deg_per_person;
			if (actual_deg > 360) {
				actual_deg = 0;
			};

			$("#content_resources", config.id).append(pod_resources["resource_" + resource_id ]);
			//pod_resources["resource_" + resource_id].hover( hoverover, hoverout );
			//var hoverover = function() { pod_resources["resource_" + resource_id].animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
			//var hoverout = function() { pod_resources["resource_" + resource_id].animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };
		}
	};
}

function animation_test(){
	// http://svg.dabbles.info/
	var s = Snap(600,600);
	var g = s.group();
	var tux = Snap.load("http://snapsvg.io/assets/demos/tutorial/mascot.svg", function ( loadedFragment ) { 
		g.append( loadedFragment );
		g.hover( hoverover, hoverout );
	} );

	var hoverover = function() { g.animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
	var hoverout = function() { g.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };
}

var dregreesToRadian = function (deg) {
    return deg * Math.PI / 180;
};

$(document).ready(function(){
	//Default config
	var defaults = {
		roles: [
			{'pm': 		0, 'color': '#2c9ab1'},
			{'sm': 		0, 'color': '#c0d653'},
			{'tl': 		0, 'color': '#499c75'},
			{'ba': 		0, 'color': '#86a1c9'},
			{'dev': 	0, 'color': '#32b44a'},
			{'dev_op': 	0, 'color': '#ee3d5f'},
			{'qcl': 	0, 'color': '#c54d57'},
			{'qca': 	0, 'color': '#f9c74b'},
			{'qcm': 	0, 'color': '#f2994e'},
			{'ux_vd': 	0, 'color': '#5bcbbf'},
			{'mngmt': 	0, 'color': '#6b4099'}
		],
		pod: {
			type:'pod',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	}

	var config_pod_1 = {
		id:"#Svg1",
		roles: [
			{'pm': 		1},
			{'sm': 		1},
			{'tl': 		1},
			{'ba': 		1},
			{'dev': 	5},
			{'dev_op': 	0},
			{'qcl': 	1},
			{'qca': 	1},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#ed1651',
			flag:''
		},
		offshore: true,
		onsite: false
	};
	var config_pod_2 = {
		id:"#Svg2",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_3 = {
		id:"#Svg3",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_4 = {
		id:"#Svg4",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_5 = {
		id:"#Svg5",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_6 = {
		id:"#Svg6",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_7 = {
		id:"#Svg7",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_8 = {
		id:"#Svg8",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_9 = {
		id:"#Svg9",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	var config_pod_10 = {
		id:"#Svg10",
		roles: [
			{'pm': 		3},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	0},
			{'mngmt': 	0}
		],
		pod: {
			type:'team',
			color: '#00aeef',
			flag:''
		},
		offshore: true,
		onsite: false
	};

	create_pod(config_pod_1, defaults);
	create_pod(config_pod_2, defaults);
	create_pod(config_pod_3, defaults);
	create_pod(config_pod_4, defaults);
	create_pod(config_pod_5, defaults);
	create_pod(config_pod_6, defaults);
	create_pod(config_pod_7, defaults);
	create_pod(config_pod_8, defaults);
	create_pod(config_pod_9, defaults);
	create_pod(config_pod_10, defaults);

	create_people(config_pod_1, defaults);
	create_people(config_pod_2, defaults);
	create_people(config_pod_3, defaults);
	create_people(config_pod_4, defaults);
	create_people(config_pod_5, defaults);
	create_people(config_pod_6, defaults);
	create_people(config_pod_7, defaults);
	create_people(config_pod_8, defaults);
	create_people(config_pod_9, defaults);
	create_people(config_pod_10, defaults);

	//Test de animación con SVG
	animation_test();
})
