var dregreesToRadian = function (deg) {
    return deg * Math.PI / 180;
};

function create_pod(id) {
	// First lets create our drawing surface out of existing SVG element
	// If you want to create new surface just provide dimensions
	// like s = Snap(800, 600);
	var s = Snap(id);
	// So, lets start with an empty circle.
	// It’s important that it will not have any attributes set
	var bigCircle = s.circle(150, 150, 100);
	//-----------------------------------------------------
	// Lets use it again for patterned fill
	var c1 = bigCircle.use();
	// Create pattern
	var p = s.path("M110,95,95,110M115,100,100,115").attr({
	        fill: "none",
	        stroke: "#bada55",
	        strokeWidth: 4
	    });
	var ptrn = p.pattern(100, 100, 10, 10);
	// and apply some nice attributes
	c1.attr({
	    fill: ptrn
	});

	//-----------------------------------------------------
	// Lets use it for stroke
	var c2 = bigCircle.use();
	c2.attr({
	    fill: "none",
	    stroke: "#000",
	    strokeWidth: 6
	});
	// Lets create a masking circle
	var ring = bigCircle.use();
	ring.attr({
	    fill: "none",
	    stroke: "#000",
	    strokeWidth: 20 // we need only inner 10px of it
	});
	// Hide bigCircle by moving it to <defs>
	bigCircle.toDefs();
	var mask = s.mask();
	// Background rect:
	mask.add(s.rect(0, 0, "100%", "100%").attr({fill: "#fff"}));
	// and our ring
	mask.add(ring);
	c1.attr({
	    mask: mask
	});

	/*c1.mouseover(function(e){
		console.log("Mouse Over")
		//Now, let’s animate bigCircle:
		bigCircle.animate({r: 100}, 1000, mina.elastic);
		// Despite bigCircle is not visible it affect all 3 “uses” of it.
	});

	c1.mouseout(function(e){
		console.log("Mouse Out")
		//Now, let’s animate bigCircle:
		bigCircle.animate({r: 75}, 1000, mina.elastic);
		// Despite bigCircle is not visible it affect all 3 “uses” of it.
	})
	*/
	bigCircle.animate({r: 75}, 3000, mina.elastic);
}

function create_people(object_id, cant_people){
	//var cant_people = 14;
	var pod_resources = new Array();
	var deg_per_person = Number(360/cant_people);
	var actual_deg = 0;
	var half_circle = 180;
	var roles = new Array("#556370", "#4ecdc4", "#c7f465", "#ff6b6b", "#c54d57");

	for (var i = 0; i < cant_people; i++) {
		pod_resources["resource_" + i ] = $("#resource_base", object_id).clone();
		pod_resources["resource_" + i ].attr({
			"id":"resource_"+i,
			"style":"display:block",
			"transform":"rotate("+actual_deg+")"
		}).children().attr({
			"transform":"translate(0,120), rotate("+ Math.ceil(half_circle - actual_deg)+")"
		}).children().attr({
			"fill":roles[i]
		});
		actual_deg += deg_per_person;
		if (actual_deg > 360) {
			actual_deg = 0;
		};
		$("#content_resources", object_id).append(pod_resources["resource_" + i ]);
	};
}
$(document).ready(function(){
	create_pod("#Svg");
	create_pod("#Svg2");
	create_pod("#Svg3");


	create_people("#Svg", 7);
	create_people("#Svg2", 15);
	create_people("#Svg3", 10);
})