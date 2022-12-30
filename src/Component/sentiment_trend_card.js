import React from "react";
import ReactEcharts from "echarts-for-react"; 
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import json_data from '../Data/data_combined_output.json';





function SentimentTrendCard() {  

    // Count +ve, -ve and neutral news
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
    var groupBySentiment = json_data_1week.reduce((result, row) => {

        (result[row.releaseDate] = result[row.releaseDate] || []).push(row);

        return result;

    }, {});


    const reversedKeys = Object.keys(groupBySentiment).reverse();
 
    
    var positive_list = [];
    var negative_list = [];
    var neutral_list = [];

    reversedKeys.forEach(key=>{

        
        var sentiment = groupBySentiment[key].reduce((result, row) =>{
            result[row.sentiment] = (result[row.sentiment] || 0) + 1
            return result;
        }, {})

        console.log(key);
        console.log(sentiment);

        if (sentiment['positive']){
            positive_list.push(sentiment['positive']);
        }else{
            positive_list.push(0);
        }


        if (sentiment['negative']){
            negative_list.push(sentiment['negative']);
        }else{
            negative_list.push(0);
        }


        if (sentiment['neutral']){
            neutral_list.push(sentiment['neutral']);
        }else{
            neutral_list.push(0);
        }
 

    });

    console.log(positive_list);
    console.log(neutral_list);
    console.log(negative_list);

   



    const option = {
    
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Positive', 'Neutral', 'Negative'],
        top: '8%'
    },
    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true
    },
    toolbox: {
        feature: {
        saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: reversedKeys
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        name: 'Positive',
        type: 'line',
        data: positive_list
        },
        {
        name: 'Neutral',
        type: 'line',
        data: neutral_list
        },
        {
        name: 'Negative',
        type: 'line',
        data: negative_list
        },
        
    ]
    };
        return (
            <div>
                <Grid container>
                    <Grid item xs={3}>
                        <Box className="text-lg font-bold text-gray-600" sx={{paddingLeft: 2, paddingTop: 2}}>
                            <h2>Sentiment Trend</h2>
                    
                        </Box>
                        
                    </Grid>
                    <Grid item xs={3}></Grid>


                    <Grid item xs={1.5}>
                        <Box className="text-lg font-bold text-gray-600" sx={{paddingTop: 2}}>
                            <h1>{number_of_negative+ number_of_neutral+number_of_positive}</h1>
                        </Box>
                        <Box>
                            Total
                        </Box>
                    </Grid>

                    <Grid item xs={1.5}>
                        <Box className="text-lg font-bold text-gray-600" sx={{paddingTop: 2,  color: 'green'}}>
                            <h1>{number_of_positive}</h1>
                        </Box>
                        <Box>
                            Positive
                        </Box>
                    </Grid>

                    <Grid item xs={1.5}>
                        <Box className="text-lg font-bold text-gray-600" sx={{paddingTop: 2,  color: 'blue'}}>
                            <h1>{number_of_neutral}</h1>
                        </Box>
                        <Box>
                            Neutral
                        </Box>
                    </Grid>

                    <Grid item xs={1.5}>
                        <Box className="text-lg font-bold text-gray-600" sx={{paddingTop: 2, color: 'red'}}>
                            <h1>{number_of_negative}</h1>
                        </Box>
                        <Box>
                            Negative
                        </Box>
                    </Grid>
                    
                </Grid>
                <Box>
                    <ReactEcharts option={option} />
                </Box>
            </div>
        );
        
        
        
        
} 
export default SentimentTrendCard;