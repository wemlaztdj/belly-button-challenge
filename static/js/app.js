var url ='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
var barchart
d3.json(url).then(function(data) {
    console.log(data);
    barchart= data.samples

    var select = document.getElementById('selDataset');
    select.innerHTML = '';


    var newOptions = data.names;
    // console.log(newOptions);
      for (var i = 0; i < newOptions.length; i++) {
        var option = document.createElement('option');
        option.text = newOptions[i];
        option.value = newOptions[i];
        select.add(option);
      }



  });


  function optionChanged(selectedValue) {
    console.log('Selected Value:', selectedValue);
    //update the bar chart
    var result = searchById(selectedValue); 
    console.log('Selected Value:', result);
    var trace = {
        x:  result.map(row => row.sample_values).slice(0, 5),
        
        y: 'OTU '+ result.result.map(row => row.otu_ids).slice(0, 5), 
        type: 'bar',
        orientation: 'h'  // This makes the bar chart horizontal
      };
      

      // Render the chart
      Plotly.newPlot('bar', [trace]);

  }

  function searchById(id) {
    return barchart.id === id
}

 // Searches for the object with id '941'
