import React from 'react'

import '../../styles/filterBar.css'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class FilterBar extends React.Component {

    state = {
        sortValue: '',
        showFilters: false,
        prices: [
            {id: 1, value: "$", isChecked: false},
            {id: 2, value: "$$", isChecked: false},
            {id: 3, value: "$$$", isChecked: false},
          ]
    }

    handleChange = (event) => {
        console.log('event.target.value: ', event.target.value)
        this.setState({
            sortValue: event.target.value
        })
        this.props.onSortValueChange(event.target.value)
    };

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
    handleCheckChieldElement = (event) => {
        let prices = this.state.prices
        prices.forEach(price => {
           if (price.value === event.target.value)
              price.isChecked = event.target.checked
        })
        this.setState({prices: prices})
        this.props.onFilterValueChange(event.target.value)
      }

    render() {
        return(
            <div className="filterbar-wrapper">
                <React.Fragment>
                <FormGroup className="checkboxes">
                <div className="left-side-wrapper">
                <InputLabel id="demo-simple-select-label">Price</InputLabel>
                <div className="checkboxWrapper">
                    {this.state.prices.map( (checkbox) => {   
                        return (
                        <FormControlLabel key={checkbox.id}
                            control={<Checkbox 
                            checked={checkbox.isChecked} 
                            value={checkbox.value} 
                            onClick={this.handleCheckChieldElement}  
                            name={checkbox.value} 
                            className="checkbox"
                            />}
                        label={checkbox.value}
                        color="primary"
                        />
                        )   
                    })}
                </div>
                </div>
                </FormGroup>
                <div className="right-side-wrapper">
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    {/* <div className="radioButtonsWrapper" value={this.state.sortValue} onChange={this.handleChange}> */}
                        <RadioGroup aria-label="reviews" name="reviews1" value={this.state.sortValue} onChange={this.handleChange} className="radioButtonsWrapper">
                        {/* <InputLabel id="demo-simple-select-label">Sort By</InputLabel> */}
                            <FormControlLabel value="highest" control={<Radio className="radio" />} label="Highest Rated" />
                            <FormControlLabel value="lowest" control={<Radio className="radio" />} label="Lowest Rated" />
                            <FormControlLabel value="most-reviews" control={<Radio className="radio" />} label="Most Reviews" />
                            <FormControlLabel value="least-reviews" control={<Radio className="radio" />} label="Least Reviews" />
                        </RadioGroup>
                    {/* </div> */}
                </div>
                
                </React.Fragment>
            </div>
        )
    }
}

export default FilterBar