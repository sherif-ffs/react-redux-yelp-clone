import React from 'react'

import '../../styles/locationAndHours.css'
import MiniMap from './MiniMap'
import Hours from './Hours'

class LocationAndHours extends React.Component {
    render() {
        return (
            <div className="location-and-hours-wrapper">
                <h1 className="location-and-hours-wrapper-title">Location & Hours</h1>
                <MiniMap coordinates={this.props.coordinates} isMobile={this.props.isMobile}></MiniMap>
                <Hours hours={this.props.hours}></Hours>
            </div>
        )
    }
}

export default LocationAndHours