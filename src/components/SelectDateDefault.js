import React, { Component } from 'react';
import Select from 'react-select';

class SelectUseGenres extends React.Component {

     constructor(props) {
          super(props);

     }


     setDefaultDate = (selectedOption) => {
          if(selectedOption) {
               this.props.changeDefaultDate(selectedOption);
          }

     }



     render() {

          const defaultDateSetting = this.props.defaultDateSetting;
          console.log(defaultDateSetting);

          let dateSettingToPublish = {
               value: defaultDateSetting,
               label: defaultDateSetting
          };

          const useGenres = [
               { value: 'Today', label: 'Today' },
               { value: 'No Date Set', label: 'No Date Set' },
          ];

          if( defaultDateSetting ) {

               return (
                 <Select
                    placeholder='Select One'
                    options={useGenres}
                    defaultValue={dateSettingToPublish}
                    isSearchable
                    onChange={this.setDefaultDate}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select One'
                    options={useGenres}
                    isSearchable
                    onChange={this.setDefaultDate}
                 />
               );

          }

     }

}

export default SelectUseGenres;
