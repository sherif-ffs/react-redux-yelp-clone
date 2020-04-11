import React from 'react'
import { connect } from 'react-redux';
import { removeReview } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'

import MyRestauraunt from './MyRestauraunt.js'

import UserReview from './UserReview'
// const mapStateToProps = state => {
//     return { savedRestauraunts: state.savedRestauraunts };
//   };
import '../../styles/profile.css'

function mapDispatchToProps(dispatch) {
    return {
      removeRestauraunt: restauraunt => dispatch(removeRestauraunt(restauraunt)),
      removeReview: review => dispatch(removeReview(review))
    };
}


class Profile extends React.Component {

    state = {
        restauraunts: [],
        reviews: []
    }

    componentDidMount() {
        this.setState({
            restauraunts: this.props.savedRestauraunts,
            reviews: this.props.reviews
        })
    }

    removeRestauraunt = (restauraunt) => {
        this.props.removeRestauraunt({ 
            restauraunt: restauraunt,
        });
        this.setState({
            restauraunts: this.props.savedRestauraunts
        })
    }

    removeReview = review => {
        this.props.removeReview({ 
            review: review,
        });
        this.setState({
            reviews: this.props.reviews
        })
    }
    render() {
        console.log('this.state: ', this.state)
        let favoritedRestauraunts = this.state.restauraunts.map(restauraunt => {
            return(
                <MyRestauraunt
                    key={restauraunt.id}
                    restauraunt={restauraunt.restauraunt}
                    title={restauraunt.restauraunt.name}
                    image={restauraunt.restauraunt.image_url}
                    rating={restauraunt.restauraunt.rating}
                    categories={restauraunt.restauraunt.categories}
                    location={restauraunt.restauraunt.location}
                    price={restauraunt.restauraunt.price}
                    onRemoveRestauraunt={this.removeRestauraunt}
                >
                </MyRestauraunt>
            )
            })    
        
        let myReviews = this.state.reviews.map(review => {
            return(
                <UserReview
                key={review.id}
                name={review.name}
                text={review.text}
                rating={review.rating}
                image={review.user.image_url}
                date={review.time_created}
                removeReview={this.removeReview}
                review={review}
                // text={review.review.}
                ></UserReview>
            )
        })
        return(
            <>
                <div>profile</div>   
                <div className="profile-container">
                    <div className="header-wrapper"></div>
                    <div className="reviews-favorites-wrapper">
                        <div className="favorites-container profile-column">
                            <h1 className="my-restauraunts-title">Favorite Restauraunts</h1>
                            {this.state.restauraunts.length > 0
                            ? <div>{favoritedRestauraunts}</div>
                            : <p>you have no saved restauraunts</p>
                            }
                        </div>
                        <div className="reviews-container profile-column">
                        <h1 className="my-reviews-title">Reviews</h1>
                        {this.state.reviews.length > 0 
                        ? <div>{myReviews}</div>
                        : <p>you have no saved reviews</p>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(Profile)