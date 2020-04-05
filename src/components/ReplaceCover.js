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
       .then(url => this.setState({ bookCoverURL: url }));

   };


   cancelUpload = () => {
        this.setState({ bookCoverURL: '' });
   }


   setNewCover = () => {
        console.log(this.state.bookCoverURL);
        console.log(this.props.bookObj);
        this.props.updateCoverImg(this.state.bookCoverURL, this.props.bookObj);
   }


  render() {

       console.log(this.state.bookCoverURL);
       let replaceCoverForm = null;
       if( this.state.bookCoverURL === '' ) {
            replaceCoverForm = (
                 <>
                 <label className="button replace-cover" style={{}}>
                 <form className="replace-book-cover">
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
                    </form>
           </label>
         </>);
       }

    return (
      <div>

          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.bookCoverURL &&
               <><p>Updated cover:</p><div className="updated-cover-thumbnail"><img src={this.state.bookCoverURL} /></div></>
          }
          {replaceCoverForm}
        { this.state.bookCoverURL &&
        <button className="finalize-new-cover-button" onClick={this.setNewCover}>Save New Cover</button>
          }
          { this.state.bookCoverURL &&
         <button className="cancel-new-cover" onClick={this.cancelUpload}>Cancel</button>
           }
      </div>
    );
  }
}

export default ReplaceCover;
