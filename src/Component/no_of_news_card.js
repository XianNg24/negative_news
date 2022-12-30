import React from 'react';
import { Box } from '@mui/system';
import json_data from '../Data/data_combined_output.json';


export default function NoofNewsCard() {


    var number_of_news = 0
    var today = '10/17/2022'


    json_data.forEach(function (c) {
        if (today === c.releaseDate){
            number_of_news++;
        }

      });
    

    return(
        <div>
            <Box className="text-sm font-medium text-gray-400" sx={{fontSize: '14px', textAlign:"center", paddingTop: 1}}  > 
                <h5>No. of News Today</h5>
            </Box>
            <Box className="text-sm font-bold text-gray-900"  sx={{fontSize: '40px', textAlign:"center", paddingTop: 5}} >
               
                <h3>{number_of_news}</h3>
            </Box>
        </div>
        

    )

}


