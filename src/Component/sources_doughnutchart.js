import React from "react";
import ReactEcharts from "echarts-for-react"; 
import json_data from '../Data/data_combined_output.json';


function SourcesDoughnutchart() {  

  var number_of_bloomberg = 0;
  var number_of_reuters = 0;



  json_data.forEach(function (c) {
      if (c.source === 'Bloomberg'){
        number_of_bloomberg++;
      }else if(c.source === 'Reuters'){
        number_of_reuters++;
      }

    });


    
  const option = { 
      title: {
        text: 'Sources',
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
            { value: number_of_reuters, name: 'Reuters' },
            { value: number_of_bloomberg, name: 'Bloomberg' },
          
          ]
        }
      ]
    };
    return <ReactEcharts option={option} />;
} 
export default SourcesDoughnutchart;