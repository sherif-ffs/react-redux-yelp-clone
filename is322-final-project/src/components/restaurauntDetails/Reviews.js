import React from 'react'

import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import ReviewForm from './ReviewForm'
import Review from './Review'

import '../../styles/reviews.css'

class Reviews extends React.Component {

    state = {
        searchInput: '',
        sortValue: '',
        userReviews: '',
    }
    componentDidMount() {
        this.setState({
            userReviews: this.props.reviews
        })
    }
    render() {
        console.log('this.props; ', this.props)
        let userReviews = this.props.reviews.map((rating) => {
            return (
                <Review
                    className="user-review"
                    date={rating.time_created}
                    rating={rating.rating}
                    text={rating.text}
                    image={rating.user.image_url}
                    name={rating.user.name}
                >
                </Review>
            )
        })
        return(
            <div className="reviews-wrapper">
                <h1 className="section-title">Recommended Reviews</h1>
                <div className="reviews-header">
                <div className="search-bar-wrapper">
                    <div className="reviews-search-icon">
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search reviews…"
                        className="search-bar"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                    <FormControl className="dropdown-wrapper">
                        <InputLabel id="demo-simple-select-label">Sort Reviews</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            color="secondary"
                            value={this.state.sortValue}
                            onChange={e => this.setState({sortValue: e.target.value})}
                        >
                        <MenuItem value="newest">Newest First</MenuItem>
                        <MenuItem value="oldest">Oldest First</MenuItem>
                        <MenuItem value="highest">Highest Rated</MenuItem>
                        <MenuItem value="lowest">Lowest Rated</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <ReviewForm></ReviewForm>
                {userReviews}
            </div>             
        )
    }
}

export default Reviews