import React from 'react'

import { Slide } from 'react-slideshow-image';
import '../../styles/slideShow.css'

  const SlideShow = (props) => {

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        pauseOnHover: true,
        onChange: (oldIndex, newIndex) => {
          console.log(`slide transition from ${oldIndex} to ${newIndex}`);
        }
      }
      const slideImages = props.photos
      const slides = slideImages.map((slide, index) => {
        return (
            <div className="each-slide" key={index}>
                <div style={{'backgroundImage': `url(${slide.href})`}} className="slide-image"></div>
            </div>
        )
      })
      return (
        <div className="slide-container">
          <Slide {...properties}>
            {slides}
          </Slide>
        </div>
      )
  }

export default SlideShow