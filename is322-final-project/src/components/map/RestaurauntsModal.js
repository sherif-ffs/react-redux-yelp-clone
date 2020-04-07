import React from 'react'

import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarRatings from 'react-star-ratings';

import '../../styles/map/restaurauntModal.css'

import { connect } from "react-redux";
import { saveRestauraunt } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'

function mapDispatchToProps(dispatch) {
    return {
        saveRestauraunt: restauraunt => dispatch(saveRestauraunt(restauraunt)),
        removeRestauraunt: restauraunt => dispatch(removeRestauraunt(restauraunt))
    };
}

class RestaurauntsModal extends React.Component {

    state = {
        iconClicked: false,
        restauraunt: ''
    }
    
    checkIfRestaurauntIsSaved = currentRestauraunt => {
        // if (this.props.savedRestauraunts.includes(currentRestauraunt) === false) {
        //     return false
        // } else {
        //     return true
        // }
        for (let i=0; i<this.props.savedRestauraunts.length; i++) {
            if (this.props.savedRestauraunts[i].id === currentRestauraunt.id) {
                return true
            } else {
                return false
            }
        }
    }

    // onIconClick = (restauraunt) => {
    //     this.props.onSaveNewRestauraunt(restauraunt)

    //     if (this.props.savedRestauraunts.includes(restauraunt) === false) {
    //         this.props.saveRestauraunt({ 
    //             restauraunt: restauraunt,
    //         });
    //       } 
    //       else {
    //         this.props.removeRestauraunt({ 
    //             restauraunt: restauraunt,
    //         });
    //       }
    // }
    onIconClick = (restauraunt) => {
        if (this.props.savedRestauraunts.filter(e => e.restauraunt.id === restauraunt.id).length > 0) {
            this.props.removeRestauraunt({ 
                restauraunt: restauraunt,
            });
            this.setState({
                iconClicked: false
            })
        } else {
            this.props.saveRestauraunt({ 
                restauraunt: restauraunt,
            });
            this.setState({
                iconClicked: true
            })
        }
    }
    componentDidMount() {
        this.setState({
            restauraunt: this.props.restauraunt
        })
    }

    // onIconClick = () => {
    //     if (this.state.iconClicked === false) {
    //         this.setState({
    //             iconClicked: true
    //         })
    //         this.props.saveRestauraunt({ 
    //             restauraunt: this.state.restauraunt,
    //          });
    //     } else {
    //         this.setState({
    //             iconClicked: false
    //         })
    //     }
    // }

    render() {
        return(
            <div className="apartment-modal-container">
                <div className="apartment-modal-banner">
                    <div className="address-wrapper">
                        <h3 className="apartment-modal-banner__title">{this.props.address1}</h3>
                        <h3 className="apartment-modal-banner__title">{this.props.address2}</h3>
                    </div>
                    {/* {this.state.iconClicked ? <FavoriteIcon className="favorite-icon" onClick={this.onIconClick}></FavoriteIcon> : <FavoriteBorderIcon className="favorite-icon" onClick={this.onIconClick}></FavoriteBorderIcon>} */}
                    {/* <FavoriteBorderIcon className="favorite-icon"></FavoriteBorderIcon> */}
                    {this.props.savedRestauraunts.filter(e => e.restauraunt.id === this.props.restauraunt.id).length > 0
                        ? <FavoriteIcon className="favorite-icon" onClick={() => this.onIconClick(this.props.restauraunt)}></FavoriteIcon>
                        : <FavoriteBorderIcon className="favorite-icon" onClick={() => this.onIconClick(this.props.restauraunt)}></FavoriteBorderIcon>
                        }
                </div>
                <div className="apartment-modal-details">
                    <div className="left-side">
                        <img src={this.props.photo} className="apartment-modal-photo" alt="apartment-image"></img>
                    </div>
                    <div className="right-side">
                        <h2 className="right-side__name">{this.props.name}</h2>
                        <h2 className="right-side__price">{this.props.price} · {this.props.categories[0].title}, {this.props.categories[this.props.categories.length - 1].title}</h2>
                        <StarRatings 
                            rating={this.props.rating}
                            starDimension="28px"
                            starSpacing="2px"
                            starRatedColor='#DE3C4B'
                            starEmptyColor='#d3d1d1'
                        ></StarRatings>
                        <Button className="view-details" variant="contained" color="primary">
                            <Link to={`restauraunt/${this.props.id}`} className="view-details-link">
                            view details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RestaurauntsModal)
