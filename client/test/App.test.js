import React from 'react';
import App from '../src/components/App';
import Gallery from '../src/components/Gallery';
import Image from '../src/components/Image';

describe('<App /> rendering', () => {
  let wrapper = shallow(<App />);

  it('should render two <Gallery /> components', () => {
    expect(wrapper.find(Gallery)).toHaveLength(2);
  });

  it('should have an inital state where view equals gallery', () => {
    expect(wrapper.state('view')).toEqual('gallery');
  });


});

describe('Gallery rendering', () => {
  let wrapper, images;

  beforeEach(() => {
    images = [{
      ImageID: 1,
      ImageUrl: 'http://www.google.com',
      Caption: 'e pluribus unum',
      Verified: 1,
      hoverClass: '',
    }, {
      ImageID: 2,
      ImageUrl: 'http://www.google.com',
      Caption: 'e pluribus unum',
      Verified: 1,
      hoverClass: '',
    },{
      ImageID: 3,
      ImageUrl: 'http://www.google.com',
      Caption: 'e pluribus unum',
      Verified: 1,
      hoverClass: '',
    },{
      ImageID: 4,
      ImageUrl: 'http://www.google.com',
      Caption: 'e pluribus unum',
      Verified: 1,
      hoverClass: '',
    },{
      ImageID: 5,
      ImageUrl: 'http://www.google.com',
      Caption: 'e pluribus unum',
      Verified: 1,
      hoverClass: '',
    }];
    wrapper = shallow(<Gallery images={images}/>)
  })

  it('should render a max of 4 Image components', () => {
    expect(wrapper.find(Image)).toHaveLength(4);
  })


})
