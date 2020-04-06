# Bookshelf 📘

Interactive shelves for tracking books you've already read and what you're going to read next.

## Objective

This project was created by Chris Liu-Beers of [Tomatillo Design](http://www.tomatillodesign.com) as a fun way to practice building in React. The goal is to create an interesting way for users to keep track of their reading.

## Features

- Personalized book shelves for each visitor
- Basic suite of account tools (registration, lost password, etc.)
- Clean, clear navigation using React Router
- Filter and sort shelves view by different criteria
- User can select different themes (color + font choices)
- Calculate advanced stats, eg # of books read this year, # of pages, average book rating, etc.
- Mobile-friendly
- Upload your own book covers if necessary

## Technical Credits

- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://www.npmjs.com/package/react-router)
- [MaterialUI](https://material-ui.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Select](https://react-select.com/home)
- [GitHub Pages](https://github.com/gitname/react-gh-pages)
- [React-Date-Picker](https://www.npmjs.com/package/react-date-picker)

## To Do's

- Clean up code, remove console logs, etc.
- Add your own book (not using Google Books search)
- Ignore duplicates
- ~~Ignore articles when alphabetizing book order~~
- ~~Try different date picker setup --> NEW BRANCH~~
- ~~Upload your own cover image for any book~~

## Bugs

- Error when a user has been deleted elsewhere and they load bookshelf (data in local storage doesn't match)
- Move notifications to its own component, not in BookManager
- ~~Date picker text input will crash it; would like to simply disable the text part~~
- ~~After setting date (PreviouslyRead), cannot scroll up and down in the browser~~
- ~~JS error when adding very first tag "prevTags is undefined (BookManager line 461)"~~
- ~~Sometimes, on Results page, action message stays locked in place and won't disappear~~
- ~~All-time average rating not working, should calculate avg from all the non-zero books~~
