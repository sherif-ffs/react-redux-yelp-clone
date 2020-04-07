import React from 'react'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { savedRestauraunts: state.savedRestauraunts };
  };
  
class Profile extends React.Component {
    render() {
        return(
            <>
                <div>profile</div>
                <ul>
                    {this.props.savedRestauraunts.map(el => (
                        <li key={el.restauraunt.id}>{el.restauraunt.name}</li>
                    ))}
                </ul>
            </>
        )
    }
}

export default connect(mapStateToProps)(Profile)