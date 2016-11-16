const WIDTH = 650;
const HEIGHT = 100;
const RADIUS = 50;
const PADDING = 50;
var translate = function(x, y) {
    return `translate(${ x },${ y })`;
};
var drawLine = function(svg) {
	d3.select('svg').append('line')
		.attr('x1',0)
		.attr('y1',100)
		.attr('x2',100)
		.attr('y2',0)
		.classed('shapes',true)
		.style('stroke','blue')
		.attr('transform',translate(10,5));
}
var drawCircle = function(svg){
	d3.select('svg').append('circle')
			.attr('cx',100)
			.attr('cy',50)
			.attr('r',RADIUS)
			.classed('shapes',true)
			.attr('transform',translate(100,5))
}
var drawRectangle = function () {
		d3.select('svg').append('rect')
				.classed('shapes',true)
				.attr('width',100)
				.attr('height',HEIGHT)
				.attr('stroke','steelblue')
				.attr('rx',10)
				.attr('ry',10)
				.attr('transform',translate(300,5));
}
var drawTriangle = function (svg) {
		d3.select('svg').append('polygon')
				.classed('shapes',true)
				.attr('points',"100,100  50,0  0,100")
				.attr('transform',translate(450,5));
}
var drawShapes = function() {
	var svg = d3.select('.container').append('svg')
					.attr('width',WIDTH)
					.attr('height',115)

	drawLine();
	drawCircle()
	drawRectangle()
	drawTriangle()
}
window.onload = drawShapes;
