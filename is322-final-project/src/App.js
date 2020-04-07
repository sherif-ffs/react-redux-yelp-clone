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

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { savedRestauraunts: state.savedRestauraunts };
  };

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
    loading: false,
    searchInput: 'New York City',
    width: window.innerWidth,
    isMobile: false,
    savedRestauraunts: []
  }

  saveNewRestauraunt = restauraunt => {
    // console.log('this.state.savedRestauraunts.includes(restauraunt): ', this.state.savedRestauraunts.includes(restauraunt))
    if (this.state.savedRestauraunts.includes(restauraunt) === false) {
      this.setState({
        savedRestauraunts: [restauraunt, ...this.state.savedRestauraunts]
      })
    } else {
        let newState = this.state.savedRestauraunts.filter(function(e) { return e !== restauraunt })
        // console.log('newState: ', newState)
          this.setState({
            savedRestauraunts: newState
          })
    }
 }

  onSearchSubmit = (payLoad) => {
    if (payLoad.city === '') {
      alert('enter a city name')
    }
    this.setState({
      searchInput: payLoad.city,
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

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }  
  handleWindowSizeChange = () => {
    this.setState({ 
      width: window.innerWidth,
      isMobile: window.innerWidth <= 600 ? true : false
    });
  };

  componentDidMount() {
    this.setState({
      loading: true,
      isMobile: window.innerWidth <= 600 ? true : false
    })
    let offset=0
    for (let i=0; i<7; i++) {
      this.callYelpApi(offset)
      offset+=50
    }
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (!isMobile) {
      return (
        <div>
          <BrowserRouter>
            <PageTabs isMobile={isMobile} />
            <div>
              <Route path="/" exact 
              render={(routeProps) => <Map {...routeProps} state={this.state} onSearchSubmit={this.onSearchSubmit} loading={this.state.loading} restauraunts={this.state.restauraunts} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} />}
              />
              <Route path="/restauraunts"
                render={(routeProps) => <Grid {...routeProps} state={this.state} loading={this.state.loading} restauraunts={this.state.restauraunts} searchInput={this.state.searchInput} onSearchSubmit={this.onSearchSubmit} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} />}
               />
               <Route path="/profile"
                render={(routeProps) => <Profile {...routeProps} savedRestauraunts={this.props.savedRestauraunts} />}
               />
              {/* <Route path="/profile" component={Profile} /> */}
              {/* <Route path="/restauraunt/:id" component={RestaurauntDetails} isMobile={this.state.isMobile} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} /> */}
              <Route path="/restauraunt/:id" 
              render={(routeProps) => <RestaurauntDetails {...routeProps} isMobile={this.state.isMobile} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} />}
              />
            </div>
          </BrowserRouter>
        </div>
      )
    } else {
      return (
        <div>
          <BrowserRouter>
            <PageTabs isMobile={isMobile} />
            <div>
              {/* <Route path="/" exact 
              render={(routeProps) => <Map {...routeProps} state={this.state} onSearchSubmit={this.onSearchSubmit} loading={this.state.loading} restauraunts={this.state.restauraunts} />}
              /> */}
              <Route path="/" exact
                render={(routeProps) => <Grid {...routeProps} state={this.state} loading={this.state.loading} restauraunts={this.state.restauraunts} searchInput={this.state.searchInput} onSearchSubmit={this.onSearchSubmit} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} />}
               />
              <Route path="/profile" component={Profile} />
              <Route path="/restauraunt/:id" 
              render={(routeProps) => <RestaurauntDetails {...routeProps} isMobile={this.state.isMobile} savedRestauraunts={this.props.savedRestauraunts} onSaveRestauraunt={this.saveNewRestauraunt} />}
              // component={RestaurauntDetails} isMobile={this.state.isMobile} 
              />
            </div>
          </BrowserRouter>
        </div>
      )
    }
    
  }
  
}

export default connect(mapStateToProps)(App);
// export default App;