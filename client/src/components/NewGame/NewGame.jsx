import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import RequireAuth from './../../HOC/RequireAuth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../redux/actions/index';

//github.com/jpuri/react-draft-wysiwyg
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';
import { stateToHTML } from 'draft-js-export-html';


class NewGame extends Component {
    constructor(props){
      super(props);

      this.state = {
        title: '',
        description: '',
        status: '',
        genre: '',
        steam: '',
        appleappstore: '',
        googleplaystore: '',
        amazonappstore: '',
        trailer: '',
        tags: [],
        coverImageId: '',
        screenshotImageIds: [],

        editorState: EditorState.createEmpty(),

        selectedCoverImageFile: null,

        selectedScreenShotImagesFiles: null
      }
    }

    submitForm = () => {

      const {title, description, status, genre, steam,
      appleappstore, googleplaystore, amazonappstore, trailer, tags, coverImageId, screenshotImageIds} = this.state;
      const { editorState } = this.state;
      const longDescription = stateToHTML(editorState.getCurrentContent())

      console.log(this.state);
      console.log(longDescription);

      axios.post('/api/games/new', {
        title: title,
        description: description,
        longDescription: longDescription,
        status: status,
        genre: genre,
        steam: steam,
        appleappstore: appleappstore,
        googleplaystore: googleplaystore,
        amazonappstore: amazonappstore,
        trailer: trailer,
        tags: tags,
        coverImageId: coverImageId,
        screenshotImageIds: screenshotImageIds
      })
      .then((response) => {
        console.log(response);
        // TODO: Show message
        if(response.data.success) {
          this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
        }
        if(!response.data.success) {
          this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
        }
      })
      .catch( (error) => {
        console.error(error);
      });
    }

    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

    handleInputChange = (event) => {
      event.preventDefault();
      const {name, value} = event.target;
      switch(name) {
        case 'title':
          this.setState({title: value});
          break;
        case 'description':
          this.setState({description: value});
          break;
        case 'status':
          this.setState({status: value});
          break;
        case 'genre':
          this.setState({genre: value});
          break;
        case 'steam':
          this.setState({steam: value});
          break;
        case 'appleappstore':
          this.setState({appleappstore: value});
          break;
        case 'googleplaystore':
          this.setState({googleplaystore: value});
          break;
        case 'amazonappstore':
          this.setState({amazonappstore: value});
          break;
        case 'trailer':
          this.setState({trailer: value});
          break;
        case 'tags':
          var tagsArray = value.split(',');
          this.setState({tags: tagsArray});
          break;
        default:
          break;
      }
    }

    coverImageSelectHandlerInputChange = (event) => {
      this.setState({
        selectedCoverImageFile: event.target.files[0]
      })
    }

    screenShotImagesSelectHandlerInputChange = (event) => {
      this.setState({
        selectedScreenShotImagesFiles: event.target.files
      });
    }

    screenShotImagesUploadHandler = () => {
      if(!this.state.selectedScreenShotImagesFiles) {
        return;
      }

      const fd = new FormData();
      console.log(this.state.selectedScreenShotImagesFiles.length);

      for (let i in this.state.selectedScreenShotImagesFiles) {
        let file = this.state.selectedScreenShotImagesFiles[i];
        fd.append('screenshot_images', file, file.name)
        console.log('Append File');
      }

      
      console.log("UPLOAD SCREENSHOT IMAGES FILES");
      console.log(fd);
      console.log(this.state);

      axios.post('/api/games/new/upload-screenshot-images', fd, {
        onUploadProgress: (ProgressEvent) => {
          // upload UI to show upload percentage
          console.log('Upload progress: ' + Math.round(ProgressEvent.loaded/ProgressEvent.total *100 ) + '%')
        }
      })
      .then((response) => {
        console.log(response);

        if(response.data.success) {
          this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
          this.setState({screenshotImageIds: response.data.payload.screenshotImageIds});
        }

      })
      .catch((response) => {
        console.error(response);
      });

    }

    coverImageUploadHandler = () => {
      if(!this.state.selectedCoverImageFile) {
        return;
      }

      const fd = new FormData();
      fd.append('cover_image', this.state.selectedCoverImageFile, this.state.selectedCoverImageFile.name)
      
      console.log("UPLOAD COVER IMAGE FILE");
      console.log(fd);
      console.log(this.state);
      debugger;

      axios.post('/api/games/new/upload-cover-image', fd, {
        onUploadProgress: (ProgressEvent) => {
          // upload UI to show upload percentage
          console.log('Upload progress: ' + Math.round(ProgressEvent.loaded/ProgressEvent.total *100 ) + '%')
        }
      })
      .then((response) => {
        console.log(response);

        if(response.data.success) {
          this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
          this.setState({coverImageId: response.data.payload.coverImageId});
        }

      })
      .catch((response) => {
        console.error(response);
      });
    }

