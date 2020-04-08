import React from 'react'
import { connect } from 'react-redux';
import { removeReview } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'

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
        return(
            <>
                <div>profile</div>   
                <div className="profile-container">
                    <div className="header-wrapper"></div>
                    <div className="reviews-favorites-wrapper">
                        <div className="favorites-container profile-column">
                        <h1>Favorite Restauraunts</h1>
                        <ul>
                            {this.state.restauraunts.map(el => (
                                <li key={el.restauraunt.id}>
                                    <p>{el.restauraunt.name}</p>
                                    <button onClick={() => this.removeRestauraunt(el.restauraunt)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        </div>
                        <div className="reviews-container profile-column">
                        <h1>Reviews</h1>
                        <ul>
                        {this.state.reviews.map(el => (
                            <li key={el}>
                                <p>{el.name}</p>
                                <p>{el.rating}</p>
                                <button onClick={() => this.removeReview(el)}>Delete</button>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(Profile)