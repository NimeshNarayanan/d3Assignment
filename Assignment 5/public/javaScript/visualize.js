var data = [0,1,2,3,4,5,6,7,8,9,10];
var linear = d3.scaleLinear()
	.domain([0,10])
	.range(['italic bold 12px/30px Georgia, serif','italic bold 120px/180px Georgia, serif'])

var magnifyNumbers = function () {
	var square = d3.select('.container')
		.selectAll('div')
		.data(data,function (d) {
			return d;
		})
		.enter()
		.append('div')
		.classed('box',true)
		.style('font', function (d) {
				return linear(d);
		})
		.text(function (d) {
			return d;
		});
}


window.onload = magnifyNumbers;
