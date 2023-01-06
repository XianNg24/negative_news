import * as React from 'react';
import "./table.css";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";
import Datepicker from "react-tailwindcss-datepicker"; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid'
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Bloomberg_logo from "../Bloomberg_logo.png";
import Reuters_logo from "../Reuters_logo.png";







import json_data from '../Data/data_combined_output.json';

//var data = JSON.parse(json_data)



/*

Date, 
Title, 
Source, 
Label, 
Top 3 Entity, 
Sentiment]

*/

// Styles for Table Cell and Row
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
  height: 80

}));



Row.propTypes = {
  row: PropTypes.shape({
    
    newsCategory: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    entity: PropTypes.arrayOf(PropTypes.string).isRequired,
    average_score: PropTypes.PropTypes.number.isRequired,
    sentiment: PropTypes.string.isRequired,
    entity_sentiment_key: PropTypes.arrayOf(PropTypes.string).isRequired,
    entity_sentiment_value: PropTypes.arrayOf(PropTypes.number).isRequired,
    similar_news: PropTypes.arrayOf(PropTypes.number).isRequired,
    summary: PropTypes.string.isRequired,
    classification_result: PropTypes.string.isRequired
  }).isRequired,
};
/*
const rows = [
  createData(1, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM', 'a', 'b', 'c'], [0.9, 0.8, 0.7, 1,2,3], 'Negative', -0.9),
  createData(2, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(3, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),
  createData(4, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7], 'Negative', -0.9),
  createData(5, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(6, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),
  createData(7, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7], 'Negative', -0.9),
  createData(8, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(9, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),

];
*/


function SentimentTable(props){
  const { entities, scores } = props;

  return(
    <React.Fragment>
      <TableContainer sx={{maxHeight:200, textAlign: 'center'}}>

      
        <Table aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell sx={{paddingBottom: 1, paddingTop: 1}}>Entities with Sentiment Score:</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          
          {entities.map((entity, index) => (

            <TableRow>
               <TableCell sx={{paddingBottom: 1, paddingTop: 1}}>{entity + ": " + (scores[index] > 0 ? ("+" + (scores[index]*100).toFixed(1)) : (scores[index]* 100).toFixed(1))}</TableCell>
              
              
              
              
              
            </TableRow>

            
          ))}

          </TableBody>
        </Table>
      </TableContainer>
      
    </React.Fragment>

  )
  
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow>
      {/* </TableRow><TableRow sx={{ '& > *': { borderBottom: 'unset' } }}> */}
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Box className="text-sm font-medium text-gray-600">
            {row.index}
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          <Box className="text-sm font-medium text-gray-600">
            {row.releaseDate}
          </Box>
        </StyledTableCell>
        <StyledTableCell width="30%">
          <Link className="text-sm font-medium text-gray-600" href={row.src} target="_blank" rel="noopener noreferrer">
          {row.title}
          </Link>
        </StyledTableCell>
        <StyledTableCell>
        {
        
          (() => {
              if(row.source==='Bloomberg') {
                      return (
                        <Box sx={{textsize: 10}}>
                          <Link href="https://www.bnnbloomberg.ca/" target="_blank" rel="noopener noreferrer">
                            <img class = "max-w-4xl mx-auto" src={Bloomberg_logo} width='100' />
                          </Link>
                        </Box>
                      )
                  } else if (row.source==='Reuters') {
                      return (

                        <Box sx={{textsize: 10}}>
                          <Link href="https://www.reuters.com/" target="_blank" rel="noopener noreferrer">
                            <img class = "max-w-4xl mx-auto" src={Reuters_logo} width='100' />
                          </Link>
                        </Box>
                      
                      )
                  }else{
                    return (
                      <Box className="text-sm font-medium text-gray-600" sx={{textsize: 10}}>
                     
                      <h5>{row.source}</h5>
                      </Box>
                    )
                  }
          })()  
      }  
        </StyledTableCell>
        <StyledTableCell>
          <Box className="text-sm font-medium text-gray-600">
            {row.source === "Bloomberg"? row.newsCategory  : (row.newsCategory === row.classification_result? row.newsCategory : row.newsCategory + ', ' +  row.classification_result)}
          </Box>
        </StyledTableCell>
        <StyledTableCell width="30%">
          <Box className="text-sm font-medium text-gray-600">
            { row.entity.map((entity, index, array) => ((entity && index < 3) ? (((index === 0) ? '' : ", ") + entity) : ""))
            /*(row.entity[1] ? (", " + row.entity[1]) : "") + (row.entity[2] ? (", " + row.entity[2]) : "")*/
            }
          </Box>

        </StyledTableCell>



        <StyledTableCell>
          
          {
                (() => {
                    if(row.sentiment==='positive') {
                            return (
                              <Box className="text-sm font-medium text-gray-600" sx={{textsize: 10, color:  'green' }}>
                                <InsertEmoticonIcon/>
                                <h5>positive</h5>
                              </Box>
                            )
                        } else if (row.sentiment==='negative') {
                            return (

                              <Box className="text-sm font-medium text-gray-600" sx={{textsize: 10, color:  'red' }}>
                                <SentimentVeryDissatisfiedIcon/>
                                <h5>negative</h5>
                              </Box>
                            
                            )
                        } else {
                            return (
                              <Box className="text-sm font-medium text-gray-600" sx={{textsize: 10 }}>
                                <SentimentNeutralIcon />
                                <h5>neutral</h5>
                              </Box>
                            )
                        }
                })()  
            }  
        

        </StyledTableCell>
      </StyledTableRow>
      {/* drawer per row*/}
      <StyledTableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container spacing={2} style={{ marginTop : 10, marginBottom : 10, marginLeft : 0, marginRight : 10}}>
            <Grid item container xs={9} spacing={2}>
              <Grid item xs ={12}>
                <Item elevation={3} sx={{ height: 120}}>
                  <Box className="text-sm font-medium text-gray-600" sx={{fontSize: '15px', textAlign:"center", paddingTop: 2}} >
                      
                      {'Summary: \n'} 
                      <Box>
                        {row.summary}
                      </Box>
                      
                    </Box>
                </Item> 
              </Grid>


              <Grid item xs={8}>
                <Item elevation={3}>
                    
                  {
                  (() => {
                      if(row.similar_news.length === 0) {
                              return (
                                <Box className="text-sm font-medium text-gray-600" sx={{fontSize: '15px', textAlign:"center", paddingTop: 2.5}} >
                                Similar News: N.A.
                                </Box> 
                              )
                          } else {
                              return (

                                <Box className="text-sm font-medium text-gray-600" sx={{fontSize: '15px', textAlign:"center", p: 0.5}} > 
                                
                                {'Similar News: '}

                                {row.similar_news.map((id) => (
                                  
                                  <Box className="text-sm font-medium text-gray-600">
                                    <Link href={json_data[id].src} target="_blank" rel="noopener noreferrer">
                                      {json_data[id].title}
                                    </Link>
                                  </Box>

                                ))}


                                </Box>  
                              )
                          }
                      })()  
                    }     
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item elevation={3} >
                    <Box className="text-sm font-medium text-gray-600" sx={{fontSize: '15px', textAlign:"center", paddingTop: 2.5}}  > 
                      {'Sentiment Score: ' + (row.average_score > 0 ? ("+" + (row.average_score*100).toFixed(1)) : (row.average_score* 100).toFixed(1))} 
                    </Box>
                  </Item> 
                </Grid>

            </Grid>



            <Grid item xs= {3}>
              <Item elevation={3} sx={{ height: 217}}>
                <Box  sx={{fontSize: '15px', textAlign:"center"}}  > 
                  <SentimentTable key={row.title} entities = {row.entity_sentiment_key} scores = {row.entity_sentiment_value}/>
                </Box> 
              </Item>
            </Grid>
              
          </Grid>
            
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}




