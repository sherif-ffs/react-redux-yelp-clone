import React from 'react'

import '../../styles/userReview.css'

import StarRatings from 'react-star-ratings';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class UserReview extends React.Component {
    render() {
        return(
            <div className="user-review-container">
                <div className="my-reviews-image-wrapper">
                    {/* <img src={this.props.image}></img> */}
                    <AccountBoxIcon className="my-reviews-icon"></AccountBoxIcon>
                </div>
                <div className="my-review-main-content">
                    <div className="my-review-header">
                        <p className="user-review-title">{this.props.name}</p>
                        <p className="user-review-date">{this.props.date.substring(4,15)}</p>
                    </div>
                    <StarRatings
                        className="my-reviews-ratings"
                        name="rating"
                        rating={this.props.rating}
                        starDimension="30px"
                        starSpacing="2px"
                        starRatedColor='#DE3C4B'
                        starEmptyColor='#d3d1d1'                        
                    >
                    </StarRatings>
                    <div className="my-review-text">
                        <p>{this.props.text}</p>
                    </div>
                    <div className="my-review-icons">
                        <EditIcon className="edit-my-review my-review-icon"></EditIcon>
                        <CancelIcon className="delete-my-review my-review-icon" onClick={() => this.props.removeReview(this.props.review)}></CancelIcon>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default UserReview