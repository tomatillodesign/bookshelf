import React, { Component } from "react";
import base from '../base';
import { firebaseApp } from '../base';
import FileUploader from "react-firebase-file-uploader";

class ProfilePage extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebaseApp
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <form>
          <h3>Current URL: {this.state.avatarURL}</h3>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          <label className="button" style={{}}>
               Edit Book Cover
               <FileUploader
                     hidden
                     accept="image/*"
                     storageRef={firebaseApp.storage().ref('images')}
                     onUploadStart={this.handleUploadStart}
                     onUploadError={this.handleUploadError}
                     onUploadSuccess={this.handleUploadSuccess}
                     onProgress={this.handleProgress}
                   />
          </label>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
