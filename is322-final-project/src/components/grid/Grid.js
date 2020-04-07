import React from 'react'

import RestaurauntCard from './RestaurauntCard'
import { Button } from '@material-ui/core';
import Form from '../shared/Form'
import SearchIcon from '@material-ui/icons/Search';
import LoadingScreen from '../shared/LoadingScreen'
import '../../styles/grid.css'
import FilterBar from './FilterBar'

class Grid extends React.Component {
    state = {
        restauraunts: [],
        allRestauraunts: [],
        limit: 0,
        showForm: '',
        loading: false,
        sortValue: '',
        showFilters: false,
        priceFilters: []
    }

    onLoadMore = () => {
        this.setState({
            limit: this.state.limit + 5
        });
    }

    closeForm = () => {
        this.setState({
          showForm: false
        })
    }

    onShowFilters = () => {
        if (!this.state.showFilters) {
            this.setState({
                showFilters: true,
            })
        } else {
            this.setState({
                showFilters: false,
            })
        }
    }

    onSortValueChange = (sortValue) => {
        this.setState({
            sortValue: sortValue
        })
        this.sortRestauraunts(sortValue)
      }

      priceFilters = []
    onFilterValueChange = (filterValue) => {
        let restauraunts = this.state.allRestauraunts
        // console.log('this.state.allRestauraunts: ', this.state.allRestauraunts)        
        // console.log('this.state.restauraunts: ', this.state.restauraunts)        

        if (!this.state.priceFilters.includes(filterValue)) {
            this.setState({
                priceFilters: filterValue
            })
        }
        if (!this.priceFilters.includes(filterValue)) {
            this.priceFilters.push(filterValue)
        } else {
            this.priceFilters = this.priceFilters.filter(e => e !== filterValue)
        }

        let filteredData = [];
        if (this.priceFilters.includes("$") && this.priceFilters.length === 1) {
            let lowRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$')
                lowRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        }
        if (this.priceFilters.includes("$$") && this.priceFilters.length === 1) {
            let mediumRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$')
            mediumRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        }
        if (this.priceFilters.includes("$$$") && this.priceFilters.length === 1) {
            let highRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$$')
                highRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        }

        if (this.priceFilters.includes("$$") && this.priceFilters.includes("$") && this.priceFilters.length === 2) {
            let lowRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$')
                lowRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$')
                mediumRestauraunts.forEach(res => {
                    filteredData.push(res)
                })
        } 
        if (this.priceFilters.includes("$$$") && this.priceFilters.includes("$$") && this.priceFilters.length === 2) {
            let highRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$$')
                highRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$')
                mediumRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        } 
        if (this.priceFilters.includes("$$$") && this.priceFilters.includes("$") && this.priceFilters.length === 2) {
            let lowRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$')
                lowRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$')
                mediumRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        } 
        if (this.priceFilters.length === 3 ) {
            let lowRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$')
                lowRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
            let mediumRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$')
                mediumRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
            let highRestauraunts = restauraunts.filter(restauraunt => restauraunt.price === '$$$')
                highRestauraunts.forEach(res => {
                    filteredData.push(res)
            })
        }
        
        if (this.priceFilters.length === 0) {
            filteredData = restauraunts
        }

        this.setState({
            restauraunts: filteredData
        })
        // return filteredData
      }

    sortRestauraunts(sortValue) {
        let restauraunts = this.state.restauraunts

        // let { sortValue } = this.state;
        let sortedRestauraunts;
        
        if (!!sortValue) {
            if (sortValue === 'highest') {
                sortedRestauraunts = restauraunts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                return sortedRestauraunts
            } 
            if (sortValue === 'lowest') {
                sortedRestauraunts = restauraunts.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                return sortedRestauraunts
            } 
        }
        if (!!sortValue) {
            if (sortValue === 'most-reviews') {
                sortedRestauraunts = restauraunts.sort((a, b) => parseFloat(b.review_count) - parseFloat(a.review_count));
                return sortedRestauraunts
            } 
            if (sortValue === 'least-reviews') {
                sortedRestauraunts = restauraunts.sort((a, b) => parseFloat(a.review_count) - parseFloat(b.review_count));
                return sortedRestauraunts
            } 
        }

        else {
            sortedRestauraunts = restauraunts;
            return sortedRestauraunts
        }


        this.setState({
            restauraunts: sortedRestauraunts
        })

        // return sortedRestauraunts
    }
    
    componentDidMount() {
        this.setState({
            restauraunts: this.props.restauraunts,
            allRestauraunts: this.props.restauraunts,
            limit: 10,
            showForm: false,
            loading: this.props.loading
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.restauraunts !== this.props.restauraunts) {
            this.setState({
                restauraunts: this.props.restauraunts,
                allRestauraunts: this.props.restauraunts
            })
        }
      } 

    render() {
        const buttonText = this.state.showFilters ? "Hide Filters" : "Show Filters"
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
                    savedRestauraunts={this.props.savedRestauraunts}
                    onSaveNewRestauraunt={this.props.onSaveRestauraunt}
                >
                </RestaurauntCard>
            )
            })        
        return(
            <div className="grid-wrapper">
            {this.state.showForm ? <Form closeForm={this.closeForm} onSubmit={this.props.onSearchSubmit}></Form> : <SearchIcon className="circle" onClick={() => this.setState({ showForm: true})}></SearchIcon>}
                <h1 className="grid-title">Restaurants in {this.props.searchInput}</h1>
                <Button onClick={this.onShowFilters} className="show-filters-button">{buttonText}</Button>
                {this.state.showFilters ? 
                <FilterBar onSortValueChange={this.onSortValueChange} onFilterValueChange={this.onFilterValueChange}></FilterBar>
                : ''
                }
                {!this.state.loading ? 
                <div className="restauraunts-wrapper">
                    {trendingGifs}
                </div>
                : <LoadingScreen></LoadingScreen>
                }
                
                <Button onClick={this.onLoadMore} color="secondary" className="load-more-button">load more</Button>
            </div>
        )
    }
}

export default Grid