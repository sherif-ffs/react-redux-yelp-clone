import React from 'react'

import '../../styles/userReview.css'

import StarRatings from 'react-star-ratings';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'

import userImage from '../../assets/user_large_square.png'

class UserReview extends React.Component {

    render() {
        return(
            <div className="user-review-container">
                <div className="my-reviews-image-wrapper">
                    <img src={userImage}></img>
                </div>
                <div className="my-review-main-content">
                    <div className="my-review-header">
                        <Link to={`restauraunt/${this.props.review.id}`} className="user-review-title-link">
                            <h1 className="user-review-title">{this.props.name}</h1>                     
                        </Link>
                        <p className="user-review-date">{this.props.date.substring(4,15)}</p>
                    </div>
                    <StarRatings
                        className="my-reviews-ratings"
                        id="user-review-ratings"
                        name="my-reviews-ratings"
                        rating={this.props.rating}
                        starDimension="30px"
                        starSpacing="2px"
                        starRatedColor='#DE3C4B'
                        starEmptyColor='#d3d1d1'
                    >
                    </StarRatings>
                    <div className="my-review-text">
                        <p>{this.props.text.trim("")}</p>
                    </div>
                    <div className="my-review-icons">
                        <EditIcon className="edit-my-review my-review-icon" onClick={() => this.props.showModal(this.props.review)} fontSize="large"></EditIcon>
                        <CancelIcon className="delete-my-review my-review-icon" onClick={() => this.props.removeReview(this.props.review)} fontSize="large"></CancelIcon>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default UserReview