import React from 'react'

import '../../styles/modal.css'
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import StarRatings from 'react-star-ratings';
import { Button } from '@material-ui/core';

class Modal extends React.Component {

    state = {
        newRating: 0,
        newText: '',
    }

    componentDidMount() {
        this.setState({
            newText: ''
        })
    }
    componentDidUpdate(prevProps) {
        console.log('prevProps: ', prevProps)
        if (prevProps.currentReview !== this.props.currentReview) {
            this.setState({
                newText: '',
                newRating : this.props.currentReview.rating
                // rating: this.state.newRating
            })
        }
    }

    changeRating = ( newRating, name ) => {
        this.setState({
          newRating: newRating
        });
      }

    onTextChange = (e) => {
        this.setState({
            newText: e.target.value
        })
    }

    hideModal = () => {
        document.querySelector('.modal-wrapper').style.display = "none"
    }

    render() {
        console.log('this.props: ', this.props)
        return(
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-container-header">
                        <h1 className="modal-container-header__title">Edit Review</h1>
                        <CancelIcon className="modal-container-header__close" onClick={this.hideModal}></CancelIcon>
                    </div>
                    <div className="modal-main-content">
                        <StarRatings
                            className="ratings"
                            name="rating"
                            // rating={this.props.currentReview ? this.props.currentReview.rating : 0 }
                            rating={this.state.newRating}
                            changeRating={this.changeRating}
                            starDimension="40px"
                            starSpacing="4px"
                            starRatedColor='#DE3C4B'
                            starEmptyColor='#d3d1d1'
                        ></StarRatings>
                        {/* <TextField 
                            className="modal-review-text"
                            multiline
                            placeholder={this.props.currentReview ? this.props.currentReview.text : ''}
                            value={this.state.newText}
                            onChange={(e) => this.onTextChange(e)}
                        ></TextField> */}
                        <input 
                            className="modal-review-text modal-input"
                            multiline
                            placeholder={this.props.currentReview ? this.props.currentReview.text : ''}
                            value={this.state.newText}
                            onChange={(e) => this.onTextChange(e)}
                        ></input>
                    </div>
                    <Button color="secondary" type="submit" className="update-review-button" onClick={() => this.props.updateReview(this.props.currentReview, this.state)}>Update Review</Button>
                </div>
            </div>
        )
    }
}

export default Modal