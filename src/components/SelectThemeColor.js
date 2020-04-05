import React, { Component } from 'react';
import Select from 'react-select';

class SelectThemeColor extends React.Component {

     constructor(props) {
          super(props);

     }


     setColor = (selectedOption) => {
          if(selectedOption) {
               this.props.changeSettingsColor(selectedOption);
          }

     }



     render() {

          const settingsColor = this.props.settingsColor;
          console.log(settingsColor);

               var myColorToPublish = null;
               if( settingsColor === 'default' ) { myColorToPublish = 'Default (Dark Blue)'; }
               if( settingsColor === 'gray' ) { myColorToPublish = 'Gray'; }
               if( settingsColor === 'green' ) { myColorToPublish = 'Green'; }
               if( settingsColor === 'orange' ) { myColorToPublish = 'Orange'; }
               if( settingsColor === 'purple' ) { myColorToPublish = 'Purple'; }

          let defaultColorPublish = {
               value: settingsColor,
               label: myColorToPublish
          };
          if( settingsColor === null ) { defaultColorPublish = null; }

          const colorOptions = [
               { value: 'default', label: 'Default (Dark Blue)' },
               { value: 'gray', label: 'Gray' },
               { value: 'green', label: 'Green' },
               { value: 'orange', label: 'Orange' },
               { value: 'purple', label: 'Purple' },
          ];

          if( defaultColorPublish ) {

               return (
                 <Select
                    placeholder='Select Color Theme'
                    options={colorOptions}
                    defaultValue={defaultColorPublish}
                    isSearchable
                    onChange={this.setColor}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select Color Theme'
                    options={colorOptions}
                    isSearchable
                    onChange={this.setColor}
                 />
               );

          }

     }

}

export default SelectThemeColor;
