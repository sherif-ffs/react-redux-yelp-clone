import React from 'react'

import LoadingScreen from './LoadingScreen'
import SlideShow from './SlideShow'
import axios from 'axios';
import '../../styles/restaurauntDetails.css'
import StarRatings from 'react-star-ratings';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';

import Reviews from './Reviews'
import LocationAndHours from './LocationAndHours'

class RestaurauntDetails extends React.Component {

    state = {
        restauraunt: {},
        reviews: [],
        errorMessage: '',
        photos: []
    }
    componentDidMount() {
        this.callApi();
    }

    callApi() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            })
            .then((res) => {
            console.log('res: ', res)
            this.setState({
                restauraunt: res.data,
                photos: res.data.photos
            })
            })
            .catch((err) => {
            console.log ('error')
        })
        // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}/reviews`, {
        //     headers: {
        //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        //     },
        //     })
        //     .then((res) => {
        //     console.log('res: ', res)
        //     this.setState({
        //         reviews: res.data.reviews
        //     })
        //     })
        //     .catch((err) => {
        //     console.log ('error')
        // })
    }
    


    render() {        
        console.log('this.props: ', this.props)
        console.log('this.state.restauraunt: ', this.state.restauraunt)
        
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
                            <h1 className="restauraunt-title">{this.state.restauraunt.name}</h1>
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
                                <h3 className="restauraunt-tags">{this.state.restauraunt.categories[0].title}, {this.state.restauraunt.categories[this.state.restauraunt.categories.length - 1].title}</h3>
                            </div>
                            <div className="restauraunt-phone-wrapper">
                                <PhoneRoundedIcon className="phone-icon"></PhoneRoundedIcon>
                                <h3 className="restauraunt-phone">{this.state.restauraunt.display_phone}</h3>
                            </div>
                            <div className="restauraunt-address-wrapper">
                            <RoomRoundedIcon className="address-icon"></RoomRoundedIcon>
                            <h3 className="restauraunt-address">{this.state.restauraunt.location.display_address[0]}, {this.state.restauraunt.location.display_address[1]}</h3>
                            </div>
                            {this.state.restauraunt.hours.is_open_now 
                            ? 
                            <div className="restauraunt-is-open">
                                <EventAvailableIcon className="is-open-icon"></EventAvailableIcon>
                                <h3 className="is-open-text">We're open <span className="is-open-emoji">😋</span></h3>
                            </div>
                            :
                            <div className="restauraunt-is-open">
                                <EventBusyIcon className="is-open-icon"></EventBusyIcon>
                                <h3 className="is-open-text">We're closed <span className="is-open-emoji">😔</span></h3>
                            </div>
                            }

                        </div>
                    </div>
                    <div className="reviews-location-hours-wrapper">
                    <Reviews reviews={this.state.reviews}></Reviews>
                    <LocationAndHours></LocationAndHours>
                    </div>
                </React.Fragment>
            : <LoadingScreen></LoadingScreen>)
        )
        
    }
}

export default RestaurauntDetails