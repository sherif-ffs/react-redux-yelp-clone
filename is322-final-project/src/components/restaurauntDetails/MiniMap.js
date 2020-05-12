import React from 'react'

import ReactMap, { Marker } from "react-map-gl"
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import LoadingScreen from '../shared/LoadingScreen'

class MiniMap extends React.Component {

    state = {
        viewport: {
            latitude: 40.7128,
            longitude:  -74.0060,
            zoom: 12,
            width: '30vw',
            height: '50vh',
        },
        token:'pk.eyJ1Ijoic2hlcmlmLWZmcyIsImEiOiJjazgyNGFoM3Mwd29qM2xsbml4eHIyNm9qIn0.k8-uELDQoHBgpiITyyc6pg',
        loading: true,
        isMobile: true
    }
    componentDidMount() {
        let newViewport = {
            latitude: this.props.coordinates.latitude,
            longitude: this.props.coordinates.longitude,
            zoom: 12,
            width: this.props.isMobile ? '95vw' : '25vw',
            height: '40vh'
        }
        this.setState({
            viewport: newViewport,
            loading: false
        })
    }

    render() {
        return (
            <div className="map-wrapper">
                {this.state.loading ? 
                <LoadingScreen style={{
                    width: '25vw',
                    height: '40vh'
                }}></LoadingScreen>
                :
                <ReactMap
                    {...this.state.viewport}
                    mapboxApiAccessToken={this.state.token}
                    mapStyle="mapbox://styles/sherif-ffs/ck89gx93002vs1inzl1nxvwyx"
                    style={{ marginTop: '2%'}}
                >
                <Marker
                    latitude={this.state.viewport.latitude}
                    longitude={this.state.viewport.longitude}
                >
                    <LocationOnRoundedIcon fontSize="large" style={{ color: '#DE3C4B'}}/>
                </Marker>
                </ReactMap>
            }
                
            </div>
        )
    }
}

export default MiniMap