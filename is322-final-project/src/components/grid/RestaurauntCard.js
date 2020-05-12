import React from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'

import '../../styles/restaurauntCard.css'

import { connect } from "react-redux";
import { saveRestauraunt } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
      saveRestauraunt: restauraunt => dispatch(saveRestauraunt(restauraunt)),
      removeRestauraunt: restauraunt => dispatch(removeRestauraunt(restauraunt))
    };
}

class RestaurauntCard extends React.Component {

    state = {
        iconClicked: false,
        restauraunt: ''
    }
    
    componentDidMount() {
        this.setState({
            restauraunt: this.props.restauraunt
        })
    }

    checkIfRestaurauntIsSaved = currentRestauraunt => {
        if (this.props.savedRestauraunts.filter(e => e.restauraunt.id === currentRestauraunt.id).length > 0) {
        } else {
        }
    }

    onIconClick = (restauraunt) => {
        if (this.props.savedRestauraunts.filter(e => e.restauraunt.id === restauraunt.id).length > 0) {
            this.props.removeRestauraunt({ 
                restauraunt: restauraunt,
            });
            this.setState({
                iconClicked: false
            })
        } else {
            this.props.saveRestauraunt({ 
                restauraunt: restauraunt,
            });
            this.setState({
                iconClicked: true
            })
        }
    }

    render() {
        return(
            <div className="restauraunt-card">
                <div className="image-wrapper">
                    <Link to={`restauraunt/${this.props.id}`} className="view-details-link">
                        <img src={this.props.image} className="restauraunt-card__image"></img>
                    </Link>
                </div>
                <div className="card-content">
                    <div className="name-wrapper">
                    <Link to={`restauraunt/${this.props.id}`} className="view-details-link">
                        <h1 className="name-wrapper__name">{this.props.name}</h1>
                    </Link>
                        {this.props.savedRestauraunts.filter(e => e.restauraunt.id === this.props.restauraunt.id).length > 0 
                        ? <FavoriteIcon className="restauraunt-card-icon" onClick={() => this.onIconClick(this.props.restauraunt)}></FavoriteIcon> 
                        : <FavoriteBorderIcon className="restauraunt-card-icon" onClick={() => this.onIconClick(this.props.restauraunt)}></FavoriteBorderIcon> 
                        }
                    </div>
                    <div className="ratings-wrapper">
                        <StarRatings
                            className="ratings"
                            name="rating"
                            rating={this.props.rating}
                            starDimension="25px"
                            starSpacing="2px"
                            starRatedColor='#DE3C4B'
                            starEmptyColor='#d3d1d1'                        
                        >
                        </StarRatings>
                        <h3 className="review-count">({this.props.reviewCount})</h3>
                    </div>
                    <h3 className="restauraunt-price-categories">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h3>
                    <h3 className="restauraunt-location">{this.props.location.address1}, {this.props.location.city}, {this.props.location.state}</h3>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RestaurauntCard)
