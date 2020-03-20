import React, { Component } from 'react';
import Select from 'react-select';

class SelectUseTags extends React.Component {

     constructor(props) {
          super(props);

     }


     setUseTags = (selectedOption) => {
          if(selectedOption) {
               this.props.changeSettingsUseTags(selectedOption);
          }

     }



     render() {

          const settingsUseTags = this.props.useTags;
          console.log(settingsUseTags);

               var myTagSettingsToPublish = null;
               if( settingsUseTags === true ) { myTagSettingsToPublish = 'Yes'; }
               if( settingsUseTags === false ) { myTagSettingsToPublish = 'No'; }

          let defaultUseTags = {
               value: settingsUseTags,
               label: myTagSettingsToPublish
          };
          if( settingsUseTags === null ) {
               defaultUseTags = null;
          }

          const useTags = [
               { value: true, label: 'Yes' },
               { value: false, label: 'No' },
          ];

          if( defaultUseTags ) {

               return (
                 <Select
                    placeholder='Select One'
                    options={useTags}
                    defaultValue={defaultUseTags}
                    isSearchable
                    onChange={this.setUseTags}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select One'
                    options={useTags}
                    isSearchable
                    onChange={this.setUseTags}
                 />
               );

          }

     }

}

export default SelectUseTags;
