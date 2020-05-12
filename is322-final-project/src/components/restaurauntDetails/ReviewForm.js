import React from 'react'

import StarRatings from 'react-star-ratings';
import { Button } from '@material-ui/core';

import '../../styles/reviewForm.css'
import cartman from '../../assets/cartman.jpg'
import userImage from '../../assets/user_large_square.png'

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
        if (this.state.text) {
          this.props.onAddReview({
            name: this.props.name,
            id: this.props.id,
            rating: this.state.rating,
            text: this.state.text,
            user: {
              name: 'Yelp Critic',
              image_url: userImage,
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
                  image_url: userImage,
              },
            time_created: new Date().toString()
           });
          this.setState({
              rating: 0,
              text: '',
          })
        } else {
          alert('review cannot be empty')
          this.setState({
            rating: 0,
            text: '',
        })
        }
        
      }

    render() {
        return (
            <div className="user-review-wrapper">
                <div className="profile-wrapper">
                    <img className="profile-icon" src={userImage}></img>
                    <h1 className="profile-name">Yelp Critic</h1>
                </div>
                <div className="review-content-wrapper">
                  {this.props.isMobile
                  ?
                  <StarRatings
                    className="ratings"
                    name="rating"
                    rating={this.state.rating}
                    changeRating={this.changeRating}
                    starDimension="65px"
                    starSpacing="1px"
                    starEmptyColor='#d3d1d1'
                  ></StarRatings>
                  : 
                  <StarRatings
                    className="ratings"
                    name="rating"
                    rating={this.state.rating}
                    changeRating={this.changeRating}
                    starDimension="40px"
                    starSpacing="4px"
                    starEmptyColor='#d3d1d1'
                  ></StarRatings>
                
                  }
                    
                    <textarea 
                        className="review-text"
                        multiline="true"
                        placeholder="I was thinking of giving this place five stars. I'm kind of teetering on five stars or one star..."
                        value={this.state.text}
                        onChange={e => this.setState({ text: e.target.value})}
                    ></textarea>
                    <Button color="secondary" type="submit" onClick={this.onSubmit.bind(this)} className="post-review-button">Post Review</Button>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(ReviewForm)

