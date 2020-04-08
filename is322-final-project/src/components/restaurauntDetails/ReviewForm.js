import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import '../../styles/reviewForm.css'
import cartman from '../../assets/cartman.jpg'

import { connect } from "react-redux";
import { addReview } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
      addReview: review => dispatch(addReview(review))
    };
  }

class ReviewForm extends React.Component {
    
    state = {
        rating: 0,
        text: '',
        user: {
            name: 'John Doe',
            image_url: cartman,
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
          name: this.props.name,
          id: this.props.id,
          rating: this.state.rating,
          text: this.state.text,
          user: {
            name: 'Yelp Critic',
            image_url: cartman,
          },
          time_created: new Date().toString()
        });
        this.props.addReview({ 
            name: this.props.name,
            id: this.props.id,
            rating: this.state.rating,
            text: this.state.text,
            user: {
                name: 'Yelp Critic',
                image_url: cartman,
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
                    <h1 className="profile-name">Yelp Critic</h1>
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
                        placeholder="I was thinking of giving this place five stars. I'm kind of teetering on five stars or one star..."
                        value={this.state.text}
                        onChange={e => this.setState({ text: e.target.value})}
                    ></TextField>
                    <Button color="secondary" type="submit" onClick={this.onSubmit.bind(this)}>Post Review</Button>
                </div>
            </div>
        )
    }
}

// export default ReviewForm
// export default connect(null, { addReview })(ReviewForm);

export default connect(null, mapDispatchToProps)(ReviewForm)

// const Form = connect(
//     null,
//     mapDispatchToProps
//   )(ConnectedForm);
  
//   export default Form;