import React from 'react'

import moment from 'moment'
import '../../styles/hours.css'

class Hours extends React.Component {

    state = {
        hours: [],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }

    componentDidMount() {
        let realHours = []
        if (this.props.hours) {
            for (let i=0; i<this.props.hours[0].open.length; i++) {
                let newTime = []
                let start = (moment(this.props.hours[0].open[i].start, 'HH:mm').format('hh:mm a'));
                let end = (moment(this.props.hours[0].open[i].end, 'HH:mm').format('hh:mm a'));
                newTime.push(start)
                newTime.push(end)
                realHours.push(newTime)
            }
        }
        
        this.setState({
            hours: realHours
        })
    }
    render() {

        return(
            <div className="hours-wrapper">
                {this.state.hours 
                ?
                <ul className="hours-list">
                    {this.state.hours.map((hour, index) => (
                        <li className="hour" key={index}><span className="day">{this.state.days[index]}:</span> {this.days}{hour[0]} - {hour[1]}</li>
                    )
                    )}
                </ul>
                : <p>no hours are available for this restauraunt</p>  }
                
                
            </div>
        )
    }
}

export default Hours