import React from 'react';
import ExampleCarouselImage from './ExampleCarouselImage.js';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import bku1 from './CarouselImage/bku1.png'

function UncontrolledCarousel({src1, src2, src3}) {
  
    return (
      <Carousel>
        <Carousel.Item>
          <ExampleCarouselImage src={src1} />
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage src={src2} />
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage src={src3} />
        </Carousel.Item>
      </Carousel>
    );
  }

  export default UncontrolledCarousel