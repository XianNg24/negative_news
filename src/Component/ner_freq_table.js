import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import json_data from '../Data/data_combined_output.json';




export default function NerFreqTable() {

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

  var result = sorted_freq_array.map((entity)=>{

      return {'entity': entity, 'freq': freq_result[entity]}
  }, {});

  console.log(result);


  return (
    <TableContainer sx={{maxHeight: 280, textAlign: 'center'}}>

    
      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', paddingBottom: 1, paddingTop: 1, paddingLeft: 2, textAlign:"center"}}>Entities</TableCell>
            <TableCell sx={{fontWeight: 'bold', paddingBottom: 1, paddingTop: 1, paddingRight: 8, textAlign:"center"}}>Frequency</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
        
        {result.map(row => (

          <TableRow key={'entity' + row.entity}>
             <TableCell sx={{fontWeight: 'medium', paddingBottom: 1, paddingTop: 1, paddingLeft: 2, textAlign:"center"}}>{row.entity}</TableCell>
             <TableCell sx={{fontWeight: 'medium', paddingBottom: 1, paddingTop: 1, paddingRight: 8, textAlign:"center"}}>{row.freq}</TableCell>
            

          </TableRow>

          
        ))}

        </TableBody>
      </Table>
    </TableContainer>
    
  );
}

    
    
