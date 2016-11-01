var _data = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var color = d3.scaleOrdinal(d3.schemeCategory10);

var generate_random_number = function(data1) {
    var newData = [];
    for (i = 0; i < 10; i++)
        newData.push(generateUniqueKey(i));
    return newData;
}

var updateChart = function(id) {
    var bars = d3.select('.chart-container').selectAll('.rect');
    bars.sort((a, b) => d3.ascending(a[id], b[id]));

}

var loadChart = function(data) {
    var bars = d3.select('.chart-container').selectAll('div')
							.data(data);
    var new_bar = bars.enter().append('div')
        .attr('class', 'rect').style('margin-top','3px')
				.text(function(d){return d.name+' '+d.score;})
        .style('border-radius','20px')
				.style('text-align', 'center')
        .style('width', function(d) {
            return d.score * 10 + "px"
        })
        .style('height', '30px')
				.style('background-color', function(d){
					return color(d.subject)
				});
    var legend = d3.select('.legend-container')
                .selectAll('div')
                .data(d3.map(data, function(d){return d.subject;}).keys())
                .enter().append('div')
                .classed('legend',true)
                .text(function(d){return d;})
                .style('background-color', function(d){
        					return color(d)
        				});
    var button = d3.select('.button-container').selectAll('button')
                .data(Object.keys(data[0 ]))
                .enter().append('button')
                .attr('type','button')
                .attr('id',function (d) {return d;})
                .text(function (d) {
                  return d;
                })
                .attr('onclick','updateChart(this.id)')

}

var initialize = function(){
				loadChart(_data)
}
window.onload = initialize;
