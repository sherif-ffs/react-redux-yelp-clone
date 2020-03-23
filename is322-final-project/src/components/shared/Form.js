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
        showModal: null
    }

    render() {
        
        return(

            <div className="form-wrapper">
                <div className="title-wrapper">
                    <h1 className="title-wrapper__title">Search Apartments</h1>
                    <CancelIcon className="title-wrapper__close" onClick={this.props.closeForm} fontSize="large"/>
                </div>
                <FormLabel component="legend" className="label">Location</FormLabel>
                <div className="input-wrapper">
                    <TextField id="outlined-basic" className="input city" label="City" variant="outlined" />
                    <TextField id="outlined-basic" className="input state" label="State" variant="outlined" inputProps={{ maxLength: 2 }} placeholder="ex: NJ"/>
                    <TextField id="outlined-basic" className="input radius" label="Radius" variant="outlined" placeholder="Miles"/>
                </div>
                <div className="pet-input-wrapper">
                <FormLabel component="legend" className="label pets-label">Pet Policy</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1">
                        <FormControlLabel value="female" control={<Radio color="primary"/>} label="No Pets"/>
                        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Pets Allowed"/>
                    </RadioGroup>
                </div>
                <FormLabel component="legend" className="label">Price</FormLabel>
                <div className="input-wrapper price-wrapper">
                    <TextField id="outlined-basic" className="input min-price" label="Min-Rent" variant="outlined" placeholder="$"/>
                    <TextField id="outlined-basic" className="input max-price" label="Max-Rent" variant="outlined" placeholder="$"/>
                </div>
                <FormLabel component="legend" className="label">Baths & Beds</FormLabel>
                <div className="input-wrapper price-wrapper">
                    <TextField id="outlined-basic" className="input beds" label="Min-Beds" variant="outlined" placeholder="1"/>
                    <TextField id="outlined-basic" className="input baths" label="Min-Baths" variant="outlined" placeholder="1"/>
                </div>
                <IconButton color="primary" className="search-button">
                    Search
                    <SearchIcon  className="search-icon"/>
                </IconButton>
            </div>
        )
    }
}

export default Form