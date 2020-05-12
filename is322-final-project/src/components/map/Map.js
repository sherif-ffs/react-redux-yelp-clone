import React from "react";

import ReactMap, { Marker, Popup } from "react-map-gl"
import Form from '../shared/Form'
import LoadingScreen from '../shared/LoadingScreen'
import RestaurauntsModal from './RestaurauntsModal'
import SearchIcon from '@material-ui/icons/Search';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import '../../styles/map/map.css'

class Map extends React.Component {

  state = {
    showForm: '',
    viewport: '',
    listings: []
  }

checkIfRestaurauntIsSaved = currentRestauraunt => {
  if (this.props.savedRestauraunts.includes(currentRestauraunt) === false) {
      return false
  } else {
      return true
  }
}

  componentDidMount() {
    this.setState({
      showForm: false,
      viewport: this.props.state.viewport,
      listings: this.props.listings
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.restauraunts !== this.props.restauraunts) {
      this.setState({
        viewport: this.props.state.viewport
      })
    }
  }

closeForm = () => {
  this.setState({
    showForm: false
  })
}

  render() {
    return(
      this.props.loading ? <LoadingScreen>loading</LoadingScreen>
      :
      <ReactMap
        {...this.state.viewport}
        mapboxApiAccessToken={this.props.state.token}
        mapStyle="mapbox://styles/sherif-ffs/ck89gx93002vs1inzl1nxvwyx"
        onViewportChange={viewport => {
            this.setState({ viewport: viewport })
        }}
      >
      {this.props.restauraunts.map((listing) => (
          <Marker
            key={listing.id}
            latitude={listing.coordinates.latitude}
            longitude={listing.coordinates.longitude}
          >
              <div 
                className="apartment-button"
                onClick={e => {
                    e.preventDefault()
                    this.setState({
                        selectedListing: listing
                    })
                }}
              >
              {this.props.savedRestauraunts.filter(e => e.restauraunt.id === listing.id).length > 0
              ? <LocationOnRoundedIcon fontSize="large" style={{color:'#323648'}}/>
              : <LocationOnRoundedIcon fontSize="small"/>
              }
              </div>
          </Marker>
      ))}
      {this.state.selectedListing ? (
          <Popup
            className="popup"
            latitude={this.state.selectedListing.coordinates.latitude}
            longitude={this.state.selectedListing.coordinates.longitude}
            onClose={() => {this.setState({
                selectedListing: null
            })}}
          >
            <RestaurauntsModal
              address1={this.state.selectedListing.location.display_address[0]}
              address2={this.state.selectedListing.location.display_address[1]}
              photo={this.state.selectedListing.image_url}
              name={this.state.selectedListing.name}
              restauraunt={this.state.selectedListing}
              rating={this.state.selectedListing.rating}
              price={this.state.selectedListing.price}
              categories={this.state.selectedListing.categories}
              latitude={this.state.selectedListing.coordinates.latitude}
              longitude={this.state.selectedListing.coordinates.longitude}
              id={this.state.selectedListing.id}
              savedRestauraunts={this.props.savedRestauraunts}
              onSaveNewRestauraunt={this.props.onSaveRestauraunt}
              onClose={() => {this.setState({
                  selectedListing: null
              })}}
            ></RestaurauntsModal>
          </Popup>
      ) : null}
      {this.state.showForm ? <Form closeForm={this.closeForm} onSubmit={this.props.onSearchSubmit}></Form> : <SearchIcon className="circle" onClick={() => this.setState({ showForm: true})}></SearchIcon>}
      
      </ReactMap>
      
    )
  }
}



export default Map;