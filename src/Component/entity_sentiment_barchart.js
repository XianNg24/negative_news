import React from "react";
import ReactEcharts from "echarts-for-react"; 
import json_data from '../Data/data_combined_output.json';


function EntitySentimentBarchart() {  

  // Set the starting and ending point
  var today = new Date('2022-10-17');
  var startDate = new Date(today.getTime());

  startDate.setDate(startDate.getDate() - 7);

  // filter by date

  var json_data_1week = json_data.filter(a => {
     
      var date = a.releaseDate;

      var [month,day, year] = date.split('/');

      var result = [year, month, day].join('-');

      var result_date = new Date(result);



      //console.log(result_date);
      return (result_date >= startDate && result_date <= today);
  });

  // Extract all entities into a 2D array
  var entities_array = json_data_1week.map((c)=> {

      return c.entity;
  });

  // Flatten the 2D array and filter entities containing 'Bloomberg' and 'Reuters'
  const entities_array_filtered = [].concat(...entities_array).filter(word => word.toString().includes("Bloomberg") === false && word.toString().includes("Bloomberg") ===false);

 
  // Create a freq list
  let freq_result = entities_array_filtered.reduce((r, c) => (r[c] = (r[c] || 0) + 1, r), {});

  // Make array from the frequency object to de-duplicate
  var uniques = [];
  for(var value in freq_result) {
      uniques.push(value);
  }

  // Sort the uniques array in descending order by frequency
  function compareFrequency(a, b) {
      return freq_result[b] - freq_result[a];
  }

  var sorted_freq_array = uniques.sort(compareFrequency);

  // obj stores +ve, -ve and neutral arrays. index 
  var result = {
    positive: [0,0,0], 
    neutral:  [0,0,0], 
    negative:  [0,0,0]
  }


  json_data_1week.forEach(row=>{


    for (var i = 0; i < 3; i++){

      var id = row.entity_sentiment_key.indexOf(sorted_freq_array[i]);
      if (id !== -1){
        var score = parseFloat(row.entity_sentiment_value[id]);
        

        console.log(score)
  
        var sentiment;

        if (score < -0.33){
          sentiment = 'negative';
        }else if(score > 0.33){
          sentiment = 'positive';
        }else{
          sentiment = 'neutral';
        }


        result[sentiment][i]++;


      }
    }

  });

  console.log(result);
    
    const option = {
      title: {
        text: 'Entity Sentiment',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {
        top: '8%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: sorted_freq_array.slice(0,3).reverse()
      },
      series: [
        {
          name: 'Positive',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: result['positive'].reverse()
        },
        {
          name: 'Neutral',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: result['neutral'].reverse()
        },
        {
          name: 'Negative',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: result['negative'].reverse()
        },
        
      ]
    };
      return <ReactEcharts option={option} />;
} 
export default EntitySentimentBarchart;