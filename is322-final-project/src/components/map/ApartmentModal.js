import React from 'react'

import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../../styles/map/apartmentModal.css'

class ApartmentModal extends React.Component {
    state = {
        iconClicked: false
    }
    render() {
        return(
            <div className="apartment-modal-container">
                <div className="apartment-modal-banner">
                    <h1 className="apartment-modal-banner__title">{this.props.address}</h1>
                    <FavoriteBorderIcon className="favorite-icon"></FavoriteBorderIcon>
                </div>
                <div className="apartment-modal-details">
                    <div className="left-side">
                        <img src={this.props.photo} className="apartment-modal-photo" alt="apartment-image"></img>
                    </div>
                    <div className="right-side">
                        <h2 className="right-side__price">{this.props.price}</h2>
                        <h3 className="right-side__beds">{this.props.beds} beds</h3>
                        <h3 className="right-side__square-feet">{this.props.squareFeet} square feet</h3>
                        <Button className="view-details" variant="contained" color="primary">
                            <Link to={`listing/${this.props.listingId}&${this.props.propertyId}`} className="view-details-link">
                            view details
                            </Link>
                        </Button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ApartmentModal