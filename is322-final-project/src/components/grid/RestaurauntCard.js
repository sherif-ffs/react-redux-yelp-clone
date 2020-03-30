import React from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'

import '../../styles/restaurauntCard.css'

import { connect } from "react-redux";
import { saveRestauraunt } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
      saveRestauraunt: restauraunt => dispatch(saveRestauraunt(restauraunt))
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

    onIconClick = () => {
        if (this.state.iconClicked === false) {
            this.setState({
                iconClicked: true
            })
            this.props.saveRestauraunt({ 
                restauraunt: this.state.restauraunt,
             });
        } else {
            this.setState({
                iconClicked: false
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
                        {this.state.iconClicked ? <FavoriteIcon className="restauraunt-card-icon" onClick={this.onIconClick}></FavoriteIcon> : <FavoriteBorderIcon className="restauraunt-card-icon" onClick={this.onIconClick}></FavoriteBorderIcon>}
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

// export default RestaurauntCard
export default connect(null, mapDispatchToProps)(RestaurauntCard)
