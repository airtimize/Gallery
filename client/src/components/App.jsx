import React from 'react';
import axios from 'axios';
import Gallery from './Gallery'

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
    return (
      <>
        <Gallery images={this.state.images}/>
      </>
    );
  }
}

export default App;
