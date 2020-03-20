import React, { Component } from 'react';
import Select from 'react-select';
import Creatable, { makeCreatableSelect } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

class SelectGenre extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
            };
     }

     handleCreateLabel = (inputValue: any, actionMeta: any) => {
          console.log("handleCreateLabel");
          return 'Create new genre: "' + inputValue + '"';
     }


     render() {

          const genreTypes = this.props.genres;
          const defaultGenreTypeRaw = this.props.defaultGenre;
          let genreTypesToSelect = [];
          genreTypes.forEach(value =>
               genreTypesToSelect.push({ value: value, label: value })
          );

          if( defaultGenreTypeRaw !== null ) {

               const defaultGenreTypeSelect = { value: defaultGenreTypeRaw, label: defaultGenreTypeRaw }

               return (
                 <CreatableSelect
                    placeholder='Genre'
                    options={genreTypesToSelect}
                    defaultValue={defaultGenreTypeSelect}
                    isClearable
                    isSearchable
                    formatCreateLabel={this.handleCreateLabel}
                    onChange={this.props.setGenre}
                 />
               );

          } else {

               return (
                 <CreatableSelect
                      placeholder='Genre'
                      options={genreTypesToSelect}
                    isClearable
                    isSearchable
                    value={null}
                    formatCreateLabel={this.handleCreateLabel}
                    onChange={this.props.setGenre}
                 />
               );

          }

     }

}

export default SelectGenre;
