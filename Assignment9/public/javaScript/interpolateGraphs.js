const HEIGHT = 600;
const WIDTH = 600;
const MARGIN = 30;

var data = [
    [0, 5],
    [1, 9],
    [2, 7],
    [3, 5],
    [4, 3],
    [6, 4],
    [7, 3],
    [8, 3],
    [9, 2]
];
var interpolates = [{
    "d3Curve": d3.curveLinear,
    "curveTitle": "curveLinear"
}, {
    "d3Curve": d3.curveLinearClosed,
    "curveTitle": "curveLinear"
}, {
    "d3Curve": d3.curveStep,
    "curveTitle": "curveStep"
}, {
    "d3Curve": d3.curveBasis,
    "curveTitle": "curveBasis"
}, {
    "d3Curve": d3.curveBundle.beta(.7),
    "curveTitle": "curveBasis"
}, {
    "d3Curve": d3.curveCardinal,
    "curveTitle": "curveCardinal"
}, {
    "d3Curve": d3.curveCardinalClosed,
    "curveTitle": "curveCardinalClosed"
}, {
    "d3Curve": d3.curveCatmullRom,
    "curveTitle": "curveCatmullRom"
}]

var translate = function(x, y) {
    return `translate(${x},${y})`;
};

var appendLine = function(line, g, className, data) {
    g.append('path')
        .classed(className, true)
        .attr('d', line(data))
};
var selectCircles = function(lineGroup, data) {
    lineGroup.selectAll('circle').data(data).enter()
        .append('circle')
        .classed('circle', true)
        .attr('r', 5);
}

var plotCirclesForSin = function(g, xScale, yScale, data) {
    selectCircles(g, data);
    var circles = g.selectAll('circle');
    circles.attr('cx', (x) => xScale(x))
        .attr('cy', (x) => yScale(Math.sin(x) + 5));
    g.selectAll('circle').exit().remove();
}
var plotCircles = function(g, xScale, yScale, data) {
    selectCircles(g, data);
    var circles = g.selectAll('circle');
    circles.attr('cx', ([x, y]) => xScale(x))
        .attr('cy', ([x, y]) => yScale(y));
    g.selectAll('circle').exit().remove();
}

var showGraphs = function(interpolator) {

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

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(yAxis);

    var line = d3.line()
        .x(([x, y]) => xScale(x))
        .y(([x, y]) => yScale(y))
        .curve(interpolator.d3Curve);

    var sinedLine = d3.line()
        .x((x) => xScale(x))
        .y((x) => yScale(Math.sin(x) + 5))
        .curve(interpolator.d3Curve);

    var lineGroup = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));
    appendLine(line, lineGroup, "simple-line", data);
    plotCircles(lineGroup, xScale, yScale, data);
    var sinData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var sinLineGroup = svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN));
    appendLine(sinedLine, sinLineGroup, "sin-line", sinData);
    plotCirclesForSin(sinLineGroup, xScale, yScale, sinData);

}

window.onload = function() {
    interpolates.forEach(function(interpolator) {
        showGraphs(interpolator);
    })
};
