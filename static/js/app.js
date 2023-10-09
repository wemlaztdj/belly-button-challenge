var url ='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(function(data) {
  
    chart= data.samples
    thematadata= data.metadata

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

    //update the  charts
      barchart(selectedValue);
      bubblechart(selectedValue);
      mata(selectedValue);
      Gauge(selectedValue);

  }

  function searchById(theid) {

    return chart.filter(item=> item.id===theid)[0]
  }
  function searchmataById(theid) {

    return thematadata.filter(item=> item.id==theid)[0]
  }

  function barchart(selectedValue){
    var result = searchById(selectedValue); 
    
    
    
    console.log(result);


    var ids = result.otu_ids.slice(0,10)
    var values = result.sample_values.slice(0,10)
    var lables= result.otu_labels.slice(0,10)


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
        orientation: 'h'  
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

    mataresult = searchmataById(selectedValue);
    var div = d3.select("#sample-metadata");
    div.selectAll("table").remove();
    var tbody = div.append("table");
    

    var row = tbody.append("tr");
    
   
      row.append("td").text("id: "+mataresult.id);

     
    row = tbody.append("tr");

      row.append("td").text("ethnicity: "+mataresult.ethnicity);
 
     
    row = tbody.append("tr");
      
      row.append("td").text("gender: "+ mataresult.gender);
      
    row = tbody.append("tr");
      
      row.append("td").text("age: "+ mataresult.age);

     
    row = tbody.append("tr");
      
      row.append("td").text("location: "+ mataresult.location);

     
    row = tbody.append("tr");
      
      row.append("td").text("bbtype: "+ mataresult.bbtype);

     
    row = tbody.append("tr");
      
      row.append("td").text("wfreq: "+ mataresult.wfreq);

     
  
  }

function Gauge(selectedValue){
  Gaugeresult = searchmataById(selectedValue);

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: Gaugeresult.wfreq,
      title: { text: "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per Week</span><br>" },

      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9] },
        // bar: { color: "red" },
        steps: [
          { range: [0, 1], color: "rgb(255, 255, 255)" },
          { range: [1, 2], color: "rgb(204, 255, 204)" },
          { range: [2, 3], color: "rgb(179, 255, 179)" },
          { range: [3, 4], color: "rgb(153, 255, 153)" },
          { range: [4, 5], color: "rgb(128, 255, 128)" },
          { range: [5, 6], color: "rgb(102, 255, 102)" },
          { range: [6, 7], color: "rgb(77, 255, 77)" },
          { range: [7, 8], color: "rgb(51, 255, 51)" },
          { range: [8, 9], color: "rgb(0, 255, 0)" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: Gaugeresult.wfreq
        }
      }
    }
  ];

Plotly.newPlot('gauge', data);

}