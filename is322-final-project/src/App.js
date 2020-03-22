import React from "react";
import Map from './components/map/Map'

import './styles/app.css'

class App extends React.Component {

  // componentDidMount() {
  //   this.callApi()
  // }

  // callApi() {
  //   fetch("https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=50&city=New%20York%20City&offset=0", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "realtor.p.rapidapi.com",
  //     "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
  //   }
  //   })
  // .then(res => res.json())
  // .then((data) => {
  //   console.log(data.listings);
  // })
  // .catch(err => {
  //   console.log(err);
  // });
  // }

  render() {
    return(
      <Map></Map>
    )
  }
}

export default App