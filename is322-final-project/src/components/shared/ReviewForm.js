import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import '../../styles/reviewForm.css'

class ReviewForm extends React.Component {
    
    state = {
        rating: 0
    }

    changeRating = ( newRating, name ) => {
        this.setState({
          rating: newRating
        });
      }

    render() {
        return (
            <div className="user-review-wrapper">
                <div className="profile-wrapper">
                    <PersonIcon className="profile-icon"></PersonIcon>
                    <h1 className="profile-name">John Doe</h1>
                </div>
                <div className="review-content-wrapper">
                    <StarRatings
                        className="ratings"
                        name="rating"
                        rating={this.state.rating}
                        changeRating={this.changeRating}
                        starDimension="40px"
                        starSpacing="4px"
                        starRatedColor='#DE3C4B'
                        starEmptyColor='#d3d1d1'
                    ></StarRatings>
                    <TextField 
                        className="review-text"
                        multiline
                        placeholder="Ordered the plain cheese for the first time on seamless, 
                        and wow was it incredible. So flavorful and perfectly cooked. 
                        Sauce and cheese ratio was on point. 
                        Will definitely be trying their other pies. 
                        Yes it's pricey, but it is absolutely worth it!"
                    ></TextField>
                    <Button color="secondary">Post Review</Button>
                </div>
            </div>
        )
    }
}

export default ReviewForm