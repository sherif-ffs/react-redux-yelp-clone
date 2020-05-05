import React from 'react'
import { connect } from 'react-redux';
import { removeReview } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'
import { updateReview } from '../../actions/index'

import MyRestauraunt from './MyRestauraunt.js'
import userImage from '../../assets/user_large_square.png'

import UserReview from './UserReview'
import Modal from './Modal'

// const mapStateToProps = state => {
//     return { savedRestauraunts: state.savedRestauraunts };
//   };
import '../../styles/profile.css'

function mapDispatchToProps(dispatch) {
    return {
      removeRestauraunt: restauraunt => dispatch(removeRestauraunt(restauraunt)),
      removeReview: review => dispatch(removeReview(review)),
      updateReview: review => dispatch(updateReview(review))
    };
}


class Profile extends React.Component {

    state = {
        restauraunts: [],
        reviews: [],
        currentReview: ''
    }

    componentDidMount() {
        this.setState({
            restauraunts: this.props.savedRestauraunts,
            reviews: this.props.reviews
        })
    }

    showModal = (currentReview) => {
        document.querySelector('.modal-wrapper').style.display = "flex";
        this.setState({
            currentReview: currentReview
        })
    }

    updateReview = (review, modalState) => {
        console.log('review: ', review)
        console.log('modalState: ', modalState)
        this.setState({
            currentReview: review
        })
        this.props.updateReview({
            review: review,
            modalState: modalState
        })
        this.setState({
            reviews: this.props.reviews
        })
        document.querySelector('.modal-wrapper').style.display = "none"
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
                    id={restauraunt.id}
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
                    showModal={this.showModal}
                ></UserReview>
            )
        })
        return(
            <>
                <div className="profile-container">
                    <div className="header-wrapper">
                        <div className="header-image-wrapper">
                            <img src={userImage} className="header-image"></img>
                        </div>
                        <div className="header-content-wrapper">
                            <h1 className="header-title">Yelp Critic</h1>
                            <div className="review-favorite-count">
                                <h3 className="user-review-count">reviews ({this.state.reviews ? this.state.reviews.length : 0})</h3>
                                <h3 className="user-review-count">favorite restauraunts ({this.state.restauraunts ? this.state.restauraunts.length : 0})</h3>
                            </div>
                        </div>
                    </div>
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
                <Modal currentReview={this.state.currentReview} updateReview={this.updateReview}></Modal>
                </div>
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(Profile)