var url ='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
var chart;
var matadata;
d3.json(url).then(function(data) {
    console.log(data);
    chart= data.samples
    matadata= data.metadata
    console.log(matadata);
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

      optionChanged('940');


  });


  function optionChanged(selectedValue) {
    console.log('Selected Value:', selectedValue);
    //update the bar chart
      barchart(selectedValue);
      bubblechart(selectedValue);
      mata(selectedValue);

  }

  function searchById(theid) {
    console.log(chart);
    return chart.filter(item=> item.id===theid)[0]
  }
  function searchmataById(theid) {
    console.log(matadata);
    return matadata.filter(item=> item.id===theid)[0]
  }

  function barchart(selectedValue){
    var result = searchById(selectedValue); 
    
    
    
    console.log(result);


    var ids = result.otu_ids.slice(0,10)
    var values = result.sample_values.slice(0,10)
    var lables= result.otu_labels.slice(0,10)
    
    console.log('Selected ids:', ids);
    console.log('Selected values:', values);
    console.log('Selected lables:', lables);

    var barlist=[]
    for (var i=0;i<ids.length;i++){
      barlist.push(
        {
          'ids':ids[i],
          'values':values[i],
          'lables':lables[i]

        }
      )

    }    
    var sortedbarlist=barlist.sort((a,b)=>a.values-b.values)
    
    var trace = {
        x:  sortedbarlist.map(item=>item.values),
        
        y: sortedbarlist.map(item=>`OTU ${item.ids}`), 

        hovertext: sortedbarlist.map(item=>item.lables),


        type: 'bar',
        orientation: 'h'  // This makes the bar chart horizontal
      };
      

      // Render the chart
      Plotly.newPlot('bar', [trace]);





  }


  function bubblechart(selectedValue){
    var result = searchById(selectedValue);
    var trace1 = {
      x: result.otu_ids,
      y: result.sample_values,
      mode: 'markers',
      marker: {
        size: result.sample_values,
        color: result.otu_ids
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: result.otu_labels,
      showlegend: false,
      height: 600,
      width: 1500
    };
    
    Plotly.newPlot('bubble', data, layout);
  }

  function mata(selectedValue){

    var mataresult = searchmataById(selectedValue);
    var table = d3.select("sample-metadata");
    table.html("");
    console.log('mataresult:'+mataresult);


    var row = table.append("tr");
    
   
      row.append("td").text("id");
      row.append("td").text(result.id);
     
    row = table.append("tr");

      row.append("td").text("ethnicity");
      row.append("td").text(result.ethnicity);
     
    row = table.append("tr");
      
      row.append("td").text("gender");
      row.append("td").text(result.gender);
     
    row = table.append("tr");
      
      row.append("td").text("age");
      row.append("td").text(result.age);
     
    row = table.append("tr");
      
      row.append("td").text("location");
      row.append("td").text(result.location);
     
    row = table.append("tr");
      
      row.append("td").text("bbtype");
      row.append("td").text(result.bbtype);
     
    row = table.append("tr");
      
      row.append("td").text("wfreq");
      row.append("td").text(result.wfreq);
     
  
  }