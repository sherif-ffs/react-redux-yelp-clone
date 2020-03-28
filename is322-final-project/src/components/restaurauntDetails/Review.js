import React from 'react'

import StarRatings from 'react-star-ratings';
import '../../styles/review.css'

class Review extends React.Component {
    render() {
        return (
            <div className="review-wrapper">
                <div className="user-wrapper">
                    <img className="user-image" src={this.props.image}></img>
                    <h1 className="user-name">{this.props.name}</h1>
                </div>
                <div className="review-content-wrapper">
                    <div className="rating-wrapper">
                        <StarRatings
                            className="ratings"
                            name="rating"
                            rating={this.props.rating}
                            changeRating={this.changeRating}
                            starDimension="30px"
                            starSpacing="2px"
                            starRatedColor='#DE3C4B'
                            starEmptyColor='#d3d1d1'
                        ></StarRatings>
                        <h3 className="review-date">{this.props.date.substring(0, 10)}</h3>
                    </div>
                    <div className="content">
                        <p className="content-text">{this.props.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Review