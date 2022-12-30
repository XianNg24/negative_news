import React, { Component }  from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import OverallSentimentDoughnutchart from '../Component/overall_sentiment_doughnutchart';
import SourcesDoughnutchart from '../Component/sources_doughnutchart';
import EntitySentimentBarchart from '../Component/entity_sentiment_barchart';
import SentimentTrendCard from '../Component/sentiment_trend_card';
import DailyScoreBarchart from '../Component/daily_score_barchart';
import NerFreqTable from '../Component/ner_freq_table';



const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    paddingBottom: 0,
    // If overflow is not hidden, then a horizontal scroll bar appears
    // Read more: https://material-ui.com/components/grid/#negative-margin
    overflowX: "hidden",
    overflowY: "hidden",
  },
  title: {
    marginTop: 20,
  },
});


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 5,
  margin: 5,
  color: 'black',
  height: 300
}));

function Content() {
  const classes = useStyles();

    return (
      <Grid container className={classes.root}>
      <Grid item xs={1} /> {/* Adds left margin */}
      <Grid container item xs={10} direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            Data Analytics
          </Typography>
        </Grid>
        
        <Grid container item spacing= {2} >

          <Grid item xs={3}>
            <Item elevation={5} >
              <OverallSentimentDoughnutchart />
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item elevation={5} >
              <SourcesDoughnutchart />
            </Item>
          </Grid>
          
          <Grid item xs={6}>
            <Item elevation={5} >
              <EntitySentimentBarchart />
            </Item>
          </Grid>

        </Grid>

        <Grid item >
          <Item elevation={5} sx={{height: 450}} >
            <SentimentTrendCard />
          </Item>

        </Grid>

        <Grid container item spacing= {2}>

          <Grid item xs={8}>
            <Item elevation={5} >
              <DailyScoreBarchart />
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item elevation={5}>
              <NerFreqTable />
            </Item>
          </Grid>
          
          

        </Grid>


        
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}

    </Grid>
    );
  }

export default Content;