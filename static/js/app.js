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
    // console.log('Selected Value:', selectedValue);
    //update the  charts
      barchart(selectedValue);
      bubblechart(selectedValue);
      mata(selectedValue);

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