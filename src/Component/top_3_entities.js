import React from 'react';
import { Box } from '@mui/system';
import json_data from '../Data/data_combined_output.json';



export default function Top3EntitiesCard() {


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

        console.log(result_date)
        console.log(startDate);
        console.log(today);
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



    return(
        <div>
            <Box className="text-sm font-medium text-gray-400" sx={{ fontSize: '14px',  textAlign: 'center' , paddingTop: 1}}>
                <h5>Top 3 Relevant Entities This Week</h5>
            </Box>
            <Box className="text-sm font-bold text-gray-900" sx={{ fontSize: '20px',  textAlign: 'center', paddingTop: 1}}>
                <h3 style={{padding: 3}}>{sorted_freq_array[0]}</h3>
                <h3 style={{padding: 3}}>{sorted_freq_array[1]}</h3>
                <h3 style={{padding: 3}}>{sorted_freq_array[2]}</h3>
            </Box>
        </div>
        

    )

}