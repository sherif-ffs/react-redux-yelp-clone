import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import '../../styles/reviewForm.css'
import scoutHead from '../../assets/scout-head.png'

class ReviewForm extends React.Component {
    
    state = {
        rating: 0,
        text: '',
        user: {
            name: 'John Doe',
            image_url: scoutHead,
        }
       
    }

    changeRating = ( newRating, name ) => {
        this.setState({
          rating: newRating
        });
      }

      onSubmit(event) {
        event.preventDefault();
        this.props.onAddReview({
          rating: this.state.rating,
          text: this.state.text,
          user: {
            name: 'John Doe',
            image_url: scoutHead,
          },
          time_created: new Date().toString()
        });
        this.setState({
            rating: 0,
            text: '',
        })
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
                        value={this.state.text}
                        onChange={e => this.setState({ text: e.target.value})}
                    ></TextField>
                    <Button color="secondary" type="submit" onClick={this.onSubmit.bind(this)}>Post Review</Button>
                </div>
            </div>
        )
    }
}

export default ReviewForm