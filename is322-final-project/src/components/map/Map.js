import React from "react";

import ReactMap, { Marker, Popup } from "react-map-gl"
import '../../styles/map/map.css'
class Map extends React.Component {

  state = {
    listings: [],
    selectedListing: null,
    viewport: {
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 12,
        width: '100vw',
        height: '100vh',
    },
    token:'pk.eyJ1Ijoic2hlcmlmLWZmcyIsImEiOiJjazgyNGFoM3Mwd29qM2xsbml4eHIyNm9qIn0.k8-uELDQoHBgpiITyyc6pg'
  }

  componentDidMount() {
    this.callApi()
  }

  callApi() {
    fetch("https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=100&city=New%20York%20City&offset=0", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "realtor.p.rapidapi.com",
      "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
    }
    })
  .then(res => res.json())
  .then((data) => {
    console.log(data.listings);
    this.setState({
        listings: data.listings
    })
  })
  .catch(err => {
    console.log(err);
  });
  }

  render() {
    console.log('this.state: ', this.state)
    return(
      <ReactMap
        {...this.state.viewport}
        mapboxApiAccessToken={this.state.token}
        mapStyle="mapbox://styles/sherif-ffs/ck82556sa0ugx1imsr8dce0k3"
        onViewportChange={viewport => {
            this.setState({ viewport: viewport })
        }}
      >
      <div className="form"></div>
      {this.state.listings.map((listing) => (
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
              >apartment</div>
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
                  <h3>{this.state.selectedListing.address}</h3>
              </div>
          </Popup>
      ) : null}
      </ReactMap>
    )
  }
}

export default Map