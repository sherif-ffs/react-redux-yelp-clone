import React from 'react'

import LoadingScreen from '../shared/LoadingScreen'
import SlideShow from './SlideShow'
import axios from 'axios';
import '../../styles/restaurauntDetails.css'
import StarRatings from 'react-star-ratings';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Reviews from './Reviews'
import LocationAndHours from './LocationAndHours'

import { connect } from "react-redux";
import { saveRestauraunt } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
      saveRestauraunt: restauraunt => dispatch(saveRestauraunt(restauraunt))
    };
  }

class RestaurauntDetails extends React.Component {

    state = {
        restauraunt: {},
        reviews: [],
        errorMessage: '',
        photos: [],
        sortValue: '',
        searchInput: '',
        iconClicked: false
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

    onSortValueChange = (sortValue) => {
        this.setState({
            sortValue: sortValue
        })
      }

    onSearchInputChange = (searchInput) => {
        this.setState({
            searchInput: searchInput
        })
    }

    getFilteredReviews() {
        let reviews = this.state.reviews

        let {sortValue, searchInput } = this.state;
        let sortedReviews;
    
        if (!!searchInput) {
          if (searchInput !== '') {
            sortedReviews = reviews.filter(review => review.text.toLowerCase().includes(searchInput.trim('').toLowerCase()));
            return sortedReviews            
          } else {
            sortedReviews = reviews
            return sortedReviews            
            }
          }
        
        if (!!sortValue) {
            if (sortValue === 'highest') {
                sortedReviews = reviews.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                return sortedReviews
            } 
            if (sortValue !== 'all' && sortValue === 'lowest') {
                sortedReviews = reviews.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                return sortedReviews
            } 
            else {
                sortedReviews = reviews;
                return sortedReviews
            }
        }

        return sortedReviews

    }

    componentDidMount() {
        this.callApi();
    }
    onAddReview = (review) => {
        let { reviews } = this.state;
        
        let newReviews = [
            review,
            ...reviews
        ]
            
        this.setState({
            reviews: newReviews
        }) 
      }

    callApi() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            })
            .then((res) => {
            this.setState({
                restauraunt: res.data,
                photos: res.data.photos
            })
            })
            .catch((err) => {
            console.log ('error')
        })
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}/reviews`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            })
            .then((res) => {
            this.setState({
                reviews: res.data.reviews
            })
            })
            .catch((err) => {
            console.log ('error')
        })
    }
    


    render() {        
        console.log('this.props: ', this.props)
        let sortedReviews = this.getFilteredReviews();
        return (
            this.state.restauraunt == null ?
            <div>No data can be loaded for this apartment</div>
            : (Object.keys(this.state.restauraunt).length > 0
            ? 
                <React.Fragment className="wrapper">
                    <div className="header">
                        <div className="slideshow-wrapper">
                            <SlideShow photos={this.state.photos}></SlideShow>
                        </div>
                        <div className="header-information-wrapper">
                            <div className="title-wrapper">
                                <h1 className="restauraunt-title">{this.state.restauraunt.name}</h1>
                                {this.state.iconClicked ? <FavoriteIcon className="restauraunt-details-favorite-icon" onClick={this.onIconClick}></FavoriteIcon> : <FavoriteBorderIcon className="restauraunt-details-favorite-icon" onClick={this.onIconClick}></FavoriteBorderIcon>}
                            </div>
                            <div className="rating-wrapper">
                                <StarRatings 
                                    className="ratings"
                                    rating={this.state.restauraunt.rating}
                                    starDimension="32px"
                                    starSpacing="2px"
                                    starRatedColor='#DE3C4B'
                                    starEmptyColor='#d3d1d1'
                                ></StarRatings>
                                <h3 className="rating-count">({this.state.restauraunt.review_count})</h3>
                            </div>
                            <div className="price-rating-tags">
                                <h3 className="restauraunt-price">{this.state.restauraunt.price}</h3>
                                <h3 className="restauraunt-tags restauraunts-details-text">{this.state.restauraunt.categories[0].title}, {this.state.restauraunt.categories[this.state.restauraunt.categories.length - 1].title}</h3>
                            </div>
                            <div className="restauraunt-phone-wrapper">
                                <PhoneRoundedIcon className="phone-icon"></PhoneRoundedIcon>
                                <h3 className="restauraunt-phone restauraunts-details-text">{this.state.restauraunt.display_phone}</h3>
                            </div>
                            <div className="restauraunt-address-wrapper">
                            <RoomRoundedIcon className="address-icon"></RoomRoundedIcon>
                            <h3 className="restauraunt-address restauraunts-details-text">{this.state.restauraunt.location.display_address[0]}, {this.state.restauraunt.location.display_address[1]}</h3>
                            </div>
                            {this.state.restauraunt.hours ? 
                            (this.state.restauraunt.hours.is_open_now 
                                ? 
                                <div className="restauraunt-is-open">
                                    <EventAvailableIcon className="is-open-icon"></EventAvailableIcon>
                                    <h3 className="is-open-text restauraunts-details-text">We're open <span className="is-open-emoji" role="img" aria-labelledby="yummy-emoji">😋</span></h3>
                                </div>
                                :
                                <div className="restauraunt-is-open">
                                    <EventBusyIcon className="is-open-icon"></EventBusyIcon>
                                    <h3 className="is-open-text restauraunts-details-text">We're closed <span className="is-open-emoji" role="img" aria-labelledby="sad-emoji">😔</span></h3>
                                </div>)
                                : ''
                            }
                        </div>
                    </div>
                    <div className="reviews-location-hours-wrapper">
                    <Reviews reviews={sortedReviews ? sortedReviews : this.state.reviews} onAddReview={this.onAddReview} onSortValueChange={this.onSortValueChange} onSearchInputChange={this.onSearchInputChange} name={this.state.restauraunt.name}></Reviews>
                    <LocationAndHours coordinates={this.state.restauraunt.coordinates} hours={this.state.restauraunt.hours} isMobile={this.props.isMobile} ></LocationAndHours>
                    </div>
                </React.Fragment>
            : <LoadingScreen></LoadingScreen>)
        )
        
    }
}

// export default RestaurauntDetails
export default connect(null, mapDispatchToProps)(RestaurauntDetails)
