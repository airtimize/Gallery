import React from 'react';
import axios from 'axios';
import Gallery from './Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }


  getData() {
    //const listing = window.location.href.split('/')[4];
    axios.get('/api/1/images')
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const { images } = this.state;
    return (
      <>
        <div className="container-1">
          <Gallery id="big-image" images={images.slice(0, 1)} />
          <div className="container-2">
            <Gallery images={images.slice(1)} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
