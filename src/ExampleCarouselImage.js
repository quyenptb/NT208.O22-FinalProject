import React from 'react';
import agu from './CarouselImage/agu1.jpg';
const ExampleCarouselImage = ({ src }) => {
  {console.log(src, typeof(src))}
  return (
    <img
      className="d-block w-100"
      src={src}
      alt='Slide'
    />
  );
};

export default ExampleCarouselImage;