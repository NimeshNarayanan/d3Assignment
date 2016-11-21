const HEIGHT = 600;
const WIDTH = 600;
const RADIUS = Math.min(HEIGHT, WIDTH) / 2;

var data = [1, 1, 2, 2, 1, 2, 1];
var color = d3.schemeCategory20;

var translate = function(x, y) {
    return `translate(${x},${y})`;
};

var fillLayout = function(interpolator) {

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append("g")
        .attr("transform", translate(WIDTH / 2, HEIGHT / 2));
    var pie = d3.pie().sort(null).value((d) => d)
        .startAngle(0)
        .endAngle(Math.PI);
    var arc = d3.arc()
        .innerRadius(RADIUS / 2)
        .outerRadius(RADIUS);

    var g = svg.selectAll('g')
        .data(pie(data))
        .enter()
        .append('g');

    g.append('path')
        .style('fill', (d, i) => color[i])
        .attr("d", arc);
}
window.onload = function() {
    fillLayout();
};
