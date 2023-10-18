import './App.css';
import React, { Component } from 'react';

function getExtension(filename) {
  return filename.split('.').pop()
}

class App extends Component {
  state = {
    selectedFile: null,
    firstName: null,
    lastName: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const fileName = this.state.firstName + "_" + this.state.lastName + "." + getExtension(this.state.selectedFile.name);
    fetch(`https://o6cag8f4d1.execute-api.us-east-1.amazonaws.com/dev/employee-pics-storage/${fileName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: this.state.selectedFile
    }).catch(error => {
      //setUploadResultMessage('There is an error during authentication process. Please try again.')
      console.error(error);
    })
  }
/*  {
    const formData = new FormData();
    const fileName = this.state.firstName + "_" + this.state.lastName + "." + getExtension(this.state.selectedFile.name);

    formData.append(
      "demo file",
      this.state.selectedFile,
    )
    //call api
    axios.post("https://ycnitaxs3m.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then(() => {
      this.setState({selectedFile: null});
      this.setState({fileUploadedSuccessfully: true});
    })
  }
*/

  onFirstNameChange = e => {
    this.setState({firstName: e.target.value});
  }

  onLastNameChange = e => {
    this.setState({lastName: e.target.value});
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>Last Modified: {" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      )
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your file has been successfully uploaded</h4>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file and then press the Upload button</h4>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='container'>
        <h2>File Upload System</h2>
        <h3>File Upload with React and a Serverless API!</h3>
        <div>
          <label>
            First name: <input name="firstName" onChange={this.onFirstNameChange}/>
          </label>
          <label>
            Last name: <input name="lastName" onChange={this.onLastNameChange}/>
          </label>
        </div>
        <div>
          <input type="file" name="image" accept="image/jpeg" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}

export default App;