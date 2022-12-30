
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Topbar from "./Scenes/global/Topbar";
import Home from "./Pages/Home";
import Content from "./Pages/Content";
import About from "./Pages/About";
import "./App.css";
import muiTheme from "./theme/muiTheme";
import React from 'react';



function App() {
  return (
    <>
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <Topbar />
          <Switch>
            <Route path="/negative_news" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/content" component={Content} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </>
  )

  /*
  return (
    <>
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/companies" component={Companies} />
            <Route path="/investments" component={Investments} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </>
  );
  */
}

export default App;
