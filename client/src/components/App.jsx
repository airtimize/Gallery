import React from 'react';
import axios from 'axios';
import Gallery from './Gallery';
import Carousel from './Carousel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      view: 'gallery',
      carouselStart: 1,
    };

    this.getData = this.getData.bind(this);
    this.renderView = this.renderView.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.imageHoverHandler = this.imageHoverHandler.bind(this);
    this.imageUnHoverHandler = this.imageUnHoverHandler.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const listing = window.location.href.split('/')[4];
    axios.get(`/api/${listing}/images`)
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  imageClickHandler(imageID) {
    this.setState({ carouselStart: imageID });
    this.renderView('carousel');
  }

  imageHoverHandler(imageID) {
    const { view, images } = this.state;
    if (view === 'gallery') {
      for (let i = 0; i < images.length; i++) {
        if (images[i].ImageID !== imageID) {
          images[i].hoverClass = 'gallery-image-hover';
        }
      }
      this.setState({ images });
    }
  }

  imageUnHoverHandler() {
    const { view, images } = this.state;
    if (view === 'gallery') {
      for (let i = 0; i < images.length; i++) {
        images[i].hoverClass = '';
      }
    }
    this.setState({ images });
  }

  renderView(option) {
    this.setState({ view: option });
  }

  render() {
    const { images, view, carouselStart } = this.state;
    switch (view) {
      case 'gallery':
        return (
          <>
            <div className="gallery-container-1">
              <Gallery imageClickHandler={this.imageClickHandler} imageHoverHandler={this.imageHoverHandler} imageUnHoverHandler={this.imageUnHoverHandler} id="gallery-big-image" images={images.slice(0, 1)} />
              <div className="gallery-container-2">
                <Gallery imageClickHandler={this.imageClickHandler} imageHoverHandler={this.imageHoverHandler} imageUnHoverHandler={this.imageUnHoverHandler} images={images.slice(1)} />
              </div>
            </div>
          </>
        );
      case 'carousel':
        for (let i = 0; i < images.length; i++) {
          if (images[i].ImageID === carouselStart) {
            var startID = i;
          }
        }
        const imagesStartingAtClicked = images.slice(startID).concat(images.slice(0,startID));
        return (
          <Carousel imageClickHandler={this.imageClickHandler} renderView={this.renderView} images={imagesStartingAtClicked} />
        );
      default:
        return null;
    }
  }
}

export default App;
