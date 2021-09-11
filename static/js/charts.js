function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("static/js/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

/* // 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleFiltered=samplesArray.filter(sampleBellyButton => sampleBellyButton.id==sample);
    //  5. Create a variable that holds the first sample in the array.
    var sampleData=sampleFiltered[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuId=[];
    var otuLabels=[];
    var sampleValue=[];
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sampleValue =  sampleData.sample_values.slice(0,10);// sample values
    
    var otuId = sampleData.otu_ids.slice(0,10);//sample otu_ids
    
    sampleValue.sort(function(b,a){
      return b-a;

    });

    otuId.reverse();

    //console.log(otuId)
    //console.log(sampleValue)

    otuId.forEach(function(id){
      otuLabels.push("OTU " + id.toString() )
    })
    //console.log(otuLabels); 
      
    //8. Create the trace for the bar chart.
    
    
    var barData = [{
      type:'bar',
      x:sampleValue,
      y:otuLabels,
      orientation:'h'
    }
         ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title:"Top 10 Bacteria Cultures Found"
      //ylabel:yticks 
         };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData,barLayout)

  });
} */

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("static/js/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    var metadataArray =data.metadata
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleFiltered=samplesArray.filter(sampleBellyButton => sampleBellyButton.id==sample);
    
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataFiltered=metadataArray.filter(sampleBellyButton => sampleBellyButton.id==sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var sampleData=sampleFiltered[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataData=metadataFiltered[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    // holds all otu ids for number selected in dropdown
    var otuId=[];
    //holds all otu labels for number selected in dropdown
    var otuLabels=sampleData.otu_labels;
    
    //holds all otu bacteria countsfor number selected in dropdown
    var sampleValue=[];
    // holds concactenated "OTU" + otuid 
    var otuName=[];
    //holds counts for top 10 most frequent otuId's  
    var otuCount=[];
    //holds ids for top 10 most frequent otuId's  
    var otu10=[];
    //holds washfrequency
    var washFreq=metadataData.wfreq;
    console.log(washFreq)

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var otuCount =  sampleData.sample_values.slice(0,10);// sample values
    sampleValue=sampleData.sample_values;
    
    var otuLabels10=sampleData.otu_labels.slice(0,10);
    otuLabels10.reverse();
    console.log(otuLabels10);

    otuId =sampleData.otu_ids;
    var otu10 = sampleData.otu_ids.slice(0,10);//sample otu_ids
    
    otuCount.sort(function(b,a){
      return b-a;

    });
    //console.log(otuCount)
    otu10.reverse();
    //console.log(otu10)
    //console.log(otuId)
    //console.log(sampleValue)

    otu10.forEach(function(id){
      otuName.push("OTU " + id.toString() )
    })
    console.log(otu10[1]); 

      
    //8. Create the trace for the bar chart.
    
    
    var barData = [{
      type:'bar',
      x:otuCount,
      y:otuName,
      orientation:'h',
      //hoverinfo:otuLabels10
      text:otuLabels10
    }
         ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title:"Top 10 Bacteria Cultures Found",
      hovermode:"closest",
      hovertext:otuLabels10
      //ylabel:yticks 
         };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData,barLayout)

    
    console.log(otuId)
    console.log(sampleValue)
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x:otuId,
      y:sampleValue,
      text:otuLabels,
      mode:'markers',
      marker:{
        size:sampleValue,
        color:otuId,
        colorscale: 'Jet'
      }
   
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title:"Bacteria Cultures Per Sample",
      hovermode:"closest",
      hovertext:otuLabels
      //height: 600,
      //width: 800
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData,bubbleLayout)
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        value:washFreq,
        title:{text:"Belly Button Washing Frequency<br><span style='font-size:1.0em;color:black'>Scrubs per Week</span>"
              },
        //subtitle:"Scrubs per Week",
        type:"indicator",
        mode:"gauge+number",
        gauge:{
          axis:{range:[0,10]},
          steps:[
            {range:[0,2],color:"red" },
            {range:[2,4],color:"orange"},
            {range:[4,6],color:"yellow"},
            {range:[6,8],color:"lightgreen"},
            {range:[8,10],color:"green"}
          ],
          bar:{color:"black"}
          
          }
          
          
        }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } } ;
     
    

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
}
