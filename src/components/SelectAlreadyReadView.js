import React, { Component } from 'react';
import Select from 'react-select';

class SelectAlreadyReadView extends React.Component {

     constructor(props) {
          super(props);

     }


     setView = (selectedOption) => {
          if(selectedOption) {
               this.props.changeAlreadyReadView(selectedOption);
          }

     }



     render() {

          const defaultView = this.props.defaultView;
          console.log(defaultView);

               var myViewToPublish = null;
               if( defaultView === 'alphabetical' ) { myViewToPublish = 'Alphabetical'; }
               if( defaultView === 'rating' ) { myViewToPublish = 'Rating (High to Low)'; }
               if( defaultView === 'date' ) { myViewToPublish = 'Date (Recently Completed)'; }

          let defaultViewPublish = {
               value: defaultView,
               label: myViewToPublish
          };
          if( defaultView === null ) { defaultViewPublish = null; }
          //console.log(defaultView);

          const ratingOptions = [
               { value: 'alphabetical', label: 'Alphabetical' },
               { value: 'rating', label: 'Rating (High to Low)' },
               { value: 'date', label: 'Date (Recently Completed)' },
          ];

          if( defaultView ) {

               return (
                 <Select
                    placeholder='Rating'
                    options={ratingOptions}
                    defaultValue={defaultViewPublish}
                    isClearable
                    isSearchable
                    onChange={this.setView}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Rating'
                    options={ratingOptions}
                    isClearable
                    isSearchable
                    onChange={this.setView}
                 />
               );

          }

     }

}

export default SelectAlreadyReadView;
