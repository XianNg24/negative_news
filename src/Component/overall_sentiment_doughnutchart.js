import React from "react";
import ReactEcharts from "echarts-for-react"; 
import json_data from '../Data/data_combined_output.json';

function OverallSentimentDoughnutchart() {  


  var number_of_positive = 0;
  var number_of_neutral = 0;
  var number_of_negative = 0;



  json_data.forEach(function (c) {
      if (c.sentiment === 'positive'){
        number_of_positive++;
      }else if(c.sentiment === 'neutral'){
        number_of_neutral++;
      }else{
        number_of_negative++;
      }

    });
  

    const option = { 
        title: {
          text: 'Overall Sentiment',
           left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
            top: '8%',

        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: number_of_positive, name: 'Positive' },
              { value: number_of_neutral, name: 'Neutral' },
              { value: number_of_negative, name: 'Negative' }
              
            ]
          }
        ]
      };
      return <ReactEcharts option={option} />;
} 
export default OverallSentimentDoughnutchart;