    render() {
      return (
        <div className="App">
          <div className="login-form">
            <form>
              <h2>Create Game</h2>
              <div className="form-group">
                <input placeholder="Title" className="form-control" type="text" name="title"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input placeholder="Short Description" className="form-control" type="text" name="description"
                onChange={this.handleInputChange}/>
              </div>

              <Editor
                editorState={this.state.editorState}
                placeholder="Description: This will make up the content of your game page"
                toolbarClassName="rr-toolbar"
                wrapperClassName="rr-wrapper"
                editorClassName="rr-editor"
                toolbar={{
                  options: [
                    'inline', 'list', 'textAlign', 
                    'link', 'remove', 'history'
                  ],
                  inline: { 
                    inDropdown: true,
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                  },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  // remove: { className: 'rwd-dropdown-wrapper'},
                  history: { inDropdown: true },
                }}
                onEditorStateChange={this.onEditorStateChange}
              />

              <div className="form-group">
                <input placeholder="Status" className="form-control" type="text" name="status"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input placeholder="Genre" className="form-control" type="text" name="genre"
                onChange={this.handleInputChange}/>
              </div>
              <hr/>
              <h3>Download Link</h3>
              <div className="form-group">
                <input placeholder="Download Link" className="form-control" type="text" name="download"
                onChange={this.handleInputChange}/>
              </div>
              <hr/>

              <h3>Cover Image</h3>
              <div className="form-group">
                <input 
                  style={{display: 'none'}} 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  onChange={this.coverImageSelectHandlerInputChange}
                  ref={coverImageInput => this.coverImageInput = coverImageInput}
                />
                <Button variant="primary" style={{width: '200px'}} onClick={() => this.coverImageInput.click()}>
                  Select File
                </Button>
                <Button className="float-right" variant="success" onClick={this.coverImageUploadHandler}>
                  <i className="fas fa-cloud-upload-alt" style={{marginRight: '10px'}}></i>
                  Upload
                </Button>
              </div>

              <h3>Screen Shots</h3>
              <div className="form-group">
                <input 
                  style={{display: 'none'}} 
                  type="file"
                  multiple
                  accept="image/png, image/jpeg" 
                  onChange={this.screenShotImagesSelectHandlerInputChange}
                  ref={screenImageInput => this.screenImageInput = screenImageInput}
                />
                <Button variant="primary" style={{width: '200px'}} onClick={() => this.screenImageInput.click()}>
                  Select Screenshots
                </Button>
                <Button className="float-right" variant="success" onClick={this.screenShotImagesUploadHandler}>
                  <i className="fas fa-cloud-upload-alt" style={{marginRight: '10px'}}></i>
                  Upload
                </Button>
              </div>

              <h3>Gameplay Video or trailer</h3>
              <div className="form-group">
                <input placeholder="https://www.youtube.com/watch?v=JSRtYpNRoN" className="form-control" type="text" name="trailer"
                onChange={this.handleInputChange}/>
              </div>

              <h3>Store Links</h3>
              <div className="form-group">
                <input placeholder="Steam" className="form-control" type="text" name="steam"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input placeholder="Apple App Store" className="form-control" type="text" name="appleappstore"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input placeholder="Google Play Store" className="form-control" type="text" name="googleplaystore"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input placeholder="Amazon App Store" className="form-control" type="text" name="amazonappstore"
                onChange={this.handleInputChange}/>
              </div>
              <hr/>

              <h3>Tags</h3>
              <div className="form-group">
                <input placeholder="tag1,tag2,tag3...etc" className="form-control" type="text" name="tags"
                onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <Button variant="success" block onClick={this.submitForm}>CREATE</Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}
  
function mapStateToProps(state) {
  return {
  };
}
  
function matchDispatchToProps(dispatch) {
  // Map now I can dispatch action like this.props.actionName(payload)
  return bindActionCreators({
    addFlashMessage: addFlashMessage
  }, dispatch)
}

export default RequireAuth(connect(mapStateToProps, matchDispatchToProps)(NewGame));