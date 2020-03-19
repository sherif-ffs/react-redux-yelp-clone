import React from 'react';


class App extends React.Component {

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = () => {
    fetch("https://api-football-v1.p.rapidapi.com/v2/leagues/league/2/2019", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
      }
      })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  

  render() {
    return (
      <div className="App">
        <h1>hey</h1>
      </div>
    );
  }
  
}

export default App;
