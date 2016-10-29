var _data = [];

var translate = function(x, y) {
    return `translate(${ x },${ y })`;
};

var color = d3.scaleOrdinal().domain([1,100]).range(['gray','darkcyan ','steelblue'])
//generating random numbers......................

var generate_random_number = function(data1) {
    var newData = [];
    for (i = 0; i < 10; i++)
        newData.push(generateUniqueKey(i));
    return newData;
}

var initializeChart = function(data) {
    var bars = d3.select('.container').selectAll('div')
							.classed('old',true)
							.data(data,function (d) {return d.key;});
    var new_bar = bars.enter().append('div')
        .classed('rect', true)
				.text(function(d){return d.value;})
				.style('text-align', 'right')
        .style('width', function(d) {
            return d.value * 10 + "px"
        })
        .style('height', 30 + 'px')
				.style('background-color', function(d){
					return color(d.value)
				});
		bars.exit().remove();

}

var generateUniqueKey = function(index) {
	var key = {};
	index = index?index:Math.floor((Math.random() * 100)+1);
	key['value'] = Math.floor((Math.random() * 100)+1);
	key['key'] = Math.floor((Math.random() * 100)+index)
	return key;

}
var loadChart = function(){
	data = generate_random_number();
	setInterval(function(){
        data.shift();
        data.push(generateUniqueKey());
				initializeChart(data)
    },1000)
}
window.onload = loadChart;
