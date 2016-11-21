const HEIGHT = 600;
const WIDTH = 600;
const MARGIN = 30;

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var translate = function(x, y) {
    return `translate(${x},${y})`;
};

var appendLine = function(line, g) {
    g.append('path')
        .classed('path', true)
        .attr('d', line(data));
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
    return (Math.sin(3 * number) + 1) / 2
};

var fillLayout = function() {

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)

    let xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, WIDTH - (2 * MARGIN)]);

    let yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([HEIGHT - (2 * MARGIN), 0]);

    let xAxis = d3.axisBottom(xScale).ticks(10).tickFormat((d) => d);
    let yAxis = d3.axisLeft(yScale).ticks(10).tickFormat((d) => d);

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

    var sinedLine = d3.line()
        .x((x) => xScale(x))
        .y((x) => yScale(modifier(x)));

    appendLine(sinedLine, g);
    plotCirclesForSin(g, xScale, yScale);
}
window.onload = fillLayout;
