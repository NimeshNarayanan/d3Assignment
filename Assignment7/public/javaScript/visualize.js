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

var translate = function(x, y) {
    return `translate(${x},${y})`;
};

var appendLine = function(line, g) {
    g.append('path')
        .classed('path', true)
        .attr('d', line(data));
}
var fillLayout = function() {

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
        .x(([x, y]) => xScale(x))
        .y(([x, y]) => yScale(y));
    var signedLine = d3.line()
        .x(([x, y]) => xScale(x))
        .y(([x, y]) => {
            console.log(x, y, Math.sin(x) + .5);
            return yScale(Math.sin(x) + 5);
        })
    appendLine(line, g);
    appendLine(signedLine, g)

    // g.append('path')
    //     .classed('path', true)
    //     .attr('d', line(data));
}
window.onload = fillLayout;
