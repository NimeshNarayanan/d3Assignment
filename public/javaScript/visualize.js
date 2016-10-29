var _data = [];

var translate = function(x, y) {
    return `translate(${ x },${ y })`;
};

//generating random numbers......................

var generate_random_number = function(data1) {
    var newData = [];
    for (i = 0; i < 10; i++)
        newData.push(Math.floor((Math.random() * 100)));
    return newData;
}

var initializeChart = function(data) {
    var bars = d3.select('.container').selectAll('div')
							.classed('old',true)
							// .style('background-color','steelblue')
							.data(data,function (d) {return d;});
    var new_bar = bars.enter().append('div')
        .classed('rect', true)
        .style('background-color', 'blue')
				.text(function(d){return d;})
				.style('text-align', 'right')
        .style('width', function(d) {
            return d * 10 + "px"
        })
        .style('height', 30 + 'px')
				.transition()
				.duration(10000)
				.ease(d3.easeLinear)
				.style('background-color','brown')
		bars.exit().remove();

}

var generateUniqueKey = function() {

}
var loadChart = function(){
	data = generate_random_number();
	setInterval(function(){
        data.shift();
        data.push(Math.floor((Math.random()*100)));
				initializeChart(data)
    },1000)
}
window.onload = loadChart;
