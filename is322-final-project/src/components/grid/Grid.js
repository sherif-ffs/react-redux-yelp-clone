import React from 'react'

import RestaurauntCard from './RestaurauntCard'
import { Button } from '@material-ui/core';

import '../../styles/grid.css'

class Grid extends React.Component {
    state = {
        restauraunts: [],
        limit: 0
    }

    onLoadMore = () => {
        this.setState({
            limit: this.state.limit + 5
        });
    }

    renderTodos(){
        return this.state.restauraunts.slice(0,this.state.limit).map((restauraunt)=>{
            return(
                <RestaurauntCard name={restauraunt.name}></RestaurauntCard>
            );
        });
    };
    
    componentDidMount() {
        this.setState({
            restauraunts: this.props.restauraunts,
            limit: 10
        })
    }
    render() {
        // let trendingGifs;
        // if (this.state.restauraunts !== undefined ) {
        let trendingGifs = this.state.restauraunts.slice(0,this.state.limit).map(restauraunt => {
            return(
                <RestaurauntCard 
                    name={restauraunt.name}
                    rating={restauraunt.rating}
                    reviewCount={restauraunt.review_count}
                    price={restauraunt.price}
                    categories={restauraunt.categories}
                    image={restauraunt.image_url}
                    id={restauraunt.id}
                    location={restauraunt.location}
                    restauraunt={restauraunt}
                >
                </RestaurauntCard>
            )
            })
        // }
        
        console.log('this.props: ', this.props)
        console.log('this.state: ', this.state)
        return(
            <div className="grid-wrapper">
                <h1 className="grid-title">Restaurants in {this.props.searchInput}</h1>
                <div className="restauraunts-wrapper">
                    {trendingGifs}
                </div>
                <Button onClick={this.onLoadMore} color="secondary" className="load-more-button">load more</Button>
            </div>
        )
    }
}

export default Grid