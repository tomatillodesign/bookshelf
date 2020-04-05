import React, { Component } from 'react';
import Select from 'react-select';

class SelectThemeFont extends React.Component {

     constructor(props) {
          super(props);

     }


     setFont = (selectedOption) => {
          if(selectedOption) {
               this.props.changeSettingsFont(selectedOption);
          }

     }



     render() {

          const settingsColor = this.props.settingsFont;
          console.log(settingsColor);

               var myColorToPublish = null;
               if( settingsColor === 'default' ) { myColorToPublish = 'Default'; }
               if( settingsColor === 'handwritten' ) { myColorToPublish = 'Handwritten'; }
               if( settingsColor === 'typewriter' ) { myColorToPublish = 'Typewriter'; }
               if( settingsColor === 'sans' ) { myColorToPublish = 'Sans Serif'; }
               if( settingsColor === 'serif' ) { myColorToPublish = 'Serif'; }

          let defaultColorPublish = {
               value: settingsColor,
               label: myColorToPublish
          };
          if( settingsColor === null ) { defaultColorPublish = null; }

          const colorOptions = [
               { value: 'default', label: 'Default' },
               { value: 'handwritten', label: 'Handwritten' },
               { value: 'typewriter', label: 'Typewriter' },
               { value: 'sans', label: 'Sans Serif' },
               { value: 'serif', label: 'Serif' },
          ];

          if( defaultColorPublish ) {

               return (
                 <Select
                    placeholder='Select Font'
                    options={colorOptions}
                    defaultValue={defaultColorPublish}
                    isSearchable
                    onChange={this.setFont}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select Font'
                    options={colorOptions}
                    isSearchable
                    onChange={this.setFont}
                 />
               );

          }

     }

}

export default SelectThemeFont;
