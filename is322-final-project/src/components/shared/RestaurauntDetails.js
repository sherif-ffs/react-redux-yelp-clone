import React from 'react'

import LoadingScreen from './LoadingScreen'
import SlideShow from './SlideShow'
import axios from 'axios';

class RestaurauntDetails extends React.Component {

    state = {
        restauraunt: {},
        reviews: [],
        errorMessage: '',
        photos: []
    }
    componentDidMount() {
        this.callApi();
    }

    callApi() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}`, {
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            })
            .then((res) => {
            console.log('res: ', res)
            this.setState({
                restauraunt: res.data
            })
            })
            .catch((err) => {
            console.log ('error')
        })
        // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.id}/reviews`, {
        //     headers: {
        //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        //     },
        //     })
        //     .then((res) => {
        //     console.log('res: ', res)
        //     this.setState({
        //         reviews: res.data.reviews
        //     })
        //     })
        //     .catch((err) => {
        //     console.log ('error')
        // })
    }
    


    render() {        
        console.log('this.props: ', this.props)
        console.log('this.state.restauraunt: ', this.state.restauraunt)
        
        return (
            this.state.restauraunt == null ?
            <div>No data can be loaded for this apartment</div>
            : (Object.keys(this.state.restauraunt).length > 0
            ? 
                <React.Fragment>
                    <h1>Welcome</h1>
                    <h1>{this.state.restauraunt.name}</h1>
                    <img src={this.state.restauraunt.image_url}></img>
                    
                </React.Fragment>
            : <LoadingScreen></LoadingScreen>)
        )
        
    }
}

export default RestaurauntDetails