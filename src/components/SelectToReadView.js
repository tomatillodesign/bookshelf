import React, { Component } from 'react';
import Select from 'react-select';

class SelectToReadView extends React.Component {

     constructor(props) {
          super(props);

     }


     setView = (selectedOption) => {
          if(selectedOption) {
               this.props.changeToReadView(selectedOption);
          }

     }



     render() {

          const defaultView = this.props.defaultView;
          console.log(defaultView);

               var myViewToPublish = null;
               if( defaultView === 'date' ) { myViewToPublish = 'Date (Recently Added)'; }
               if( defaultView === 'alphabetical' ) { myViewToPublish = 'Alphabetical'; }

          let defaultViewPublish = {
               value: defaultView,
               label: myViewToPublish
          };
          if( defaultView === null ) { defaultViewPublish = null; }
          //console.log(defaultView);

          const ratingOptions = [
               { value: 'alphabetical', label: 'Alphabetical' },
               { value: 'date', label: 'Date (Recently Added)' },
          ];

          if( defaultView ) {

               return (
                 <Select
                    placeholder='Alphabetical'
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
                    placeholder='Alphabetical'
                    options={ratingOptions}
                    isClearable
                    isSearchable
                    onChange={this.setView}
                 />
               );

          }

     }

}

export default SelectToReadView;
