import React, { Component } from 'react';
import Select from 'react-select';

class SelectFilter extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               selectRating: this.props.currentSelection
          }
     }


     selectRating = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setRatingFilter(selectedOption.value);
               this.setState({ selectRating: selectedOption.value });
          } else {
               this.props.clearRatingFilter();
          }

     }


     selectAuthor = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setAuthorFilter(selectedOption.value);
               this.setState({ selectRating: selectedOption.value });
          } else {
               this.props.clearAuthorFilter();
          }

     }


     selectGenre = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setGenreFilter(selectedOption.value);
          } else {
               this.props.clearGenreFilter();
          }

     }


     selectTag = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setTagFilter(selectedOption.value);
          } else {
               this.props.clearTagFilter();
          }

     }



     removeDuplicates(array) {
       return array.filter((a, b) => array.indexOf(a) === b)
     };


     render() {

          const books = this.props.books;

          // create empty variables
          let filterOptions = [];
          let placeholder = '';

          // set vars based on props //////////////////////////////////////////
          // RATING selections //////////////
          if( this.props.type === 'rating' ) {
               placeholder = 'Rating';
               console.log("CURRENT RATING SELECTION: " + this.state.selectRating);
               console.log("CURRENT PROPS SELECTION: " + this.props.currentSelection);
               filterOptions = [
                    { value: '5', label: '⭐⭐⭐⭐⭐ Life-Changing' },
                    { value: '4', label: '⭐⭐⭐⭐ Great +' },
                    { value: '3', label: '⭐⭐⭐ Good +' },
                    { value: '2', label: '⭐⭐ OK +' },
               ];

               let myRatingToPublish = null;
               let defaultRating = this.state.selectRating;
               if( defaultRating > 0 ) {
                    if( defaultRating === '5' ) { myRatingToPublish = '⭐⭐⭐⭐⭐ Life-Changing'; }
                    if( defaultRating === '4' ) { myRatingToPublish = '⭐⭐⭐⭐ Great'; }
                    if( defaultRating === '3' ) { myRatingToPublish = '⭐⭐⭐ Good'; }
                    if( defaultRating === '2' ) { myRatingToPublish = '⭐⭐ OK'; }
                    if( defaultRating === '1' ) { myRatingToPublish = "⭐ Bad / Didn't Finish"; }
               }

               let defaultRatingPublish = {
                    value: defaultRating,
                    label: myRatingToPublish
               };

               if( defaultRating > 0 && this.props.currentSelection > 0 ) {

                    console.log("Returning option 1");

                    return (
                      <Select
                         placeholder='Rating'
                         options={filterOptions}
                         defaultValue={defaultRatingPublish}
                         isClearable
                         isSearchable
                         onChange={this.selectRating}
                      />
                    );

               } else {

                    console.log("Returning option 2");

                    return (
                      <Select
                         placeholder='Rating'
                         defaultValue={''}
                         value={null}
                         options={filterOptions}
                         isClearable
                         isSearchable
                         onChange={this.selectRating}
                      />
                    );

               }


          }



          // AUTHOR selections //////////////
          if( this.props.type === 'author' ) {

               const books = this.props.books;
               const rawAuthors = books.map((book, index) => ( book.authors )).flat();
               rawAuthors.splice(0, rawAuthors.length, ...(new Set(rawAuthors)));
               console.log(rawAuthors);

               // alpabetize by last name
               rawAuthors.sort(function (a, b) {
                   if (a.split(' ')[1] > b.split(' ')[1])
                     return 1;
                   if (a.split(' ')[1] < b.split(' ')[1])
                     return -1;
                   return 0;
               });
               console.log(rawAuthors);

               let filterOptions = [];
               for( let i = 0; i < rawAuthors.length; i++ ) {
                    filterOptions.push({ value: rawAuthors[i], label: rawAuthors[i] });
               }

               placeholder = 'Author';
               if( this.props.currentSelection === '' ) {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         value={null}
                         isClearable
                         isSearchable
                         onChange={this.selectAuthor}
                      />
                    );

               } else {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         isClearable
                         isSearchable
                         onChange={this.selectAuthor}
                      />
                    );

               }

          }



          // GENRE selections //////////////
          if( this.props.type === 'genres' ) {

               const genresRaw = books.map(book => book.genre);
               let genres = genresRaw.filter(Boolean);
               genres = this.removeDuplicates(genres);
               genres.sort();

               let filterOptions = [];
               for( let i = 0; i < genres.length; i++ ) {
                    filterOptions.push({ value: genres[i], label: genres[i] });
               }

               placeholder = 'Genre';
               if( this.props.currentSelection === '' ) {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         value={null}
                         isClearable
                         isSearchable
                         onChange={this.selectGenre}
                      />
                    );

               } else {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         isClearable
                         isSearchable
                         onChange={this.selectGenre}
                      />
                    );

               }

          }


          // TAGS selections //////////////
          if( this.props.type === 'tags' ) {
               placeholder = 'Tag';

               const tagsRaw = books.map(book => book.tags);
               let tags = tagsRaw.filter(Boolean).flat();

               tags = this.removeDuplicates(tags);
               console.log(tags);
               tags.sort((a, b) => a.toString().localeCompare(b, 'fr', {ignorePunctuation: true}));

               let filterOptions = [];
               for( let i = 0; i < tags.length; i++ ) {
                    filterOptions.push({ value: tags[i], label: tags[i] });
               }

               placeholder = 'Tags';
               if( this.props.currentSelection === '' ) {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         value={null}
                         isClearable
                         isSearchable
                         onChange={this.selectTag}
                      />
                    );

               } else {

                    return (
                      <Select
                         placeholder={placeholder}
                         options={filterOptions}
                         isClearable
                         isSearchable
                         onChange={this.selectTag}
                      />
                    );

               }

          }



     }

}

export default SelectFilter;
