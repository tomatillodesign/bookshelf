import React, { Component } from "react";
import base from '../base';
import { firebaseApp } from '../base';
import FileUploader from "react-firebase-file-uploader";

const shortid = require('shortid');

class ReplaceCover extends Component {
     constructor(props) {
    super(props);
       this.state = {
         bookCover: "",
         isUploading: false,
         progress: 0,
         bookCoverURL: "",
         isEditing: true
       };
   }


   handleChangeUsername = event =>
    this.setState({ username: event.target.value });
   handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
   handleProgress = progress => this.setState({ progress });
   handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
   };
   handleUploadSuccess = filename => {
    this.setState({ bookCover: filename, progress: 100, isUploading: false });
    firebaseApp
       .storage()
       .ref("images")
       .child(filename)
       .getDownloadURL()
       .then(url =>

            this.setState({ bookCoverURL: url },
            // Update book.coverImg in book object in Firebase
            this.props.updateCoverImg( this.props.bookObj, url )

       ));

   };

  render() {



    return (
      <div>
        <form>
          <h3>Current URL: {this.state.bookCoverURL}</h3>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.bookCoverURL && <><p>Updated cover:</p><div className="updated-cover-thumbnail"><img src={this.state.bookCoverURL} /></div></>}
          <label className="button replace-cover" style={{}}>
               Replace Cover
               <FileUploader
                     hidden
                     accept="image/*"
                     randomizeFilename
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

export default ReplaceCover;
