import React from 'react'
import { connect } from 'react-redux';
import { saveRestauraunt } from '../../actions/index'
import { removeRestauraunt } from '../../actions/index'

// const mapStateToProps = state => {
//     return { savedRestauraunts: state.savedRestauraunts };
//   };

function mapDispatchToProps(dispatch) {
    return {
      removeRestauraunt: restauraunt => dispatch(removeRestauraunt(restauraunt))
    };
}


class Profile extends React.Component {

    state = {
        restauraunts: []
    }

    componentDidMount() {
        this.setState({
            restauraunts: this.props.savedRestauraunts
        })
    }

    removeRestauraunt = (restauraunt) => {
        this.props.removeRestauraunt({ 
            restauraunt: restauraunt,
        });
        this.setState({
            restauraunts: this.props.savedRestauraunts
        })
    }

    render() {
        return(
            <>
                <div>profile</div>
                <ul>
                    {this.state.restauraunts.map(el => (
                        <li key={el.restauraunt.id}>
                            <p>{el.restauraunt.name}</p>
                            <button onClick={() => this.removeRestauraunt(el.restauraunt)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(Profile)