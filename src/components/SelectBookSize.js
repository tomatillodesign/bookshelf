import React, { Component } from 'react';
import Select from 'react-select';

class SelectBookSize extends React.Component {

     constructor(props) {
          super(props);

     }


     setBookSize = (selectedOption) => {
          if(selectedOption) {
               this.props.changeSettingsBookSize(selectedOption);
          }

     }



     render() {

          const settingsBookSize = this.props.bookSize;
          console.log(settingsBookSize);

               var myBookSizesToPublish = null;
               if( settingsBookSize === 'default' ) { myBookSizesToPublish = 'Default (Medium)'; }
               if( settingsBookSize === 'large' ) { myBookSizesToPublish = 'Large'; }
               if( settingsBookSize === 'small' ) { myBookSizesToPublish = 'Small'; }

          let defaultBookSizePublish = {
               value: settingsBookSize,
               label: myBookSizesToPublish
          };
          if( settingsBookSize === null ) { defaultBookSizePublish = null; }

          const bookSizes = [
               { value: 'default', label: 'Default (Medium)' },
               { value: 'large', label: 'Large' },
               { value: 'small', label: 'Small' },
          ];

          if( defaultBookSizePublish ) {

               return (
                 <Select
                    placeholder='Select Cover Size'
                    options={bookSizes}
                    defaultValue={defaultBookSizePublish}
                    isSearchable
                    onChange={this.setBookSize}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select Cover Size'
                    options={bookSizes}
                    isSearchable
                    onChange={this.setBookSize}
                 />
               );

          }

     }

}

export default SelectBookSize;
