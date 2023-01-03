import React, { Component }  from 'react';


function About() {
    return (
      <div class="blockquote text-justify" style={{margin: "30px", fontSize: "1.5vw", padding: "10px"}}>
      <h1> This is a negative news monitoring tool that uses NLP models such as <b>named-entity recognition, sentiment analysis, topic modelling,
        document similarity, and text summarization</b>. 
        The news displayed are based on real-world scrapped data from different financial news sources such as Bloomberg, Reuters, and The Wall Street Journal.
        </h1>
      </div>
    );
  }

export default About;