import React from 'react'

import StarRatings from 'react-star-ratings';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom'

import '../../styles/myRestauraunt.css'

class MyRestauraunt extends React.Component {
    render() {
        console.log('this.props: ', this.props)
        return (
            <>
            <div className="wrapper-for-close-icon">
                <div className="my-restauraunt-wrapper">
                    <div className="my-restauraunt-image-wrapper">
                        <img src={this.props.image}></img>
                    </div>
                    <div className="my-restauraunt-content-wrapper">
                        <div className="my-restauraunt-title-wrapper">
                        <Link to={`restauraunt/${this.props.restauraunt.id}`} className="content-title-link">
                            <h1 className="content-title">{this.props.title}</h1>                     
                        </Link>
                        <CancelIcon fontSize="large" className="close-icon-my-restauraunt" onClick={() => this.props.onRemoveRestauraunt(this.props.restauraunt)}></CancelIcon>
                        </div>
                        <StarRatings
                            className="ratings"
                            name="rating"
                            rating={this.props.rating}
                            starDimension="30px"
                            starSpacing="2px"
                            starRatedColor='#DE3C4B'
                            starEmptyColor='#d3d1d1'                        
                        >
                        </StarRatings>
                        <h1 className="my-restauraunt-price-categories">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h1>
                        <h1 className="my-restauraunt-location">{this.props.location.address1}, {this.props.location.city}, {this.props.location.state}</h1>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default MyRestauraunt