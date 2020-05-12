import React from 'react'

import FormLabel from '@material-ui/core/FormLabel';
import { IconButton } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import '../../styles/form.css'

class Form extends React.Component {
        state = {
            city: ''
        }
        
    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
      }

    render() {

        return(
            <div className="form-wrapper">
                <div className="title-wrapper">
                    <h1 className="title-wrapper__title">Search Restauraunts</h1>
                    <CancelIcon className="title-wrapper__close" onClick={this.props.closeForm} fontSize="large"/>
                </div>
                <form>
                <FormLabel component="legend" className="label">Location *</FormLabel>
                <div className="input-wrapper">
                    <input 
                        id="standard-basic" 
                        className="input city input-city" 
                        label="City" 
                        variant="outlined" 
                        placeholder="Search a city"
                        color="secondary"
                        value={this.state.city}
                        onChange={(e) => this.setState({ city: e.target.value })}
                        onRequestSearch={() => this.searchTasksByTitle(this.state.searchInput)}
                    ></input>
                </div>
                <IconButton color="primary" className="search-button" onClick={this.onSearchSubmit}>
                    Search
                    <SearchIcon  className="search-icon"/>
                </IconButton>
                </form>
            </div>
        )
    }
}

export default Form