import React from 'react'

class Review extends React.Component {
    render() {
        return (
            <div className="review-wrapper">
                <div className="user-wrapper">
                    <img className="user-image"></img>
                    <h1 className="user-name"></h1>
                </div>
                <div className="review-content-wrapper">
                    <div className="rating-wrapper">
                        <h1>rating</h1>
                        <h3>date</h3>
                    </div>
                    <div className="content">
                        <p>text....</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Review