const FRAME_HEIGHT = 800;
const FRAME_WIDTH = 500;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const data = [55000, 48000, 27000, 66000, 90000];

const FRAME = 
	d3.select("#vis")
		.append("svg")
			.attr("height", FRAME_HEIGHT)
			.attr("width", FRAME_WIDTH)
			.attr("class", "frame");

// scaling 
const MAX_Y = d3.max(data, (d) => {return d;});

const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_Y])
						.range([0, VIS_HEIGHT]);

// add vertical axis
FRAME.append("g")
		.attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(4))
			.attr("font-size", "20px");

// add scaled points
FRAME.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (2 * MARGINS.left))
				.attr("cy", (d) => {
					return (Y_SCALE(d) + MARGINS.top);
				})
				.attr("r", 20)
				.attr("class", "point");



