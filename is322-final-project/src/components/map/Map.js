import React from "react";

import ReactMap, { Marker, Popup } from "react-map-gl"
import Form from '../shared/Form'
import LoadingScreen from '../shared/LoadingScreen'
import SearchIcon from '@material-ui/icons/Search';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom'
import '../../styles/map/map.css'

class Map extends React.Component {

  state = {
    showForm: '',
    viewport: '',
    listings: []
  }

  componentDidMount() {
    this.setState({
      showForm: false,
      viewport: this.props.state.viewport,
      listings: this.props.listings
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state.listings !== this.props.state.listings) {
      this.updateViewport()
    }
  }

updateViewport = () => {
  let latitudes = 0;
  this.props.state.listings.forEach(listing => {
    latitudes += listing.lat
  })
  let longitudes = 0;
  this.props.state.listings.forEach(listing => {
    longitudes += listing.lon
  })
  let newViewport = {
    latitude: latitudes / this.props.state.listings.length,
    longitude: longitudes / this.props.state.listings.length,
    zoom: 11,
    width: '100vw',
    height: '90vh',
 }
 this.setState({
   viewport: newViewport
 })
 this.props.updateAppViewport()
}

closeForm = () => {
  this.setState({
    showForm: false
  })
}

  render() { 
    // console.log('this.props.state.listings: ', this.props.state.listings)
    return(
      this.props.loading ? <LoadingScreen>loading</LoadingScreen>
      :
      <ReactMap
        {...this.state.viewport}
        mapboxApiAccessToken={this.props.state.token}
        mapStyle="mapbox://styles/sherif-ffs/ck83l6omf28bw1iqw07lrngts"
        onViewportChange={viewport => {
            // console.log('viewport: ', viewport)
            this.setState({ viewport: viewport })
        }}
      >
      {this.props.state.listings.map((listing) => (
          <Marker
            key={listing.listing_id}
            latitude={listing.lat}
            longitude={listing.lon}
          >
              <div 
                className="apartment-button"
                onClick={e => {
                    e.preventDefault()
                    this.setState({
                        selectedListing: listing
                    })
                }}
              ><HomeRoundedIcon fontSize="medium"/></div>
          </Marker>
      ))}
      {this.state.selectedListing ? (
          <Popup
            latitude={this.state.selectedListing.lat}
            longitude={this.state.selectedListing.lon}
            onClose={() => {this.setState({
                selectedListing: null
            })}}
          >
              <div>
                  <h2>{this.state.selectedListing.price}</h2>
                  <h3>{this.state.selectedListing.sqft_raw}</h3>
                  <h3>{this.state.selectedListing.prop_type}</h3>
                  <h3>{this.state.selectedListing.id}</h3>
                  <Link to={`listing/${this.state.selectedListing.listing_id}&${this.state.selectedListing.property_id}`}>
                    view details
                  </Link>
              </div>
          </Popup>
      ) : null}
      {this.state.showForm ? <Form closeForm={this.closeForm} onSubmit={this.props.onSearchSubmit}></Form> : <SearchIcon className="circle" onClick={() => this.setState({ showForm: true})}></SearchIcon>}
      
      </ReactMap>
      
    )
  }
}



export default Map;