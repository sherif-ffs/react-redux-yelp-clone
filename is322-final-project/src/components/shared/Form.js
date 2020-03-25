import React from 'react'

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import '../../styles/form.css'

class Form extends React.Component {

    state = {
        city: '',
        state: '',
        radius: 5,
        allowPets: false,
        minRent: '',
        maxRent: '',
        minBeds: '',
        minBaths: ''
    }

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
      }

    render() {
        
        return(

            <div className="form-wrapper">
                <div className="title-wrapper">
                    <h1 className="title-wrapper__title">Search Apartments</h1>
                    <CancelIcon className="title-wrapper__close" onClick={this.props.closeForm} fontSize="large"/>
                </div>
                <form>
                <FormLabel component="legend" className="label">Location *</FormLabel>
                <div className="input-wrapper">
                    <TextField 
                        id="outlined-basic" 
                        className="input city" 
                        label="City" 
                        variant="outlined" 
                        value={this.state.city}
                        onChange={(e) => this.setState({ city: e.target.value })}
                        // onChange={(e) => e.target.value !== '' ? this.setState({ city: e.target.value }) : alert('enter a city name please')}
                    />
                    <TextField 
                        id="outlined-basic" 
                        className="input state" 
                        label="State" 
                        variant="outlined" 
                        inputProps={{ maxLength: 2 }} 
                        placeholder="ex: NJ"
                        value={this.state.state}
                        onChange={(e) => this.setState({ state: e.target.value })}
                    />
                    <TextField 
                        id="outlined-basic" 
                        className="input radius" 
                        label="Radius" 
                        variant="outlined" 
                        placeholder="Miles"
                        value={this.state.radius}
                        onChange={(e) => this.setState({ radius: e.target.value })}
                    />
                </div>
                <div className="pet-input-wrapper">
                <FormLabel component="legend" className="label pets-label">Pet Policy <span className="optional-tag">(optional)</span></FormLabel>
                    <RadioGroup aria-label="gender" name="gender1">
                        <FormControlLabel 
                            value={false}
                            control={<Radio color="primary"/>} 
                            label="No Pets" 
                            checked={!this.state.allowPets}
                            onChange={() => this.setState({ allowPets: false })}
                        />
                        <FormControlLabel 
                            value={true} 
                            control={<Radio color="primary"/>} 
                            label="Pets Allowed"
                            checked={this.state.allowPets}
                            onChange={() => this.setState({ allowPets: true })}
                        />
                    </RadioGroup>
                </div>
                <FormLabel component="legend" className="label">Price <span className="optional-tag">(optional)</span></FormLabel>
                <div className="input-wrapper price-wrapper">
                    <TextField 
                        id="outlined-basic" 
                        className="input min-price" 
                        label="Min-Rent" 
                        variant="outlined" 
                        placeholder="$"
                        value={this.state.minRent}
                        onChange={(e) => this.setState({ minRent: e.target.value })}
                    />
                    <TextField 
                        id="outlined-basic" 
                        className="input max-price" 
                        label="Max-Rent" 
                        variant="outlined" 
                        placeholder="$"
                        value={this.state.maxRent}
                        onChange={(e) => this.setState({ maxRent: e.target.value })}
                    />
                </div>
                <FormLabel component="legend" className="label">Baths & Beds <span className="optional-tag">(optional)</span></FormLabel>
                <div className="input-wrapper price-wrapper">
                    <TextField 
                        id="outlined-basic" 
                        className="input beds" 
                        label="Min-Beds" 
                        variant="outlined" 
                        placeholder="1"
                        value={this.state.minBeds}
                        onChange={(e) => this.setState({ minBeds: e.target.value })}
                    />
                    <TextField 
                        id="outlined-basic" 
                        className="input baths" 
                        label="Min-Baths" 
                        variant="outlined" 
                        placeholder="1"
                        value={this.state.minBaths}
                        onChange={(e) => this.setState({ minBaths: e.target.value })}
                    />
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