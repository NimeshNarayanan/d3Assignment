const HEIGHT = 600;
const WIDTH = 600;
const MARGIN = 30;

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var interpolates = [{
    "d3Curve": d3.curveLinearClosed,
    "curveTitle": "curveLinear"
}, {
    "d3Curve": d3.curveStep,
    "curveTitle": "curveStep"
}, {
    "d3Curve": d3.curveBasisOpen,
    "curveTitle": "curveBasis"
}, {
    "d3Curve": d3.curveCardinalClosed,
    "curveTitle": "curveCardinalClosed"
}, {
    "d3Curve": d3.curveBasis,
    "curveTitle": "curveBasis"
}]

var translate = function(x, y) {
    return `translate(${x},${y})`;
};

var plotGraphWithArea = function(graph, g, className) {
    g.append('path')
        .classed(className, true)
        .attr('d', graph(data));
};
var selectCircles = function(lineGroup) {
    lineGroup.selectAll('circle').data(data).enter()
        .append('circle')
        .classed('circle', true)
        .attr('r', 5);
}

var plotCirclesForSin = function(g, xScale, yScale) {
    selectCircles(g);
    var circles = g.selectAll('circle');
    circles.attr('cx', (x) => xScale(x))
        .attr('cy', (x) => yScale(modifier(x)));
    g.selectAll('circle').exit().remove();
}

var modifier = function(number) {
    return (3 * Math.sin(number) + 5)
};

var fillLayout = function(interpolator) {

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)

    let xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, WIDTH - (2 * MARGIN)]);

    let yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([HEIGHT - (2 * MARGIN), 0]);

    let xAxis = d3.axisBottom(xScale).ticks(10).tickFormat((d) => d / 10);
    let yAxis = d3.axisLeft(yScale).ticks(10).tickFormat((d) => d / 10);

    var g = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(yAxis);

    var line = d3.line()
        .x((x) => xScale(x))
        .y((x) => yScale(modifier(x)))
        .curve(interpolator.d3Curve);
    var area = d3.area()
        .x((d) => xScale(d))
        .y1((d) => yScale(3 * Math.sin(d) + 5))
        .y0(yScale(0))
        .curve(interpolator.d3Curve);

    plotGraphWithArea(line, g, "line");
    plotGraphWithArea(area, g, "path");
    plotCirclesForSin(g, xScale, yScale);
}
window.onload = function() {
    interpolates.forEach(function(interpolator) {
        fillLayout(interpolator);
    })
};
