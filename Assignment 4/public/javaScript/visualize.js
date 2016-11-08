  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var numberScale = d3.scaleLinear().domain([1, 10]).range([1, 10]);
  var appendRow = function(scale, title) {
      var row = d3.select('table tbody').append('tr');
      row.append('td').text(title);
      row.selectAll('td')
          .data(data).enter()
          .append('td')
          .text(function(d) {
              return scale(d);
          })
  }

  var loadChart = function() {
      var table = d3.select('.container').append('table')
          .style("border", "2px steelblue solid");
      table.append('tbody');
      appendRow(numberScale, 'title');
      appendRow(numberScale, 'n');
      appendRow(d3.scalePow().exponent(2), 'square');
      appendRow(d3.scaleLog(), 'log');
      appendRow(d3.scaleLog().rangeRound([0,1]),'log round')

  }
  window.onload = loadChart;
