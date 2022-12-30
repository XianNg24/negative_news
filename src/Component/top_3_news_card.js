import React from 'react';
import { Box } from '@mui/system';
import json_data from '../Data/data_combined_output.json';
import { Divider } from '@mui/material';
import Link from '@mui/material/Link';




export default function Top3NewsCard() {


    console.log(json_data);


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

    console.log(json_data_1week);
 

    // sort data by Sentiment Score
    var sorted_sentiment_data = json_data_1week.sort((a, b) => {
        if (a.average_score < b.average_score) {
        return -1;
        }
    });

    console.log(sorted_sentiment_data);

    

    return(
        <div>
            <Box className="text-sm font-medium text-gray-400" sx={{ fontSize: '14px',  textAlign: 'center', paddingTop: 1}}
            >
                <h5>Top 3 Negative News This Week</h5>
            </Box>
            <Box  sx={{ fontSize: '16px',  textAlign: 'center' , paddingTop: 1}}>
                <Box className="text-sm font-bold text-gray-900" sx={{ paddingBottom: 1}}>
                    <Link href={sorted_sentiment_data[0].src} sx ={{marginBottom: 1}} target="_blank" rel="noopener noreferrer">{sorted_sentiment_data[0].title}</Link>
                </Box>
                <Box className="text-sm font-bold text-gray-900" sx={{ paddingBottom: 1}}>
                    <Link href={sorted_sentiment_data[1].src} sx ={{marginBottom: 1}} target="_blank" rel="noopener noreferrer">{sorted_sentiment_data[1].title}</Link>
                </Box>

                <Box className="text-sm font-bold text-gray-900" >
                    <Link href={sorted_sentiment_data[2].src} sx ={{marginBottom: 1}} target="_blank" rel="noopener noreferrer">{sorted_sentiment_data[2].title}</Link>
                </Box>
            </Box>
        </div>
        

    )

}