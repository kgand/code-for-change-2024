import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({ uploadedFile: file });
  }

  render() {
    return (
      <div className="App">
        <form action="/loginSubmitted" method="post">
        <input
          type="file"
          id="fileInput"
          accept=".mp4, .mov"
          onChange={this.handleFileChange}
        />
        </form>

      </div>
    );
  }
}

export default Upload;