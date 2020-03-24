import React from 'react'

class ListingDetails extends React.Component {

    listingId = this.props.match.params.id.substring(0, 10)
    propertyId = this.props.match.params.id.substring(11, 21)

    state = {
        listing: {}
    }
    componentDidMount() {
        this.callApi();
    }

    callApi() {
        fetch(`https://realtor.p.rapidapi.com/properties/detail?listing_id=${this.listingId}&prop_status=for_rent&property_id=${this.propertyId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "fd98d4c4aamshd0b0e63a32e7ed0p1aba23jsn3975c7acf7d1"
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log('data: ', data)
            this.setState({
                listing: data.listing
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        console.log('this.state: ', this.state)
        // console.log('listingId: ', listingId.length)
        // console.log('propertyId: ', propertyId.length);
        console.log('this.props.match.params: ', this.props.match.params);

        
        return (
            Object.keys(this.state.listing).length > 0
            ? 
                <React.Fragment>
                    <h1>Welcome</h1>
                    <h1>{this.state.listing.address.city}</h1>    
                    <h1>{this.state.listing.address.state}</h1>                         
                    <h1>{this.state.listing.address.county}</h1>    
                </React.Fragment>
            : <div>loading</div>
        )
        
    }
}

export default ListingDetails