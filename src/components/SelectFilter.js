import React, { Component } from 'react';
import Select from 'react-select';

class SelectFilter extends React.Component {

     constructor(props) {
          super(props);

     }


     setFilter = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               //this.props.changeAlreadyReadView(selectedOption);
          }

     }



     render() {

          // create empty variables
          let filterOptions = [];
          let placeholder = '';

          // set vars based on props //////////////////////////////////////////
          // RATING selections //////////////
          if( this.props.type === 'rating' ) {
               placeholder = 'Rating';
               filterOptions = [
                    { value: '5', label: '⭐⭐⭐⭐⭐ Life-Changing' },
                    { value: '4', label: '⭐⭐⭐⭐ Great and higher' },
                    { value: '3', label: '⭐⭐⭐ Good and higher' },
                    { value: '2', label: '⭐⭐ OK and higher' },
               ]
          }


          // CATEGORIES selections //////////////
          if( this.props.type === 'genres' ) {
               placeholder = 'Genre';
          }


          // TAGS selections //////////////
          if( this.props.type === 'tags' ) {
               placeholder = 'Tag';
          }



               return (
                 <Select
                    placeholder={placeholder}
                    options={filterOptions}
                    isClearable
                    isSearchable
                    onChange={this.setFilter}
                 />
               );

     }

}

export default SelectFilter;
