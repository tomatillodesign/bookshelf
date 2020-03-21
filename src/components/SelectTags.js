import React, { Component } from 'react';
import Select from 'react-select';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

const shortid = require('shortid');

class SelectTags extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               tags: this.props.defaultTags,
               madeChange: false,
            };
     }

     handleCreateLabel = (inputValue: any, actionMeta: any) => {
          console.log("handleCreateLabel");
          return 'Create new tag: "' + inputValue + '"';
     }

     addTagToState = (selectedOption) => {
          console.log(selectedOption);
          this.setState({ tags: selectedOption, madeChange: true });

     }


     handleTagsSubmit = (event) => {
          event.preventDefault();
          console.log("HANDLE SUBMIT TAGS");
          console.log(this.state.tags);

          const tagsObj = this.state.tags;
          let tagsArray = [];
          if( tagsObj.length > 0 && tagsObj !== null ) {
               tagsArray = tagsObj.map(x => x.value);
          }

          console.log(tagsArray);
          this.props.addNewTag(tagsArray);
          this.props.setBookTags(tagsArray, this.props.book);
     }

     render() {

          const allTags = this.props.allTags;
          const currentTags = this.state.tags;
          const defaultTagsRaw = this.props.defaultTags;
          console.log(defaultTagsRaw);
          let tagTypesToSelect = [];

          if( allTags !== undefined ) {

                    // allTags.forEach(value =>
                    //      tagTypesToSelect.push({ value: value, label: value })
                    // );

               allTags.map((value, key) =>
                    tagTypesToSelect.push({ value: value, label: value })
               );
          }

          if( defaultTagsRaw !== undefined ) {

               console.log(defaultTagsRaw);
               let updatedDefaults = [];
               for( let i = 0; i < defaultTagsRaw.length; i++ ) {
                    updatedDefaults.push({ value: defaultTagsRaw[i], label: defaultTagsRaw[i] })
               }

               const defaultTagTypeSelect = defaultTagsRaw;

               return (
                    <form id="select-tags-form" onSubmit={this.handleTagsSubmit} >
                      <CreatableSelect
                         isMulti
                         placeholder='Select Tags'
                         defaultValue={updatedDefaults}
                         options={tagTypesToSelect}
                         isClearable
                         isSearchable
                         formatCreateLabel={this.handleCreateLabel}
                         onChange={this.addTagToState}
                      />
                      {this.state.madeChange === true &&
                           <button className="add-tags">Update Tags</button>
                      }
                    </form>
               );

          } else {

               return (
                    <form id="select-tags-form" onSubmit={this.handleTagsSubmit} >
                      <CreatableSelect
                         isMulti
                         placeholder='Select Tags'
                         options={tagTypesToSelect}
                         isClearable
                         isSearchable
                         formatCreateLabel={this.handleCreateLabel}
                         onChange={this.addTagToState}
                      />
                      <button className="add-tags">Update Tags</button>
                    </form>
               );

          }

     }

}

export default SelectTags;
