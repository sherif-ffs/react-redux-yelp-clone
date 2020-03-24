import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Map from './components/map/Map'
import Grid from './components/grid/Grid'
import ListingDetails from './components/grid/ListingDetails'
import Profile from './components/profile/Profile'
import PageTabs from './components/PageTabs';

import './styles/app.css'

class App extends React.Component {
  state = {
    listings: [],
    viewport: {
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 11,
        width: '100vw',
        height: '90vh',
    },
    token:'pk.eyJ1Ijoic2hlcmlmLWZmcyIsImEiOiJjazgyNGFoM3Mwd29qM2xsbml4eHIyNm9qIn0.k8-uELDQoHBgpiITyyc6pg',
    searchInput: {
      city: '',
      state: '',
      radius: 10,
      allowPets: false,
      minRent: '',
      maxRent: '',
      minBeds: '',
      minBaths: ''
    }
  }
  updateAppViewport = () => {
    let latitudes = 0;
    this.state.listings.forEach(listing => {
      latitudes += listing.lat
    })
    let longitudes = 0;
    this.state.listings.forEach(listing => {
      longitudes += listing.lon
    })
    let newViewport = {
      latitude: latitudes / this.state.listings.length,
      longitude: longitudes / this.state.listings.length,
      zoom: 11,
      width: '100vw',
      height: '90vh',
   }
   this.setState({
     viewport: newViewport
   })
  }

  onSearchSubmit = (payLoad) => {
    if (payLoad.city === '') {
      alert('enter a city name')
    }
    if (payLoad.state === '') {
      alert('enter a state name')
    }
    this.setState({
      searchInput: payLoad
    })
    this.testApi(payLoad)
  }

  componentDidMount() {
    this.callApi()
  }

  testApi(input) {
    let allowPets=input.allowPets
    let minRent= input.minRent !== '' ? input.minRent : 0
    let maxRent= input.maxRent !== '' ? input.maxRent : 999999
    let radius=input.radius
    let minBeds=input.minBeds
    let minBaths=input.minBaths
    let state=input.state
    let city=input.city
    let queryString;

    if (allowPets === false) {
      queryString = `https://realtor.p.rapidapi.com/properties/list-for-rent?no_pets_allowed=true&price_min=${minRent}&price_max=${maxRent}&radius=${radius}&beds_min=${minBeds}&sort=relevance&baths_min=${minBaths}&state_code=${state}&limit=200&city=${city}&offset=0`;
    } else {
      queryString = `https://realtor.p.rapidapi.com/properties/list-for-rent?allows_dogs=true&allows_cats=true&price_min=${minRent}&price_max=${maxRent}&radius=${radius}&beds_min=${minBeds}&sort=relevance&baths_min=${minBaths}&state_code=${state}&limit=200&city=${city}&offset=0`
    }
    fetch(queryString, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "realtor.p.rapidapi.com",
      "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
    }
    })
  .then(res => res.json())
  .then((data) => {
    if (data.listings !== undefined) {
      alert('View Listings')
      this.setState({
        listings: data.listings,
      })
    } 
    
  })
  .catch(err => {
    console.log(err);
  });

  }
  callApi() {
    fetch("https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=200&city=New%20York%20City&offset=0", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "realtor.p.rapidapi.com",
      "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
    }
    })
  .then(res => res.json())
  .then((data) => {
    this.setState({
        listings: data.listings
    })
  })
  .catch(err => {
    console.log(err);
  });
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <PageTabs/>
          <div>
            <Route path="/" exact 
              render={(routeProps) => <Map {...routeProps} state={this.state} listings={this.state.listings} onSearchSubmit={this.onSearchSubmit} updateAppViewport={this.updateAppViewport} />}
            />
            <Route path="/listings" component={Grid} />
            <Route path="/profile" component={Profile} />
            <Route path="/listing/:id" component={ListingDetails} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
  
}

class AppOld extends React.Component {
  state = {
    view: 'page1'
  }
  
  onViewChange(view) {
    this.setState({ view });
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <PageTabs currentView={view}
                  onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  render() {
    const { view } = this.state;

    switch (view) {
      case 'page1':
        return (this.wrapPage(<Map />));
      case 'page2':
        return (this.wrapPage(<Grid />));
      case 'page3':
        return (this.wrapPage(<Profile />));
      default:
        return (this.wrapPage(<h2>Invalid Tab, choose another</h2>));
    }

  }
}

export default App;