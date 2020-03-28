import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import axios from 'axios';
import 'axios-progress-bar/dist/nprogress.css'

import Map from './components/map/Map'
import Grid from './components/grid/Grid'
import RestaurauntDetails from './components/restaurauntDetails/RestaurauntDetails'
import Profile from './components/profile/Profile'
import PageTabs from './components/PageTabs';

import './styles/app.css'

class App extends React.Component {
  state = {
    viewport: {
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 12,
        width: '100vw',
        height: '90vh',
    },
    token:'pk.eyJ1Ijoic2hlcmlmLWZmcyIsImEiOiJjazgyNGFoM3Mwd29qM2xsbml4eHIyNm9qIn0.k8-uELDQoHBgpiITyyc6pg',
    restauraunts: [],
    loading: false
  }
  onSearchSubmit = (payLoad) => {
    if (payLoad.city === '') {
      alert('enter a city name')
    }
    this.setState({
      searchInput: payLoad,
      loading: true
    })
    let offset=0
    for (let i=0; i<2; i++) {
      this.callYelpApi(offset, payLoad)
      offset+=50
    }
  }

  restaurauntList = []
  callYelpApi(offset, payLoad) {
    let city
    if (payLoad !== undefined) {
      city = payLoad.city
    } else {
      city = "New York City"
    }
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${city}&term=food&limit=50&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      },
        params: {
        categories: 'food',
      }
      })
      .then((res) => {
      res.data.businesses.forEach(res => {
        this.restaurauntList.push(res)
      })
      let newViewport = {
        latitude: res.data.region.center.latitude,
        longitude: res.data.region.center.longitude,
        zoom: 12,
        width: '100vw',
        height: '90vh',
      }
      this.setState({
        restauraunts: this.restaurauntList,
        loading: false,
        viewport: newViewport
      })
      })
      .catch((err) => {
      console.log (err)
    })
    this.restaurauntList = []
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    let offset=0
    for (let i=0; i<7; i++) {
      this.callYelpApi(offset)
      offset+=50
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <PageTabs/>
          <div>
            <Route path="/" exact 
              render={(routeProps) => <Map {...routeProps} state={this.state} listings={this.state.listings} onSearchSubmit={this.onSearchSubmit} loading={this.state.loading} restauraunts={this.state.restauraunts} />}
            />
            <Route path="/restauraunts" component={Grid} />
            <Route path="/profile" component={Profile} />
            <Route path="/restauraunt/:id" component={RestaurauntDetails} />
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