import * as React from 'react';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid'
import { styled } from '@mui/material/styles';



/*

Date, 
Title, 
Source, 
Label, 
Top 3 Entity, 
Sentiment]

*/
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
  color: theme.palette.text.secondary,
}));

function createData(id, date, title, url, source, label, top_3_entity, entity_sentiment, sentiment, sentiment_score, summary) {
  return {
    id, date, title, url, source, label, top_3_entity, entity_sentiment, sentiment, sentiment_score, summary
  };
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
          {row.id}
        </StyledTableCell>
        <StyledTableCell>{row.date}</StyledTableCell>
        <StyledTableCell>{row.title}</StyledTableCell>
        <StyledTableCell>{row.source}</StyledTableCell>
        <StyledTableCell>{row.label}</StyledTableCell>
        <StyledTableCell>{row.top_3_entity}</StyledTableCell>
        <StyledTableCell>{row.sentiment}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container spacing={2} style={{ marginTop : 10, marginBottom : 10, marginLeft : 5, marginRight : 10}}>
            <Grid item xs={6}>
              <Item>URL: {row.url}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Entity Sentiment: {row.entity_sentiment}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Summary: It is a summary</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Sentiment Score: {row.sentiment_score}</Item>
            </Grid>
          </Grid>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    top_3_entity: PropTypes.arrayOf(PropTypes.string).isRequired,
    entity_sentiment: PropTypes.arrayOf(PropTypes.number).isRequired,
    sentiment: PropTypes.string.isRequired,
    sentiment_score: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData(1, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7], 'Negative', -0.9),
  createData(2, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(3, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),
  createData(4, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7], 'Negative', -0.9),
  createData(5, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(6, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),
  createData(7, '5/12/2022', 'Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'www.Big tech adds US$2.5 trillion in market value on robust 2021 gains', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7], 'Negative', -0.9),
  createData(8, '4/12/2022', 'Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion', 'www.Bilt, Startup Turning Rent Into Points, Valued at $1.5 Billion','Bloomberg', 'Investing', ['Apple', 'Samsung', 'IBM'], [0.9, 0.8, 0.7],'Positive', 0.9),
  createData(9, '1/12/2022', 'The World\'s Biggest Source of Clean Energy Is Evaporating Fast', 'www.', 'Reuters', 'Technology', ['Apple', 'Samsung', 'IBM'],[0.9, 0.8, 0.7], 'Negative', -0.7),

];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{overflowX: "hidden",overflowY: "hidden"}}>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Source</StyledTableCell>
            <StyledTableCell>Label</StyledTableCell>
            <StyledTableCell>Top 3 Entities</StyledTableCell>
            <StyledTableCell>Sentiment</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}