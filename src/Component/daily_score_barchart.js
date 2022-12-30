import React from "react";
import ReactEcharts from "echarts-for-react"; 
import json_data from '../Data/data_combined_output.json';

function DailyScoreBarchart() {  

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

    // Group by each day
    var groupByScore = json_data_1week.reduce((result, row) => {

      (result[row.releaseDate] = result[row.releaseDate] || []).push(row.average_score);

      return result;

    }, {});

    console.log(groupByScore);

    var score_list = [];

    const reversedKeys = Object.keys(groupByScore).reverse();

    reversedKeys.forEach(key=>{
        

      var average = groupByScore[key].reduce((a, b) => a + b, 0) / groupByScore[key].length;

      score_list.push(average)


    });


    
    const option = {
      title: {
        text: 'Daily Score',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: reversedKeys
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: score_list,
          type: 'bar'
        }
      ]
    };
      return <ReactEcharts option={option} />;
} 
export default DailyScoreBarchart;