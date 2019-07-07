import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <>
        <h1>Hello World</h1>
      </>
    );
  }
}

export default App;
