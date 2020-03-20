import React, { Component } from 'react';
import Select from 'react-select';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

const shortid = require('shortid');

class SelectTags extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
            };
     }

     handleCreateLabel = (inputValue: any, actionMeta: any) => {
          console.log("handleCreateLabel");
          return 'Create new tag: "' + inputValue + '"';
     }


     render() {

          const allTags = this.props.allTags;
          const defaultTagsRaw = this.props.defaultTags;
          let tagTypesToSelect = [];

          if( allTags !== undefined ) {

               allTags.forEach(value =>
                    tagTypesToSelect.push({ value: value, label: value })
               );
          }

          if( defaultTagsRaw !== null ) {

               const defaultTagTypeSelect = { value: defaultTagsRaw, label: defaultTagsRaw }

               return (
                 <CreatableSelect
                    isMulti
                    placeholder='Select Tags'
                    options={tagTypesToSelect}

                    isClearable
                    isSearchable
                    formatCreateLabel={this.handleCreateLabel}
                    onChange={this.props.setTag}
                 />
               );

          } else {

               return (
                 <CreatableSelect
                      placeholder='Select Tags'
                      options={tagTypesToSelect}
                      isMulti
                    isClearable
                    isSearchable
                    value={null}
                    formatCreateLabel={this.handleCreateLabel}
                    onChange={this.props.setTag}
                 />
               );

          }

     }

}

export default SelectTags;
