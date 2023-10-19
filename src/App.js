import './App.css';
import React, { Component } from 'react';
const uuid = require('uuid');

function getExtension(filename) {
  let ext = filename.split('.').pop()
  if (ext === 'jpg') {
    return 'jpeg'
  } else {
    return ext
  }
}


async function authenticate(visitorImageName) {
  const requestURL = 'https://o6cag8f4d1.execute-api.us-east-1.amazonaws.com/dev/employee?' + new URLSearchParams({
    objectKey: `${visitorImageName}.jpeg`,
  });
  return await fetch(requestURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then((data) => {
    return data;
  }).catch(error => console.error(error));
}

class App extends Component {
  state = {
    selectedFile: null,
    selectedFileEmployee: null,
    firstName: null,
    lastName: null,
    addingEmployee: false,
    fileUploadedSuccessfully: false,
    uploadResultMessage: 'Please upload an image to authenticate.',
    isAuth: false
  }

  onAddEmployee = () => {
    if (this.state.addingEmployee) {
      this.setState({addingEmployee: false});
    } else {
      this.setState({addingEmployee: true});
    }
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileChangeEmployee = event => {
    this.setState({selectedFileEmployee: event.target.files[0]});
  }

  onFileUpload = () => {
    const img_extension = getExtension(this.state.selectedFileEmployee.name);
    const fileName = this.state.firstName + "_" + this.state.lastName + "." + img_extension;
    console.log(fileName);
    fetch(`https://o6cag8f4d1.execute-api.us-east-1.amazonaws.com/dev/employee-pics-storage/${fileName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': `image/${img_extension}`
      },
      body: this.state.selectedFileEmployee
    }).catch(error => {
      console.error(error);
    })
  }

  onAuthenticate = () => {
    const visitorImageName = uuid.v4();
    const img_extension = getExtension(this.state.selectedFile.name);
    fetch(`https://o6cag8f4d1.execute-api.us-east-1.amazonaws.com/dev/visitors-pics-storage/${visitorImageName}.jpeg`, {
      method: 'PUT',
      headers: {
        'Content-Type': `image/${img_extension}`
      },
      body: this.state.selectedFile
    }).then(async () => {
      this.setState({uploadResultMessage: 'Authenticating...'});
      const response = await authenticate(visitorImageName);
      if ( response.Message === 'Success' ) {
        this.setState({isAuth: true});
        this.setState({uploadResultMessage: `Hi ${response['firstName']} ${response['lastName']}, welcome to work!`});
      } else {
        this.setState({isAuth: false});
        this.setState({uploadResultMessage: 'Authentication failed. Please try again.'});
      }
    }).catch(error => {
      this.setState({isAuth: false});
      this.setState({uploadResultMessage: 'There is an error during authentication process. Please try again.'})
      console.error(error);
    })
  }

  onFirstNameChange = e => {
    this.setState({firstName: e.target.value});
  }

  onLastNameChange = e => {
    this.setState({lastName: e.target.value});
  }

  addEmployee = () => {
    if (this.state.addingEmployee) {
      return (
        <><div>
          <br />
          <h3>Employee details:</h3>
          <label>
            First name: <input name="firstName" onChange={this.onFirstNameChange} />
          </label>
          <label>
            Last name: <input name="lastName" onChange={this.onLastNameChange} />
          </label>
        </div>
        <div>
            <input type="file" name="image" accept="image/png, image/jpeg" onChange={this.onFileChangeEmployee} />
        </div>
        <div>
          <button onClick={this.onFileUpload}>
            Add Employee
          </button>
          <button onClick={this.onAddEmployee}>
            Cancel
          </button>
        </div></>
      )
    } else {
      return (
        <div>
          <br />
          <button onClick={this.onAddEmployee}>
            Add Employee
          </button>
        </div>
      )
    }
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
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
        <h2>Employee Facial Login System</h2>
        <h3>Upload employee photo to check if he/she works for company.</h3>
        <div>
          <input type="file" name="image" accept="image/png, image/jpeg" onChange={this.onFileChange} />
          <button onClick={this.onAuthenticate}>
            Upload
          </button>
          <div className={this.state.isAuth ? 'success' : 'failure'}>{this.state.uploadResultMessage}</div>
        </div>
        {this.fileData()}
        {this.addEmployee()}
      </div>
    )
  }
}

export default App;