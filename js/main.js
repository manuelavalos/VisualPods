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
		class: "big_circle",
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
	// First lets create our drawing surface out of existing SVG element
	// If you want to create new surface just provide dimensions
	// like s = Snap(800, 600);
	var s = Snap(config.id);

	var cant_people = (config.roles[0].pm + config.roles[1].sm + config.roles[2].tl + config.roles[3].ba + config.roles[4].dev + config.roles[5].dev_op + config.roles[6].qcl + config.roles[7].qca + config.roles[8].qcm + config.roles[9].ux_vd + config.roles[10].mngmt);
	var deg_per_person = Number(360/cant_people);
	var actual_deg = 0;
	var half_circle = 180;
	var cantRoles = config.roles.length;
	var resourcesCircles = [];

	//Recorro el array de roles, la cantidad es fija (11 roles)
	for (var i = 0; i < cantRoles; i++) {
		var role = Object.keys(config.roles[i])[0];
		var role_color = config.roles[i].color || defaults.roles[i].color;
		var cantResoruceWithRole = config.roles[i][role];

		//Por cada rol, busco los integrantes que cumplen ese rol (1pm, 4 dev, 2cq, etc)
		for (var q = 0; q < cantResoruceWithRole; q++) {
			//Creo otro array dentro del array que contendrá el objeto Snap.svg
			resourcesCircles[i] = [];

			//Guardo el objeto Snap.svg (s.circle) en el array
			resourcesCircles[i][q] = s.circle(70, 70, 20);

			//Fill circle with a special config color.
			var fill = config.pod.color || defaults.pod.color;

			//Draw the circle with the attributes.
			resourcesCircles[i][q].attr({
				id: config.id+"_"+i+"_"+q,
				class: "resources_circles",
				fill: role_color,
				stroke: "#FFF",
				strokeWidth: 5,
				angle: Math.ceil((half_circle - actual_deg)),
				transform:"translate(150, 150), rotate("+ Math.ceil((half_circle - actual_deg))+")",
				filter: s.filter(Snap.filter.shadow(1, 0, 2, 'black', 1)), //dropshadow
			}).hover(hoverover, hoverout).click(clickFunc);

			//Actualizo el angulo para el proximo circulo.
			actual_deg += deg_per_person;
		}
	}
}

var hoverover = function() {
	this.animate({
		r: 25,
	}, 500, mina.backout);
};
var hoverout = function() {
	this.animate({
		r: 20,
	}, 500, mina.bounce);
};

var clickFunc = function(){
	var id = this.node.attributes.id.value;
	console.log("Click! ", id);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
	var data = google.visualization.arrayToDataTable([
	  ['Values', 'Percentage'],
	  ['Act Ethically',    	5],
	  ['Team Player',     	5],
	  ['Continue Innovate', 2],
	  ['Excelence', 		7],
	  ['Think Big',      	2],
	  ['Have Fun', 			2]
	]);

	var options = {
	  title: 'Globant Values',
	  pieHole: 0.4,
	  backgroundColor: {
	  	stroke: '#696969',
	  	strokeWidth: 0,
	  	fill: '#FFF'
	  },
	  slices: {
	    0: { color: '#1d5e9e' },
	    1: { color: '#64428c' },
	    2: { color: '#d3d240' },
	    3: { color: '#03a5c3' },
	    4: { color: '#009a91' },
	    5: { color: '#f0970e' }
	  }
	};
	var chart = new google.visualization.PieChart(document.getElementById('Svg1_piechart'));
	chart.draw(data, options);

	var chart2 = new google.visualization.PieChart(document.getElementById('Svg2_piechart'));
	chart2.draw(data, options);
}

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
			type: 'pod',
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
			{'sm': 		0},
			{'tl': 		1},
			{'ba': 		0},
			{'dev': 	7},
			{'dev_op': 	0},
			{'qcl': 	1},
			{'qca': 	0},
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
			{'sm': 		1},
			{'tl': 		0},
			{'ba': 		5},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	1},
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
			{'ba': 		2},
			{'dev': 	0},
			{'dev_op': 	0},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	0},
			{'ux_vd': 	3},
			{'mngmt': 	1}
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
			{'dev_op': 	4},
			{'qcl': 	0},
			{'qca': 	0},
			{'qcm': 	2},
			{'ux_vd': 	0},
			{'mngmt': 	1}
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
			{'ba': 		1},
			{'dev': 	0},
			{'dev_op': 	4},
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
			{'pm': 		1},
			{'sm': 		0},
			{'tl': 		0},
			{'ba': 		2},
			{'dev': 	0},
			{'dev_op': 	5},
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

	create_pod(config_pod_1, defaults);
	create_pod(config_pod_2, defaults);
	create_pod(config_pod_3, defaults);
	create_pod(config_pod_4, defaults);
	create_pod(config_pod_5, defaults);
	create_pod(config_pod_6, defaults);
	create_pod(config_pod_7, defaults);

	create_people(config_pod_1, defaults);
	create_people(config_pod_2, defaults);
	create_people(config_pod_3, defaults);
	create_people(config_pod_4, defaults);
	create_people(config_pod_5, defaults);
	create_people(config_pod_6, defaults);
	create_people(config_pod_7, defaults);

	//Test de animación con SVG
	//animation_test();
})
