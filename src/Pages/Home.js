import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import EnhancedTable from '../Component/table';
import Top3NewsCard from '../Component/top_3_news_card';
import NoofNewsCard from '../Component/no_of_news_card';
import Top3EntitiesCard from '../Component/top_3_entities';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import React, { Component }  from 'react';


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
  height: 150
}));


function Home() {
  const classes = useStyles();


  return (
    <Grid container className={classes.root}>
      <Grid item sm={1} /> {/* Adds left margin */}
      <Grid container item sm={10} direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            AI Negative News Monitoring System
          </Typography>
        </Grid>
        
        <Grid container item spacing= {2} minheight={160}>

          <Grid item sm={3}>
            <Item elevation={5} >
              <NoofNewsCard />
            </Item>
            
            
          </Grid>
          <Grid item sm={3}>
            <Item elevation={5} >
              <Top3EntitiesCard />
            </Item>
          </Grid>
          <Grid item sm={6}>
            <Item elevation={5} >
              <Top3NewsCard />
            
            </Item>
          </Grid>

        </Grid>


        <Grid item>
          <EnhancedTable />
        </Grid>
        
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}

    </Grid>
  );
}

export default Home;



/* <Grid container item spacing= {2}>

          <Grid container item spacing={2}>
              <Grid item sm = {3}>
                <h2>Test</h2>
              </Grid>

              <Grid item sm = {3}><h2>Test</h2></Grid>
            
          </Grid> */