export default function EnhancedTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = React.useState(json_data);
  const [newRows, setNewRows] = React.useState(json_data);
  const [searched, setSearched] = React.useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = newRows.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const formatDate = (oldDate) => {
      var date = oldDate;

      var [month,day, year] = date.split('/');

      var result = [year, month, day].join('-');

      var result_date = new Date(result);

      return result_date
  };


  const [value, setValue] = React.useState({ 
    startDate: new Date('2022-10-6'), 
    endDate: new Date('2022-10-17')
  }); 
    
  const handleValueChange = (newValue) => {
    setValue(newValue); 
    const filteredRows = json_data.filter((row) => {
      var newDate = formatDate(row.releaseDate)
      return newDate >= new Date(newValue.startDate) && newDate <= new Date(newValue.endDate) ? row : null
    });
    setRows(filteredRows);
    setNewRows(filteredRows)
  } 


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - json_data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div style = {{
          display: "flex"
        }}>
          <div style={{
              padding: 1,
              width: "25%",
              fontFamily: 'Helvetica',
              borderWidth: "1px",
              borderRadius: "5px",
            }}>
            <Datepicker 
              primaryColor="green"
              value={value} 
              onChange={handleValueChange}
              showShortcuts={true} 
            />
          </div>
          <div style={{
              padding: 1,
              width: "75%",
            }}>
          <SearchBar
            sx={{ width: '50%'}}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Search Title"
          />
          </div>
        </div>
        <TableContainer>
            <Table aria-label="collapsible table" style={{overflowX: "hidden",overflowY: "hidden"}}>
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Source</StyledTableCell>
                <StyledTableCell>Labels</StyledTableCell>
                <StyledTableCell>Top 3 Entities</StyledTableCell>
                <StyledTableCell>Sentiment</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <Row key={row.title} row={row} />
                ))}
                  
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={json_data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </Box>
  );
}


